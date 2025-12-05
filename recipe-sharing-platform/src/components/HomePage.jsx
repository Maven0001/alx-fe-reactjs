import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/data.json");

        if (!response.ok) {
          throw new Error("Failed to load recipes");
        }

        const data = await response.json();
        setRecipes(data);

        setLoading(false);
      } catch (err) {
        setError("something went wrong");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">Loading delicious recipes...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Delicious Recipes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and share amazing recipes from cooks around the world
          </p>
        </div>

        {/* Responsive Recipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              {/* Image with hover overlay */}
              <div className="relative h-64">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold">View Recipe</h3>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {recipe.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">{recipe.summary}</p>
                <div className="mt-6">
                  <Link
                    href={`/recipe/${recipe.id}`}
                    className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
