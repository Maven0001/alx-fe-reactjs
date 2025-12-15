import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRecipeStore = create(
  persist(
    (set, get) => ({
      // -------------------------------------------------
      // State
      // -------------------------------------------------
      recipes: [],
      searchTerm: "",
      filteredRecipes: [],
      favorites: [],
      recommendations: [],

      // -------------------------------------------------
      // CRUD
      // -------------------------------------------------
      addRecipe: (recipe) =>
        set((state) => ({
          recipes: [...state.recipes, { ...recipe, id: crypto.randomUUID() }],
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

      // -------------------------------------------------
      // Search / Filter
      // -------------------------------------------------
      setSearchTerm: (term) => {
        set({ searchTerm: term });
        get().filterRecipes();
      },

      filterRecipes: () => {
        const { recipes, searchTerm } = get();
        const lower = searchTerm.toLowerCase().trim();
        const filtered = recipes.filter((r) => {
          const title = r.title.toLowerCase().includes(lower);
          const ingredient = r.ingredients.some((i) =>
            i.toLowerCase().includes(lower)
          );
          const time = lower === "" || r.cookingTime.toString().includes(lower);
          return title || ingredient || time;
        });
        set({ filteredRecipes: filtered });
      },

      // -------------------------------------------------
      // Favorites
      // -------------------------------------------------
      toggleFavorite: (recipeId) => {
        const { favorites } = get();
        const newFavs = favorites.includes(recipeId)
          ? favorites.filter((id) => id !== recipeId)
          : [...favorites, recipeId];
        set({ favorites: newFavs });
        get().generateRecommendations();
      },

      // -------------------------------------------------
      // Recommendations
      // -------------------------------------------------
      generateRecommendations: () => {
        const { recipes, favorites } = get();

        if (favorites.length === 0) {
          const shuffled = [...recipes].sort(() => 0.5 - Math.random());
          set({ recommendations: shuffled.slice(0, 3) });
          return;
        }

        const favRecipes = recipes.filter((r) => favorites.includes(r.id));
        const favIngredients = new Set(
          favRecipes.flatMap((r) => r.ingredients.map((i) => i.toLowerCase()))
        );

        const scored = recipes
          .filter((r) => !favorites.includes(r.id))
          .map((r) => {
            let score = 0;
            r.ingredients.forEach((i) => {
              if (favIngredients.has(i.toLowerCase())) score += 2;
            });
            if (r.cookingTime <= 30) score += 1;
            return { recipe: r, score };
          })
          .filter((i) => i.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 4)
          .map((i) => i.recipe);

        set({ recommendations: scored });
      },
    }),
    { name: "recipe-storage" }
  )
);

export default useRecipeStore;
