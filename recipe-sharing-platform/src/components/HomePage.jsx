import { useState, useEffect } from "react"
import data from "./data.json"

export default function HomePage() {
    const [recipe, setRecipe] = useState([]);

    useEffect(() => {
        setRecipe(data)
}, []);
    return(
        <div className="w-16 md:w-32 lg:w-48">
            <h1 className="text-size-24 text-color-500 font-bold text-left">Recipe Sharing Platform </h1>
                < div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recipe.map(recipe => (

              <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 text-sm">{recipe.summary}</p>
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