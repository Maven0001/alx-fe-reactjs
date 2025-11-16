import { Link } from "react-router-dom";
import { useRecipeStore } from "../store/recipeStore";

export const RecommendationsList = () => {
  const { recommendations, generateRecommendations } = useRecipeStore();

  // Regenerate on mount
  React.useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Recommended for You</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {recommendations.map((recipe) => (
          <Link
            key={recipe.id}
            to={`/recipe/${recipe.id}`}
            className="rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <h3 className="font-medium text-gray-800">{recipe.title}</h3>
            <p className="mt-1 text-sm text-gray-600">
              {recipe.cookingTime} min • {recipe.ingredients.length} ingredients
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
