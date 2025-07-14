'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { ShopConfig } from '@/types';

interface HeaderProps {
  config: ShopConfig;
  onToggleDarkMode: () => void;
}

export default function Header({ config, onToggleDarkMode }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      config.isDarkMode 
        ? 'bg-gray-900/95 backdrop-blur-sm border-b border-gray-800' 
        : 'bg-white/95 backdrop-blur-sm border-b border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full ${
              config.isDarkMode ? 'bg-green-500' : 'bg-green-600'
            } flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">CBD</span>
            </div>
            <span className={`font-bold text-xl ${
              config.isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {config.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition-colors duration-200 ${
                config.isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Accueil
            </Link>
            <Link 
              href="/admin" 
              className={`transition-colors duration-200 ${
                config.isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Admin
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 ${
                config.isDarkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {config.isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
                config.isDarkMode 
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t ${
            config.isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}>
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`transition-colors duration-200 ${
                  config.isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                href="/admin" 
                className={`transition-colors duration-200 ${
                  config.isDarkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}