import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ModelManager } from "../../utils/modelManager";
import { themeConfigs } from "../../utils/themeConfigs";
import { modelDictionary } from "../../utils/modelDictionary";

export class ModelBuilder {
  constructor(container, theme = "minimal3D") {
    this.container = container;
    this.themeConfig = themeConfigs[theme];
    this.scene = new THREE.Scene();
    this.dimensions = {
      width: 1,
      height: 1,
      depth: 1,
      radius: 0.5,
    };
    this.position = { x: 0, y: 0, z: 0 };
    this.selectedShape = "box";
    this.history = [];
    this.historyIndex = -1;
    this.rotation = { x: 0, y: 0, z: 0 };
    this.color = this.themeConfig.shapes.material.color;
    this.init();
    this.setupLighting();
    this.setupControls();
    this.theme = theme.replace("3D", "").toLowerCase();
    this.allowedModels = themeConfigs[theme].shapes.allowedTypes;
    this.maxModels = themeConfigs[theme].shapes.maxModels;
    this.modelConfig = modelDictionary[this.theme] || modelDictionary.minimal;
  }

  init() {
    this.canvas = document.createElement("canvas");
    this.container.appendChild(this.canvas);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    this.camera.position.z = 5;

    // Apply theme background
    this.scene.background = new THREE.Color(this.themeConfig.background);

    // Apply themed grid helper
    const { size, divisions, color } = this.themeConfig.gridHelper;
    const grid = new THREE.GridHelper(size, divisions, color, color);
    this.scene.add(grid);

    this.animate();
  }

  setupLighting() {
    // Add themed lighting
    const { ambient, point } = this.themeConfig.lighting;

    const ambientLight = new THREE.AmbientLight(
      ambient.color,
      ambient.intensity
    );
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(point.color, point.intensity);
    pointLight.position.set(...point.position);
    this.scene.add(pointLight);
  }

  setupControls() {
    const controls = document.createElement("div");
    controls.className = "controls";

    // Theme-specific model selector
    const modelContainer = document.createElement("div");
    modelContainer.className = "model-container";

    const modelSelector = new ModelSelector({
      selected: [], // This will be managed by the component
      onSelect: (models) => this.handleModelsChange(models),
      availableModels: this.allowedModels,
      maxModels: this.maxModels,
      isCustomTheme: this.theme === "custom",
      theme: this.themeConfig.name || this.theme, // Add theme name
    });

    modelContainer.appendChild(modelSelector.render());

    // Add color picker
    const colorPicker = document.createElement("input");
    colorPicker.type = "color";
    colorPicker.value = this.color;
    colorPicker.addEventListener("input", (e) => {
      this.color = e.target.value;
    });

    const rotationControls = document.createElement("div");
    rotationControls.className = "rotation-controls";
    ["x", "y", "z"].forEach((axis) => {
      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = "0";
      slider.max = "360";
      slider.value = "0";
      slider.addEventListener("input", (e) => {
        this.rotation[axis] = (e.target.value * Math.PI) / 180;
      });
      rotationControls.appendChild(slider);
    });

    const undoBtn = document.createElement("button");
    undoBtn.textContent = "Undo";
    undoBtn.onclick = () => this.undo();

    const redoBtn = document.createElement("button");
    redoBtn.textContent = "Redo";
    redoBtn.onclick = () => this.redo();

    controls.append(
      modelContainer,
      colorPicker,
      rotationControls,
      undoBtn,
      redoBtn
    );
    this.container.appendChild(controls);
  }

  handleModelsChange(models) {
    // Clear existing models
    this.scene.children = this.scene.children.filter(
      (child) => !(child instanceof THREE.Mesh)
    );

    // Add new models
    models.forEach((modelName) => {
      const modelData = { type: modelName };
      this.createShape(modelData);
    });

    this.saveState();
  }

  validateModelName(name) {
    return (
      this.allowedModels.includes(name) ||
      this.allowedModels.includes(this.getModelAlias(name))
    );
  }

  getModelAlias(name) {
    const aliases = {
      box: "cube",
      square: "cube",
      ball: "sphere",
      circle: "sphere",
      pipe: "cylinder",
      tube: "cylinder",
      pyramid: "cone",
    };
    return aliases[name] || name;
  }

  handleCommand(command) {
    const commands = {
      cube: { type: "box", dimensions: { width: 1, height: 1, depth: 1 } },
      sphere: { type: "sphere", dimensions: { radius: 0.5 } },
      cone: { type: "cone", dimensions: { radius: 0.5, height: 1 } },
      cylinder: { type: "cylinder", dimensions: { radius: 0.5, height: 1 } },
    };

    if (commands[command]) {
      this.createShape(commands[command]);
    }
  }

  createShape(shapeData) {
    if (
      this.theme !== "custom" &&
      this.scene.children.filter((child) => child instanceof THREE.Mesh)
        .length >= this.maxModels
    ) {
      alert(
        `Maximum number of models (${this.maxModels}) reached for ${this.theme} theme`
      );
      return;
    }

    let geometry;
    const materialConfig = this.themeConfig.shapes.material;
    const material = new THREE[materialConfig.type]({
      color: this.color,
      metalness: materialConfig.metalness,
      roughness: materialConfig.roughness,
    });

    switch (shapeData.type) {
      case "box":
        geometry = new THREE.BoxGeometry(
          shapeData.dimensions.width,
          shapeData.dimensions.height,
          shapeData.dimensions.depth
        );
        break;
      case "sphere":
        geometry = new THREE.SphereGeometry(
          shapeData.dimensions.radius,
          32,
          32
        );
        break;
      case "cone":
        geometry = new THREE.ConeGeometry(
          shapeData.dimensions.radius,
          shapeData.dimensions.height,
          32
        );
        break;
      case "cylinder":
        geometry = new THREE.CylinderGeometry(
          shapeData.dimensions.radius,
          shapeData.dimensions.radius,
          shapeData.dimensions.height,
          32
        );
        break;
      case "plane":
        geometry = new THREE.PlaneGeometry(1, 1);
        break;
      case "capsule":
        geometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
        break;
      case "circle":
        geometry = new THREE.CircleGeometry(0.5, 32);
        break;
      case "ring":
        geometry = new THREE.RingGeometry(0.3, 0.5, 32);
        break;
      case "tube":
        const path = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-0.5, -0.5, 0),
          new THREE.Vector3(0.5, 0.5, 0),
        ]);
        geometry = new THREE.TubeGeometry(path, 20, 0.1, 8, false);
        break;
      case "wireframe":
        geometry = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1));
        material = new THREE.LineBasicMaterial({ color: this.color });
        break;
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.multiplyScalar(this.themeConfig.shapes.scale);
    mesh.position.set(this.position.x, this.position.y, this.position.z);
    mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.scene.add(mesh);

    // Save state for undo/redo
    this.saveState();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  saveModel(name) {
    const modelCode = this.generateModelCode();
    ModelManager.saveCustomModel(name, modelCode);
  }

  generateModelCode() {
    return `
      const geometry = new THREE.${this.selectedShape}Geometry(
        ${this.dimensions.width}, 
        ${this.dimensions.height}, 
        ${this.dimensions.depth}
      );
      const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(${this.position.x}, ${this.position.y}, ${this.position.z});
      scene.add(mesh);
    `;
  }

  saveState() {
    const state = {
      objects: this.scene.children
        .filter((child) => child instanceof THREE.Mesh)
        .map((mesh) => ({
          geometry: mesh.geometry.clone(),
          material: mesh.material.clone(),
          position: mesh.position.clone(),
          rotation: mesh.rotation.clone(),
          scale: mesh.scale.clone(),
        })),
    };

    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(state);
    this.historyIndex++;
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.loadState(this.history[this.historyIndex]);
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.loadState(this.history[this.historyIndex]);
    }
  }

  loadState(state) {
    // Remove all meshes
    this.scene.children = this.scene.children.filter(
      (child) => !(child instanceof THREE.Mesh)
    );

    // Restore meshes from state
    state.objects.forEach((obj) => {
      const mesh = new THREE.Mesh(obj.geometry, obj.material);
      mesh.position.copy(obj.position);
      mesh.rotation.copy(obj.rotation);
      mesh.scale.copy(obj.scale);
      this.scene.add(mesh);
    });
  }

  handleCustomModelAdd(modelName) {
    const normalizedName = modelName.toLowerCase().trim();

    // Check aliases first
    const aliasedName =
      this.modelConfig.aliases[normalizedName] || normalizedName;

    if (this.modelConfig.allowed.includes(aliasedName)) {
      this.addShape(aliasedName);
    } else {
      alert(
        `Invalid model name. Available models: ${this.modelConfig.allowed.join(
          ", "
        )}`
      );
    }
  }

  addShape(shapeName) {
    if (this.scene.children.length > this.modelConfig.maxCount) {
      alert(
        `Maximum number of models (${this.modelConfig.maxCount}) reached for ${this.theme} theme`
      );
      return;
    }

    let geometry;
    const material = this.createMaterial();

    switch (shapeName) {
      case "cube":
        geometry = new THREE.BoxGeometry(1, 1, 1);
        break;
      case "sphere":
        geometry = new THREE.SphereGeometry(0.5, 32, 32);
        break;
      case "cylinder":
        geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
        break;
      case "cone":
        geometry = new THREE.ConeGeometry(0.5, 1, 32);
        break;
      case "torus":
        geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 32);
        break;
      case "torusKnot":
        geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
        break;
      case "icosahedron":
        geometry = new THREE.IcosahedronGeometry(0.5);
        break;
      case "octahedron":
        geometry = new THREE.OctahedronGeometry(0.5);
        break;
      case "tetrahedron":
        geometry = new THREE.TetrahedronGeometry(0.5);
        break;
      case "dodecahedron":
        geometry = new THREE.DodecahedronGeometry(0.5);
        break;
      default:
        console.warn("Unknown shape:", shapeName);
        return;
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(this.position.x, this.position.y, this.position.z);
    mesh.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    this.scene.add(mesh);
    this.saveState();
  }
}
