import { useState } from "react";

export default function AddRecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!title.trim()) formErrors.title = "Title is required.";
    if (!ingredients.trim()) {
      formErrors.ingredients = "Ingredients are required.";
    } else if (ingredients.split(",").length < 3) {
      formErrors.ingredients = "Please add at least 3 ingredients.";
    }
    if (!steps.trim()) {
      formErrors.steps = "Preparation steps are required.";
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
      steps: steps.split("\n").map((step) => step.trim()), 
    };

    if (onAddRecipe) onAddRecipe(newRecipe);

    // Reset Form
    setTitle("");
    setIngredients("");
    setSteps("");
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
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. flour, sugar, eggs"
            rows="3"
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        {/* Steps */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Preparation Steps
          </label>
          <textarea
            className="w-full border rounded-lg p-2 md:p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Write each step on a new line..."
            rows="5"
          />
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
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
