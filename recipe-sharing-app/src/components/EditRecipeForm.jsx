import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRecipeStore from "./recipeStore";

export const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, updateRecipe } = useRecipeStore();
  const recipe = recipes.find((r) => r.id === id);

  const [form, setForm] = useState({
    title: recipe?.title || "",
    cookingTime: recipe?.cookingTime || 0,
    ingredients: recipe?.ingredients.join("\n") || "",
    instructions: recipe?.instructions || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRecipe(id, {
      title: form.title,
      cookingTime: Number(form.cookingTime),
      ingredients: form.ingredients.split("\n").filter(Boolean),
      instructions: form.instructions,
    });
    navigate(`/recipe/${id}`);
  };

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 p-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        name="cookingTime"
        value={form.cookingTime}
        onChange={handleChange}
        placeholder="Cooking time (min)"
        required
        className="w-full border p-2 rounded"
      />
      <textarea
        name="ingredients"
        value={form.ingredients}
        onChange={handleChange}
        placeholder="One ingredient per line"
        rows={5}
        required
        className="w-full border p-2 rounded"
      />
      <textarea
        name="instructions"
        value={form.instructions}
        onChange={handleChange}
        placeholder="Instructions"
        rows={8}
        required
        className="w-full border p-2 rounded"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
