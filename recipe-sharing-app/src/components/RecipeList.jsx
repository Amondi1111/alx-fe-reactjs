import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const addFavorite = useRecipeStore((state) => state.addFavorite);

  if (!Array.isArray(filteredRecipes)) {
    return <p>No recipes available.</p>;
  }

  return (
    <div>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <button onClick={() => addFavorite(recipe.id)}>Favorite</button>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
