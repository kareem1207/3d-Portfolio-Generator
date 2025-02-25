import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const usePortfolioStore = create(
  persist(
    (set, get) => ({
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
        modelColor: "#ffffff",
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
            models: models.map((modelType) => ({
              type: modelType,
              scale: 1,
            })),
          },
        })),
      savePortfolio: async () => {
        const state = get();
        const portfolioData = {
          templateId: state.templateSettings.id,
          settings: state.templateSettings,
          userData: state.userData,
        };

        try {
          const response = await fetch("/api/portfolios", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(portfolioData),
          });

          if (!response.ok) throw new Error("Failed to save portfolio");

          const savedPortfolio = await response.json();
          return savedPortfolio;
        } catch (error) {
          console.error("Error saving portfolio:", error);
          throw error;
        }
      },

      loadPortfolios: async () => {
        try {
          const response = await fetch("/api/portfolios");
          if (!response.ok) throw new Error("Failed to load portfolios");
          const portfolios = await response.json();
          return portfolios;
        } catch (error) {
          console.error("Error loading portfolios:", error);
          throw error;
        }
      },

      publishPortfolio: async () => {
        const state = get();
        // Format the portfolio data
        const portfolioData = {
          templateId: state.templateSettings.id,
          settings: {
            ...state.templateSettings,
            models: state.templateSettings.models.map((model) => ({
              type: model.type,
              scale: Number(model.scale || 1),
            })),
          },
          userData: state.userData,
        };

        try {
          const response = await fetch("/api/publish", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(portfolioData),
            credentials: "include",
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Failed to publish portfolio");
          }

          return data;
        } catch (error) {
          console.error("Publishing error:", error);
          throw error;
        }
      },
    }),
    {
      name: "portfolio-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default usePortfolioStore;
