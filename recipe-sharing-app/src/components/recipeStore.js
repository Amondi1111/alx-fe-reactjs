import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    set((state) => ({
      filteredRecipes: state.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      )
    }));
  },

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      )
    })),

  addRecipe: (newRecipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, newRecipe];
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter(recipe => recipe.id !== id);
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      );
      return {
        recipes: updatedRecipes,
        filteredRecipes: updatedRecipes.filter(recipe =>
          recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
      };
    }),
}));
