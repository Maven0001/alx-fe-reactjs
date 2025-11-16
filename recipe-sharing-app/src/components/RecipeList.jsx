// RecipeList component
import { Link } from "react-router-dom";
import { useRecipeStore, Recipe } from "./recipeStore";

export const RecipeList = () => {
  const { recipes } = useRecipeStore();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
  <div className="rounded-lg border bg-white p-4 shadow-sm">
    <h





    <h3 className="text-lg font-semibold">{recipe.title}</h3>
    <p className="text-sm text-gray-600">
      {recipe.cookingTime} min • {recipe.ingredients.length} ingredients
    </p>
    <div className="mt-3 flex gap-2">
      <Link
        to={`/recipe/${recipe.id}`}
        className="flex-1 rounded bg-blue-600 px-3 py-1.5 text-center text-sm text-white hover:bg-blue-700"
      >
        View
      </Link>
      <Link
        to={`/edit/${recipe.id}`}
        className="flex-1 rounded bg-amber-600 px-3 py-1.5 text-center text-sm text-white hover:bg-amber-700"
      >
        Edit
      </Link>
    </div>
  </div>
);
