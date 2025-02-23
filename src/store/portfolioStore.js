import { create } from "zustand";
import { persist } from "zustand/middleware";

const usePortfolioStore = create(
  persist(
    (set) => ({
      userData: {
        name: "",
        title: "",
        about: "",
        contact: "",
      },
      selectedTemplate: null,
      customModels: [],
      templateConfig: {},
      setUserData: (data) => set({ userData: data }),
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      addCustomModel: (model) =>
        set((state) => ({
          customModels: [...state.customModels, model],
        })),
      removeCustomModel: (index) =>
        set((state) => ({
          customModels: state.customModels.filter((_, i) => i !== index),
        })),
      setTemplateConfig: (config) => set({ templateConfig: config }),
    }),
    {
      name: "portfolio-storage",
    }
  )
);

export default usePortfolioStore;
