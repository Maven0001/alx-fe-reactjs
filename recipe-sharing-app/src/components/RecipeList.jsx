// RecipeList component
import { Link } from "react-router-dom";
import { useRecipeStore, Recipe } from "./recipeStore";
import { SearchBar } from "./SearchBar";
import { RecipeCard } from "./RecipeCard";

const RecipeList = () => {
  const { filteredRecipes } = useRecipeStore();

  return (
    <div className="mx-auto max-w-6xl">
      <SearchBar />

      {filteredRecipes.length === 0 ? (
        <p className="text-center text-gray-600">
          No recipes found. Try adjusting your search.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
