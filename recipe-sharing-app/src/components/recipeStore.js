import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  cookingTime: number;   // minutes
}

interface RecipeState {
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, "id">) => void;
  updateRecipe: (id: string, updates: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;
}

export const useRecipeStore = create<RecipeState>()(
  persist(
    (set) => ({
      recipes: [],

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
    }),
    { name: "recipe-storage" }
  )
);

export default useRecipeStore;
