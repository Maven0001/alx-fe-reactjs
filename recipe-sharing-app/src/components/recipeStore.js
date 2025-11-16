import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  cookingTime: number;
  category?: string; // optional for better recommendations
}

interface RecipeState {
  recipes: Recipe[];
  searchTerm: string;
  filteredRecipes: Recipe[];
  favorites: string[];          // <-- NEW: array of recipe IDs
  recommendations: Recipe[];    // <-- NEW: suggested recipes

  // --- Actions ---
  addRecipe: (recipe: Omit<Recipe, "id">) => void;
  updateRecipe: (id: string, updates: Partial<Recipe>) => void;
  deleteRecipe: (id: string) => void;

  setSearchTerm: (term: string) => void;
  filterRecipes: () => void;

  // --- NEW: Favorites Actions ---
  addFavorite: (recipeId: string) => void;
  removeFavorite: (recipeId: string) => void;
  toggleFavorite: (recipeId: string) => void;

  // --- NEW: Recommendations ---
  generateRecommendations: () => void;
}

export const useRecipeStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      recipes: [],
      searchTerm: "",
      filteredRecipes: [],
      favorites: [],
      recommendations: [],

      // --- Core CRUD ---
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

      // --- Search & Filter ---
      setSearchTerm: (term) => {
        set({ searchTerm: term });
        get().filterRecipes();
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

      // --- Favorites Actions ---
      addFavorite: (recipeId) =>
        set((state) => ({
          favorites: [...state.favorites, recipeId],
        })),

      removeFavorite: (recipeId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== recipeId),
        })),

      toggleFavorite: (recipeId) => {
        const { favorites } = get();
        if (favorites.includes(recipeId)) {
          get().removeFavorite(recipeId);
        } else {
          get().addFavorite(recipeId);
        }
        get().generateRecommendations(); // update recs when favorites change
      },

      // --- Recommendations Logic ---
      generateRecommendations: () => {
        const { recipes, favorites } = get();

        if (favorites.length === 0) {
          // Show 3 random recipes if no favorites
          const shuffled = [...recipes].sort(() => 0.5 - Math.random());
          set({ recommendations: shuffled.slice(0, 3) });
          return;
        }

        // Find recipes that share ingredients or category with favorites
        const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));
        const favoriteIngredients = new Set(
          favoriteRecipes.flatMap((r) => r.ingredients.map((i) => i.toLowerCase()))
        );
        const favoriteCategories = new Set(
          favoriteRecipes.map((r) => r.category).filter(Boolean)
        );

        const scored = recipes
          .filter((r) => !favorites.includes(r.id)) // exclude already favorited
          .map((r) => {
            let score = 0;
            r.ingredients.forEach((ing) => {
              if (favoriteIngredients.has(ing.toLowerCase())) score += 2;
            });
            if (favoriteCategories.has(r.category)) score += 3;
            if (r.cookingTime <= 30) score += 1; // bonus for quick recipes
            return { recipe: r, score };
          })
          .filter((item) => item.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 4)
          .map((item) => item.recipe);

        set({ recommendations: scored.length > 0 ? scored : [] });
      },
    }),
    { name: "recipe-storage" }
  )
);