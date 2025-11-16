import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore, Recipe } from "./recipeStore";

const EditRecipeForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { recipes, updateRecipe } = useRecipeStore();

  const recipe = recipes.find((r) => r.id === id);
  if (!recipe)
    return <p className="text-center text-red-600">Recipe not found.</p>;

  const [form, setForm] = useState<Partial<Recipe>>({
    title: recipe.title,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    cookingTime: recipe.cookingTime,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "ingredients") {
      setForm((prev) => ({ ...prev, ingredients: value.split("\n") }));
    } else if (name === "cookingTime") {
      setForm((prev) => ({ ...prev, cookingTime: Number(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateRecipe(id!, form);
    navigate(`/recipe/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-4">
      <div>
        <label className="block font-medium">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Cooking Time (min)</label>
        <input
          type="number"
          name="cookingTime"
          value={form.cookingTime}
          onChange={handleChange}
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Ingredients (one per line)</label>
        <textarea
          name="ingredients"
          value={form.ingredients?.join("\n")}
          onChange={handleChange}
          rows={6}
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Instructions</label>
        <textarea
          name="instructions"
          value={form.instructions}
          onChange={handleChange}
          rows={8}
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded bg-green-600 px-5 py-2 text-white hover:bg-green-700"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded bg-gray-600 px-5 py-2 text-white hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditRecipeForm;
