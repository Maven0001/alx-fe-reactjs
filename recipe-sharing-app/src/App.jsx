import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecipeList } from "./components/RecipeList";
import { RecipeDetails } from "./components/RecipeDetails";
import { EditRecipeForm } from "./components/EditRecipeForm";
import { FavoritesList } from "./components/FavoritesList";
import { RecommendationsList } from "./components/RecommendationsList";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Recipe Sharing App
          </h1>
          <p className="mt-2 text-gray-600">
            Discover, save, and cook your favorites
          </p>
        </header>

        <main className="mx-auto max-w-7xl">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FavoritesList />
                  <RecommendationsList />
                  <div className="mt-10">
                    <RecipeList />
                  </div>
                </>
              }
            />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/edit/:id" element={<EditRecipeForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
