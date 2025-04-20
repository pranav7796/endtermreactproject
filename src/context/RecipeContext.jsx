import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const RecipeContext = createContext();

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const API_URL = 'https://api.spoonacular.com/recipes';

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    fetchFeaturedRecipes();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchFeaturedRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/random`, {
        params: {
          apiKey: API_KEY,
          number: 6
        }
      });
      setFeaturedRecipes(response.data.recipes);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch featured recipes. Please try again later.');
      setLoading(false);
    }
  };

  const searchRecipes = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/complexSearch`, {
        params: {
          apiKey: API_KEY,
          query,
          number: 12,
          addRecipeInformation: true,
          fillIngredients: true
        }
      });
      setRecipes(response.data.results);
      setLoading(false);
    } catch (err) {
      setError('Failed to search recipes. Please try again later.');
      setLoading(false);
    }
  };

  const getRecipeById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/${id}/information`, {
        params: {
          apiKey: API_KEY
        }
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError('Failed to fetch recipe details. Please try again later.');
      setLoading(false);
      return null;
    }
  };

  const addToFavorites = (recipe) => {
    if (!favorites.some(fav => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(recipe => recipe.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some(recipe => recipe.id === id);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        featuredRecipes,
        loading,
        error,
        favorites,
        searchRecipes,
        getRecipeById,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};