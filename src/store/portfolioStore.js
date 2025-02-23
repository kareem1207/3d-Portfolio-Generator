import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const usePortfolioStore = create(
  persist(
    (set) => ({
      userData: {
        name: "",
        title: "",
        bio: "",
        skills: "",
        socialLinks: {
          github: "",
          linkedin: "",
          twitter: "",
        },
      },
      templateSettings: {
        id: null,
        colors: {
          primary: "#2A9D8F",
          secondary: "#264653",
          background: "#ffffff",
          text: "#000000",
        },
        animations: "none",
        lighting: "soft",
        material: {
          metalness: 0,
          roughness: 0.5,
        },
        models: [], // Each model should have: { type: 'box' | 'sphere' | 'cylinder', scale: number }
      },
      setUserData: (data) => set({ userData: data }),
      setTemplateSettings: (settings) =>
        set((state) => ({
          templateSettings: {
            ...state.templateSettings,
            ...settings,
          },
        })),
      updateColors: (colors) =>
        set((state) => ({
          templateSettings: {
            ...state.templateSettings,
            colors: { ...state.templateSettings.colors, ...colors },
          },
        })),
      updateModels: (models) =>
        set((state) => ({
          templateSettings: {
            ...state.templateSettings,
            models: models.map((model) => ({
              type: model.type,
              scale: model.scale,
              id: model.id,
            })),
          },
        })),
    }),
    {
      name: "portfolio-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePortfolioStore;
