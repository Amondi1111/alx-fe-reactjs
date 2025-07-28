import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import searchBar from './components/searchBar'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Recipe Sharing App</h1>
      <searchBar/>
      <AddRecipeForm />
      <RecipeList />
    </div>
     }
        />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
