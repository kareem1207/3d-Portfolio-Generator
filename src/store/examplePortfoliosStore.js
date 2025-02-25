import { create } from "zustand";
import { persist } from "zustand/middleware";

const useExamplePortfoliosStore = create(
  persist(
    (set) => ({
      examples: [],
      addExample: (portfolio) =>
        set((state) => ({
          examples: [...state.examples, portfolio],
        })),
      getExampleById: (id) => {
        const state = useExamplePortfoliosStore.getState();
        return state.examples.find((example) => example.portfolioId === id);
      },
    }),
    {
      name: "example-portfolios-storage",
    }
  )
);

export default useExamplePortfoliosStore;
