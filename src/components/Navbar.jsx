import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Home as HomeIcon } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <HomeIcon className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold text-gray-800">Recipe Finder</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/search" className="p-2 text-gray-600 hover:text-orange-500">
              <Search className="h-6 w-6" />
            </Link>
            <Link to="/favorites" className="p-2 text-gray-600 hover:text-orange-500">
              <Heart className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}