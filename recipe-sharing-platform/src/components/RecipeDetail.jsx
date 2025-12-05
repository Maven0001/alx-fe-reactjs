import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) throw new Error("Failed to load recipe");
        const data = await response.json();

        const foundRecipe = data.find((r) => r.id === parseInt(id));
        if (!foundRecipe) throw new Error("Recipe not found");

        setRecipe(foundRecipe);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl text-gray-600">Loading recipe...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-xl mb-6">
          {error || "Recipe not found"}
        </p>
        <Link to="/" className="text-indigo-600 underline text-lg">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-block mb-8 text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← All Recipes
        </Link>

        {/* Recipe Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-96 object-cover"
          />

          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {recipe.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-700 mb-8">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Prep:</span> {recipe.prepTime}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Cook:</span> {recipe.cookTime}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Serves:</span> {recipe.servings}
              </div>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              {recipe.summary}
            </p>

            {/* Ingredients & Instructions Side by Side */}
            <div className="grid md:grid-cols-2 gap-10">
              {/* Ingredients */}
              <div className="bg-gray-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Ingredients
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ing, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-indigo-600 mt-1">•</span>
                      <span className="text-gray-700">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="bg-gray-50 p-8 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Instructions
                </h2>
                <ol className="space-y-5">
                  {recipe.instructions.map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Final CTA */}
            <div className="mt-12 text-center">
              <p className="text-2xl font-bold text-gray-800">
                Enjoy your meal!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
