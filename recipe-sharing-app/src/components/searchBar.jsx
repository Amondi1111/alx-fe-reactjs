import React from 'react';
import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);
  const filterRecipes = useRecipeStore(state => state.filterRecipes); 

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterRecipes();
  };

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={handleChange}
      style={{
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc'
      }}
    />
  );
};

export default SearchBar;
