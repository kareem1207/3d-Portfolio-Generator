export const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
};

export const optimizeModel = (gltf) => {
  const model = gltf.scene;

  // Optimize geometries
  model.traverse((node) => {
    if (node.isMesh) {
      // Optimize geometry
      node.geometry.setDrawRange(0, Infinity);
      node.geometry.setIndex(node.geometry.getIndex());

      // Optimize materials
      if (node.material) {
        node.material.side = THREE.FrontSide;
        if (node.material.map) {
          node.material.map.anisotropy = 1;
        }
      }
    }
  });

  return model;
};

export const getDeviceCapabilities = () => {
  const capabilities = {
    webgl: checkWebGLSupport(),
    mobile:
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
    performance: window.performance?.memory?.jsHeapSizeLimit || "unknown",
  };

  return capabilities;
};
