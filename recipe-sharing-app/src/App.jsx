import "./App.css";
import AddRecipeForm from "./components/AddRecipeForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecipeList } from "./components/RecipeList";
import { RecipeDetails } from "./components/RecipeDetails";
import { EditRecipeForm } from "./components/EditRecipeForm";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 p-6">
          <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
            Recipe Sharing App
          </h1>

          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/addrecipe:id" element={<AddRecipeForm />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/edit/:id" element={<EditRecipeForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
