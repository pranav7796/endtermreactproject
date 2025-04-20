import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { Clock, Users, Heart } from 'lucide-react';

export function Recipe() {
  const { id } = useParams();
  const { getRecipeById, addToFavorites, removeFromFavorites, isFavorite, loading } = useRecipes();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const data = await getRecipeById(id);
      setRecipe(data);
    };
    fetchRecipe();
  }, [id, getRecipeById]);

  if (loading || !recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  const toggleFavorite = () => {
    if (isFavorite(recipe.id)) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{recipe.title}</h1>
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full ${
                isFavorite(recipe.id)
                  ? 'text-red-500 hover:text-red-600'
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className="h-6 w-6" fill={isFavorite(recipe.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="flex items-center space-x-4 text-gray-600 mb-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-1" />
              <span>{recipe.readyInMinutes} mins</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-1" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="mb-6">{recipe.summary}</p>
            
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="mb-6">
              {recipe.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id} className="mb-1">
                  {ingredient.original}
                </li>
              ))}
            </ul>
            
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <div className="whitespace-pre-line">
              {recipe.instructions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}