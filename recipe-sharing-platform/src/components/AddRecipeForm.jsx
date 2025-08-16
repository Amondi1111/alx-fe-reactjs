import { useState } from "react";

export default function AddRecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [Ingredients, setIngredients] = useState("");
  const [Instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!title.trim()) formErrors.title = "Title is required.";
    if (!Ingredients.trim()) {
      formErrors.Ingredients = "Ingredients are required.";
    } else if (Ingredients.split(",").length < 3) {
      formErrors.Ingredients = "Please add at least 3 ingredients.";
    }
    if (!Instructions.trim()) {
        formErrors.Instructions = "Preparation instructions are required.";
    }
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newRecipe = {
      id: Date.now(),
      title,
      ingredients: ingredients.split(",").map((item) => item.trim()),
      instructions: instructions.split("\n").map((step) => step.trim()), 
    };

    if (onAddRecipe) onAddRecipe(newRecipe);

    // Reset Form
    setTitle("");
    setIngredients("");
    setInstructions("");
    setErrors({});
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 md:p-8 max-w-md md:max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add a New Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Recipe Title
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Ingredients (comma separated)
          </label>
          <textarea
            className="w-full border rounded-lg p-2 md:p-3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={Ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. flour, sugar, eggs"
            rows="3"
          />
          {errors.Ingredients && <p className="text-red-500 text-sm mt-1">{errors.Ingredients}</p>}
        </div>

        {/* Preparation Instructions */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Preparation Instructions
          </label>
          <textarea
            className="w-full border rounded-lg p-2 md:p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={Instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Write preparation instructions on a new line..."
            rows="5"
          />
         {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}
