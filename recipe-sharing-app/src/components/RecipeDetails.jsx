import { useParams, Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import FavoriteButton from "./FavoriteButton";

export const RecipeDetails = () => {
  const { id } = useParams();
  const { recipes } = useRecipeStore();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>
      <p className="text-sm text-gray-600">
        {recipe.cookingTime} min • {recipe.ingredients.length} ingredients
      </p>

      <section className="my-4">
        <h2 className="font-semibold">Ingredients</h2>
        <ul className="list-disc pl-5">
          {recipe.ingredients.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>
      </section>

      <section className="my-4">
        <h2 className="font-semibold">Instructions</h2>
        <p className="whitespace-pre-line">{recipe.instructions}</p>
      </section>

      <div className="flex gap-2 mt-4">
        <Link to="/" className="bg-gray-600 text-white px-4 py-2 rounded">
          Back
        </Link>
        <Link
          to={`/edit/${recipe.id}`}
          className="bg-amber-600 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>
        <FavoriteButton recipeId={recipe.id} />
      </div>
    </div>
  );
};
