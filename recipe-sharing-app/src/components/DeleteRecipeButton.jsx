import { useRecipeStore } from './recipeStore';
import { useNavigate } from 'react-router-dom';

function DeleteRecipeButton({ id }) {
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(id);
    navigate('/');
  };

  return <button onClick={handleDelete}>Delete Recipe</button>;
}

export default DeleteRecipeButton;
