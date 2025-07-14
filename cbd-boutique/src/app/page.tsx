import { getProducts, getShopConfig } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ShopConfig } from '@/types';

export default function HomePage() {
  const products = getProducts();
  const config = getShopConfig();

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
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
              config.isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {config.name}
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              config.isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {config.description}
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-3xl font-bold text-center mb-12 ${
              config.isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Nos Produits CBD
            </h2>
            
            {products.length === 0 ? (
              <div className={`text-center py-12 ${
                config.isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <p className="text-lg">Aucun produit disponible pour le moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    config={config} 
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer config={config} />
    </div>
  );
}
