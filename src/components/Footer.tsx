'use client';

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';
import { ShopConfig } from '@/types';

interface FooterProps {
  config: ShopConfig;
}

export default function Footer({ config }: FooterProps) {
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
  };

  return (
    <footer className={`py-8 transition-all duration-300 ${
      config.isDarkMode 
        ? 'bg-gray-900 text-gray-300' 
        : 'bg-gray-50 text-gray-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shop Info */}
          <div>
            <h3 className={`font-bold text-lg mb-4 ${
              config.isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {config.name}
            </h3>
            <p className="text-sm leading-relaxed">
              {config.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-bold text-lg mb-4 ${
              config.isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Liens rapides
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/" 
                  className={`transition-colors duration-200 ${
                    config.isDarkMode 
                      ? 'hover:text-white' 
                      : 'hover:text-gray-900'
                  }`}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin" 
                  className={`transition-colors duration-200 ${
                    config.isDarkMode 
                      ? 'hover:text-white' 
                      : 'hover:text-gray-900'
                  }`}
                >
                  Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className={`font-bold text-lg mb-4 ${
              config.isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Suivez-nous
            </h3>
            <div className="flex space-x-4">
              {Object.entries(config.socialLinks).map(([platform, url]) => {
                if (!url) return null;
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      config.isDarkMode 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`mt-8 pt-8 border-t ${
          config.isDarkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <p className="text-center text-sm">
            {config.footer}
          </p>
        </div>
      </div>
    </footer>
  );
}