import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";
import FavoriteButton from "./FavoriteButton";

const FavoritesList = () => {
  const { recipes, favorites } = useRecipeStore();
  const favs = recipes.filter((r) => favorites.includes(r.id));

  if (favs.length === 0)
    return <p className="text-center text-gray-600">No favorites yet.</p>;

  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-3">My Favorites</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {favs.map((r) => (
          <div
            key={r.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <Link
              to={`/recipe/${r.id}`}
              className="font-medium text-blue-600 hover:underline"
            >
              {r.title}
            </Link>
            <FavoriteButton recipeId={r.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
