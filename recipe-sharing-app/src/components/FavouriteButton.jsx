import useRecipeStore from "./recipeStore";

const FavoriteButton = ({ recipeId }) => {
  const { favorites, toggleFavorite } = useRecipeStore();
  const isFav = favorites.includes(recipeId);

  return (
    <button
      onClick={() => toggleFavorite(recipeId)}
      className={`px-3 py-1 rounded text-sm ${
        isFav ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
      }`}
    >
      {isFav ? "Remove" : "Add"}
    </button>
  );
};

export default FavoriteButton;
