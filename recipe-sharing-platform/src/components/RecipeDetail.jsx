import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import data from "../data.json";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = data.find((r) => String(r.id) === id);
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return <p className="text-center mt-8 text-gray-600">Recipe not found...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      {/* Ingredients Section */}
      <section className="mb-6">
        <h2 className="shadow-lg text-2xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1">
          {recipe.Ingredients?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
       

          {/* Instructions Section */}
      <section className="mt-6">
        <h2 className="shadow-lg text-xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal pl-5 space-y-2">
          {recipe.Instructions?.map((Instructions, index) => (
            <li key={index}>{Instructions}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}
