import React, { useState, useEffect } from "react";
import axios from "axios";
 import "./index.css";
const API_KEY = "082f1176913c8d600d012ba8839b132e"; // Replace with your API key
const API_URL = "https://api.edamam.com/api/recipes/v2?type=public";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  // Function to fetch recipes
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: searchTerm,
          app_id: "190e4adf",
          app_key: API_KEY
        }  
      });
      setRecipes(response.data.hits);
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [searchTerm]);

  // Function to handle recipe selection
  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe.recipe);
  };

  // Function to save favorite recipes
  const handleSaveFavorite = () => {
    if (selectedRecipe) {
      setFavoriteRecipes([...favoriteRecipes, selectedRecipe]);
    }
  };

  return (
    <div className="App">
      <h1>Recipe Finder</h1>
      <input
        type="text"
        placeholder="Search for recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="recipes">
        <div className="recipe-list">
          <h2>Search Results</h2>
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>
                <button onClick={() => handleRecipeSelect(recipe)}>
                  {recipe.recipe.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {selectedRecipe && (
          <div className="recipe-details">
            <h2>Recipe Details</h2>
            <h3>{selectedRecipe.label}</h3>
            <img src={selectedRecipe.image} alt={selectedRecipe.label} />
            <p>Ingredients:</p>
            <ul>
              {selectedRecipe.ingredientLines.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p>Cooking Instructions:</p>
            <ul>
              {selectedRecipe.preparation.map((step, index) => (
                <li key={index}>{step.text}</li>
              ))}
            </ul>
            <button onClick={handleSaveFavorite}>Save as Favorite</button>
          </div>
        )}
      </div>

      <div className="favorite-recipes">
        <h2>Favorite Recipes</h2>
        <ul>
          {favoriteRecipes.map((recipe, index) => (
            <li key={index}>{recipe.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
