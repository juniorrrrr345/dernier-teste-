'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react';
import { Product, ShopConfig } from '@/types';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [config, setConfig] = useState<ShopConfig>({
    name: '',
    description: '',
    backgroundColor: '#1a1a1a',
    backgroundImage: '',
    isDarkMode: true,
    footer: '',
    socialLinks: {}
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditingConfig, setIsEditingConfig] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      const [productsRes, configRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/config')
      ]);
      
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData.data || []);
      }
      
      if (configRes.ok) {
        const configData = await configRes.json();
        setConfig(configData.data || {});
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (response.ok) {
        localStorage.setItem('admin-auth', 'true');
        setIsAuthenticated(true);
        loadData();
      } else {
        alert('Mot de passe incorrect');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Erreur de connexion');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleSaveProduct = async (product: Product) => {
    try {
      const response = await fetch('/api/products', {
        method: product.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      
      if (response.ok) {
        setEditingProduct(null);
        loadData();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        loadData();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSaveConfig = async () => {
    try {
      const response = await fetch('/api/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      
      if (response.ok) {
        setIsEditingConfig(false);
      }
    } catch (error) {
      console.error('Error saving config:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Administration
              </h1>
              <p className="text-gray-400">
                Connectez-vous pour gérer votre boutique
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Entrez le mot de passe"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-500 transition-colors duration-200"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Administration</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors duration-200"
          >
            Déconnexion
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Configuration de la boutique</h2>
              <button
                onClick={() => setIsEditingConfig(!isEditingConfig)}
                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors duration-200"
              >
                {isEditingConfig ? <X size={16} /> : <Edit size={16} />}
              </button>
            </div>
            
            {isEditingConfig ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom de la boutique</label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => setConfig({...config, name: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={config.description}
                    onChange={(e) => setConfig({...config, description: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Couleur de fond</label>
                  <input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => setConfig({...config, backgroundColor: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Mode sombre</label>
                  <input
                    type="checkbox"
                    checked={config.isDarkMode}
                    onChange={(e) => setConfig({...config, isDarkMode: e.target.checked})}
                    className="mr-2"
                  />
                  <span>Activer le mode sombre</span>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Footer</label>
                  <input
                    type="text"
                    value={config.footer}
                    onChange={(e) => setConfig({...config, footer: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  />
                </div>
                
                <button
                  onClick={handleSaveConfig}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-colors duration-200"
                >
                  <Save size={16} className="inline mr-2" />
                  Sauvegarder
                </button>
              </div>
            ) : (
              <div className="space-y-2 text-gray-300">
                <p><strong>Nom:</strong> {config.name}</p>
                <p><strong>Description:</strong> {config.description}</p>
                <p><strong>Mode sombre:</strong> {config.isDarkMode ? 'Oui' : 'Non'}</p>
                <p><strong>Footer:</strong> {config.footer}</p>
              </div>
            )}
          </div>

          {/* Products Management */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Gestion des produits</h2>
              <button
                onClick={() => setEditingProduct({} as Product)}
                className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors duration-200"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {products.map((product) => (
                <div key={product.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-400">{product.price}€</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-1 bg-blue-600 text-white rounded hover:bg-blue-500"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-1 bg-red-600 text-white rounded hover:bg-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Edit Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-6">
                {editingProduct.id ? 'Modifier le produit' : 'Ajouter un produit'}
              </h3>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSaveProduct(editingProduct);
              }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom</label>
                  <input
                    type="text"
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={editingProduct.description || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Prix (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingProduct.price || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">URL de l'image</label>
                  <input
                    type="url"
                    value={editingProduct.imageUrl || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, imageUrl: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">URL de la vidéo</label>
                  <input
                    type="url"
                    value={editingProduct.videoUrl || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, videoUrl: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Lien de commande</label>
                  <input
                    type="url"
                    value={editingProduct.orderLink || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, orderLink: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                  <input
                    type="text"
                    value={editingProduct.slug || ''}
                    onChange={(e) => setEditingProduct({...editingProduct, slug: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                    required
                  />
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-colors duration-200"
                  >
                    <Save size={16} className="inline mr-2" />
                    Sauvegarder
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors duration-200"
                  >
                    <X size={16} className="inline mr-2" />
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}