import SearchBar from "./SearchBar";
import RecipeCard from "./RecipeCard";
import useRecipeStore from "./recipeStore";

const RecipeList = () => {
  const { filteredRecipes } = useRecipeStore();

  return (
    <div>
      <SearchBar />
      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-600">No recipes found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
