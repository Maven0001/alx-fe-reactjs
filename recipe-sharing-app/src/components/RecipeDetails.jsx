import { useParams, Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import { DeleteRecipeButton } from "./DeleteRecipeButton";

export const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { recipes } = useRecipeStore();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) return <p className="text-center text-red-600">Recipe not found.</p>;

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow">
      <h1 className="mb-4 text-3xl font-bold">{recipe.title}</h1>

      <div className="mb-6 flex items-center gap-4 text-sm text-gray-600">
        <span>{recipe.cookingTime} min</span>
        <span>•</span>
        <span>{recipe.ingredients.length} ingredients</span>
      </div>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Ingredients</h2>
        <ul className="list-inside list-disc space-y-1">
          {recipe.ingredients.map((ing, i) => (
            <li key={i}>{ing}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Instructions</h2>
        <p className="whitespace-pre-line">{recipe.instructions}</p>
      </section>

      <div className="flex gap-3">
        <Link
          to="/"
          className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Back to List
        </Link>
        <Link
          to={`/edit/${recipe.id}`}
          className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
        >
          Edit
        </Link>
        <DeleteRecipeButton id={recipe.id} />
      </div>
    </div>
  );
};