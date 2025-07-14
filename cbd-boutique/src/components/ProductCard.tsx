'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Pause } from 'lucide-react';
import { Product, ShopConfig } from '@/types';

interface ProductCardProps {
  product: Product;
  config: ShopConfig;
}

export default function ProductCard({ product, config }: ProductCardProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleVideoClick = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <div className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
      config.isDarkMode 
        ? 'bg-gray-800 hover:bg-gray-700' 
        : 'bg-white hover:bg-gray-50'
    } shadow-lg hover:shadow-xl`}>
      {/* Media Container */}
      <div className="relative aspect-video overflow-hidden">
        {/* Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <video
            src={product.videoUrl}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            autoPlay={isVideoPlaying}
          />
          
          {/* Play/Pause Button */}
          <button
            onClick={handleVideoClick}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
              isVideoPlaying ? 'opacity-0' : 'opacity-100'
            } group-hover:opacity-100`}
          >
            <div className={`p-4 rounded-full ${
              config.isDarkMode 
                ? 'bg-white/20 backdrop-blur-sm' 
                : 'bg-black/20 backdrop-blur-sm'
            }`}>
              {isVideoPlaying ? (
                <Pause size={32} className="text-white" />
              ) : (
                <Play size={32} className="text-white" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`font-bold text-xl mb-2 ${
          config.isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {product.name}
        </h3>
        
        <p className={`text-sm mb-4 line-clamp-2 ${
          config.isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className={`text-2xl font-bold ${
            config.isDarkMode ? 'text-green-400' : 'text-green-600'
          }`}>
            {product.price.toFixed(2)} €
          </span>
          
          <Link
            href={`/produit/${product.slug}`}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              config.isDarkMode 
                ? 'bg-green-600 text-white hover:bg-green-500' 
                : 'bg-green-600 text-white hover:bg-green-500'
            }`}
          >
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
}