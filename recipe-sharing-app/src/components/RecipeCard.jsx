import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

export const RecipeCard = ({ recipe }) => (
  <div className="border rounded p-4 bg-white shadow-sm">
    <h3 className="font-bold text-lg">{recipe.title}</h3>
    <p className="text-sm text-gray-600">
      {recipe.cookingTime} min • {recipe.ingredients.length} ingredients
    </p>

    <div className="mt-2 flex gap-2">
      <Link
        to={`/recipe/${recipe.id}`}
        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
      >
        View
      </Link>
      <Link
        to={`/edit/${recipe.id}`}
        className="bg-amber-600 text-white px-3 py-1 rounded text-sm"
      >
        Edit
      </Link>
    </div>

    <div className="mt-2">
      <FavoriteButton recipeId={recipe.id} />
    </div>
  </div>
);
