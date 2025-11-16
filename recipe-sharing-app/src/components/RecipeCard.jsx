import { Link } from "react-router-dom";
import { Recipe } from "../store/recipeStore";
import { FavoriteButton } from "./FavoriteButton";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
    <h3 className="text-xl font-semibold text-gray-800">{recipe.title}</h3>
    <p className="mt-1 text-sm text-gray-600">
      {recipe.cookingTime} min • {recipe.ingredients.length} ingredients
    </p>

    <div className="mt-4 flex gap-2">
      <Link
        to={`/recipe/${recipe.id}`}
        className="flex-1 rounded bg-blue-600 px-4 py-2 text-center text-sm text-white hover:bg-blue-700"
      >
        View
      </Link>
      <Link
        to={`/edit/${recipe.id}`}
        className="flex-1 rounded bg-amber-600 px-4 py-2 text-center text-sm text-white hover:bg-amber-700"
      >
        Edit
      </Link>
    </div>

    <div className="mt-3">
      <FavoriteButton recipeId={recipe.id} />
    </div>
  </div>
);
