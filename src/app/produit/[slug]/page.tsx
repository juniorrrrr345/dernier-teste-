import { notFound } from 'next/navigation';
import { getProductBySlug, getShopConfig } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ExternalLink, Play, Pause } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const config = getShopConfig();

  if (!product) {
    notFound();
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      config.isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}
    style={{
      backgroundColor: config.backgroundImage 
        ? `url(${config.backgroundImage})` 
        : config.backgroundColor,
      backgroundSize: config.backgroundImage ? 'cover' : 'auto',
      backgroundPosition: config.backgroundImage ? 'center' : 'auto',
    }}>
      <Header config={config} onToggleDarkMode={() => {}} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Media Section */}
            <div className="space-y-6">
              {/* Video Player */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                <video
                  src={product.videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
              
              {/* Image */}
              <div className="rounded-xl overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-8">
              {/* Product Info */}
              <div>
                <h1 className={`text-4xl font-bold mb-4 ${
                  config.isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {product.name}
                </h1>
                
                <p className={`text-2xl font-bold mb-6 ${
                  config.isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  {product.price.toFixed(2)} €
                </p>
                
                <p className={`text-lg leading-relaxed ${
                  config.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {product.description}
                </p>
              </div>

              {/* Order Button */}
              <div className="space-y-4">
                <a
                  href={product.orderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
                    config.isDarkMode 
                      ? 'bg-green-600 text-white hover:bg-green-500 shadow-lg hover:shadow-xl' 
                      : 'bg-green-600 text-white hover:bg-green-500 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <ExternalLink size={20} className="mr-2" />
                  Commander maintenant
                </a>
                
                <p className={`text-sm ${
                  config.isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Vous serez redirigé vers notre partenaire de confiance pour finaliser votre commande.
                </p>
              </div>

              {/* Additional Info */}
              <div className={`p-6 rounded-xl ${
                config.isDarkMode ? 'bg-gray-800' : 'bg-white'
              } border ${
                config.isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <h3 className={`font-bold text-lg mb-4 ${
                  config.isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Informations importantes
                </h3>
                <ul className={`space-y-2 text-sm ${
                  config.isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <li>• Produit CBD de qualité premium</li>
                  <li>• Livraison discrète et sécurisée</li>
                  <li>• Paiement sécurisé</li>
                  <li>• Service client disponible 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer config={config} />
    </div>
  );
}