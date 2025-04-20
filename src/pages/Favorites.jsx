import React from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import { Clock, Users, Trash2 } from 'lucide-react';

export function Favorites() {
  const { favorites, removeFromFavorites } = useRecipes();

  if (favorites.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Favorites</h1>
        <div className="text-center py-12">
          <p className="text-gray-600">You haven't saved any recipes yet.</p>
          <Link to="/search" className="text-orange-500 hover:text-orange-600 mt-2 inline-block">
            Start searching for recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">My Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/recipe/${recipe.id}`}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <Link to={`/recipe/${recipe.id}`}>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{recipe.title}</h2>
              </Link>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{recipe.readyInMinutes} mins</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{recipe.servings} servings</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromFavorites(recipe.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}