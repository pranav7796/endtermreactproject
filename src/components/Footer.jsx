import React from 'react';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white shadow-lg mt-8">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">© 2024 Recipe Finder. All rights reserved.</p>
          <a
            href="https://github.com/yourusername/recipe-finder"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-orange-500"
          >
            <Github className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}