import { useState, useEffect } from "react";
import data from "./data.json";

export default function HomePage() {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    setRecipe(data);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-left text-indigo-600 mb-6">
        Recipe Sharing Platform
      </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {recipe.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 md:h-56 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg md:text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 text-sm md:text-base">{recipe.summary}</p>
              <a
                href={`/recipes/${recipe.id}`}
                className="inline-block mt-4 text-indigo-600 hover:underline"
              >
                View Recipe →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
