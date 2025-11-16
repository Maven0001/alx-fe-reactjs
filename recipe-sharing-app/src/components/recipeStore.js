import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  cookingTime: number;
}

interface RecipeState {
  recipes: Recipe[];
  searchTerm: string;
  filteredRecipes: Recipe[];

  // --- Actions ---
  addRecipe: (recipe: Omit<Recipe, "id">) => void;
  updateRecipe: (id: string, updates: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;

  setSearchTerm: (term: string) => void;
  filterRecipes: () => void;
}

export const useRecipeStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      recipes: [],
      searchTerm: "",
      filteredRecipes: [],

      addRecipe: (recipe) =>
        set((state) => ({
          recipes: [
            ...state.recipes,
            { ...recipe, id: crypto.randomUUID() },
          ],
        })),

      updateRecipe: (id, updates) =>
        set((state) => ({
          recipes: state.recipes.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        })),

      deleteRecipe: (id) =>
        set((state) => ({
          recipes: state.recipes.filter((r) => r.id !== id),
        })),

      // --- NEW: Search & Filter ---
      setSearchTerm: (term) => {
        set({ searchTerm: term });
        get().filterRecipes(); // auto‑filter on every keystroke
      },

      filterRecipes: () => {
        const { recipes, searchTerm } = get();
        const lower = searchTerm.toLowerCase().trim();

        const filtered = recipes.filter((r) => {
          const matchesTitle = r.title.toLowerCase().includes(lower);
          const matchesIngredient = r.ingredients.some((ing) =>
            ing.toLowerCase().includes(lower)
          );
          const matchesTime = lower === "" || r.cookingTime.toString().includes(lower);
          return matchesTitle || matchesIngredient || matchesTime;
        });

        set({ filteredRecipes: filtered });
      },
    }),
    { name: "recipe-storage" }
  )
);