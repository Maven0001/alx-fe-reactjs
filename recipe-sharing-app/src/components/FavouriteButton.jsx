import { useRecipeStore } from "../store/recipeStore";

interface Props {
  recipeId: string;
}

export const FavoriteButton = ({ recipeId }: Props) => {
  const { favorites, toggleFavorite } = useRecipeStore();
  const isFavorite = favorites.includes(recipeId);

  return (
    <button
      onClick={() => toggleFavorite(recipeId)}
      className={`flex items-center gap-1 rounded px-3 py-1 text-sm font-medium transition ${
        isFavorite
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
};
