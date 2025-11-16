import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";
import { FavoriteButton } from "./FavoriteButton";

export const FavoritesList = () => {
  const { recipes, favorites } = useRecipeStore();
  const favoriteRecipes = recipes.filter((r) => favorites.includes(r.id));

  if (favoriteRecipes.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow">
        <p className="text-gray-600">
          No favorite recipes yet. Start adding some!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">My Favorites</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {favoriteRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm"
          >
            <div>
              <Link
                to={`/recipe/${recipe.id}`}
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                {recipe.title}
              </Link>
              <p className="text-sm text-gray-600">{recipe.cookingTime} min</p>
            </div>
            <FavoriteButton recipeId={recipe.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
