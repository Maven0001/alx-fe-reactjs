import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecommendationsList = () => {
  const { recommendations, generateRecommendations } = useRecipeStore();

  // Regenerate on mount
  React.useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (recommendations.length === 0) return null;

  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-3">Recommended for You</h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {recommendations.map((r) => (
          <Link
            key={r.id}
            to={`/recipe/${r.id}`}
            className="border rounded p-3 bg-white shadow-sm hover:shadow"
          >
            <h3 className="font-medium">{r.title}</h3>
            <p className="text-sm text-gray-600">{r.cookingTime} min</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsList;
