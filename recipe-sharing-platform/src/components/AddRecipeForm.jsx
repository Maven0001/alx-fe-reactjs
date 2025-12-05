import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddRecipeForm = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Recipe title is required";
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Please add at least one ingredient";
    } else {
      const ingredientList = formData.ingredients
        .split("\n")
        .filter((i) => i.trim());
      if (ingredientList.length < 2) {
        newErrors.ingredients = "Please add at least 2 ingredients";
      }
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = "Instructions are required";
    } else if (formData.instructions.trim().split(".").length < 3) {
      newErrors.instructions = "Please provide at least 2–3 clear steps";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      // In a real app: send to backend or save to localStorage
      console.log("New Recipe Submitted:", formData);

      // Simulate success
      alert("Recipe added successfully!");

      // Reset form
      setFormData({
        title: "",
        ingredients: "",
        instructions: "",
      });
      setSubmitted(false);

      // Redirect to home after success
      setTimeout(() => navigate("/"), 500);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Share Your Recipe
          </h1>
          <p className="text-xl text-gray-600">
            Inspire others with your culinary creations
          </p>
        </div>

        {/* Back to Home */}
        <Link
          to="/"
          className="inline-block mb-8 text-indigo-600 hover:text-indigo-800 font-medium transition"
        >
          ← Back to Recipes
        </Link>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Recipe Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-lg font-semibold text-gray-800 mb-3"
              >
                Recipe Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Grandma's Apple Pie"
                className={`w-full px-5 py-4 border-2 rounded-xl text-lg transition
                  ${
                    errors.title
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-indigo-500"
                  } 
                  focus:outline-none focus:ring-4 focus:ring-indigo-100`}
              />
              {errors.title && (
                <p className="mt-2 text-red-600 font-medium">{errors.title}</p>
              )}
            </div>

            {/* Ingredients */}
            <div>
              <label
                htmlFor="ingredients"
                className="block text-lg font-semibold text-gray-800 mb-3"
              >
                Ingredients (one per line)
              </label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                rows="8"
                placeholder={`2 cups flour\n4 eggs\n1 tsp salt\n...`}
                className={`w-full px-5 py-4 border-2 rounded-xl text-lg resize-none transition
                  ${
                    errors.ingredients
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-indigo-500"
                  }
                  focus:outline-none focus:ring-4 focus:ring-indigo-100`}
              />
              {errors.ingredients && (
                <p className="mt-2 text-red-600 font-medium">
                  {errors.ingredients}
                </p>
              )}
            </div>

            {/* Instructions */}
            <div>
              <label
                htmlFor="instructions"
                className="block text-lg font-semibold text-gray-800 mb-3"
              >
                Cooking Instructions
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows="10"
                placeholder="1. Preheat oven to 180°C...&#10;2. Mix dry ingredients...&#10;3. Bake for 30 minutes..."
                className={`w-full px-5 py-4 border-2 rounded-xl text-lg resize-none transition
                  ${
                    errors.instructions
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-indigo-500"
                  }
                  focus:outline-none focus:ring-4 focus:ring-indigo-100`}
              />
              {errors.instructions && (
                <p className="mt-2 text-red-600 font-medium">
                  {errors.instructions}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={submitted}
                className={`px-12 py-5 text-xl font-bold text-white rounded-xl transition-all transform
                  ${
                    submitted
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:scale-105 shadow-xl"
                  }`}
              >
                {submitted ? "Adding Recipe..." : "Add Recipe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRecipeForm;
