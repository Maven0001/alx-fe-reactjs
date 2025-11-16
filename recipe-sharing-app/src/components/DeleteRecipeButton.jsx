import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

interface Props {
  id: string;
}

export const DeleteRecipeButton = ({ id }: Props) => {
  const { deleteRecipe } = useRecipeStore();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(id);
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
};
