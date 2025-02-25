import { validateModelCode } from "./modelValidator";

const MODEL_STORAGE_KEY = "custom_models";

class ModelManager {
  static saveCustomModel(name, code) {
    const validation = validateModelCode(code);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    const models = this.getCustomModels();
    models[name] = code;
    localStorage.setItem(MODEL_STORAGE_KEY, JSON.stringify(models));
  }

  static getCustomModels() {
    const stored = localStorage.getItem(MODEL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  static deleteCustomModel(name) {
    const models = this.getCustomModels();
    delete models[name];
    localStorage.setItem(MODEL_STORAGE_KEY, JSON.stringify(models));
  }
}

export { ModelManager }; // Change to named export
