import fs from 'fs';
import path from 'path';
import { Product, ShopConfig, AdminConfig } from '@/types';

const dataDir = path.join(process.cwd(), 'src/data');

export function getProducts(): Product[] {
  try {
    const filePath = path.join(dataDir, 'products.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return data.products || [];
  } catch (error) {
    console.error('Error reading products:', error);
    return [];
  }
}

export function getProductBySlug(slug: string): Product | null {
  const products = getProducts();
  return products.find(product => product.slug === slug) || null;
}

export function saveProducts(products: Product[]): void {
  try {
    const filePath = path.join(dataDir, 'products.json');
    const data = { products };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving products:', error);
  }
}

export function getShopConfig(): ShopConfig {
  try {
    const filePath = path.join(dataDir, 'config.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return data.shop || {};
  } catch (error) {
    console.error('Error reading shop config:', error);
    return {
      name: 'CBD Boutique',
      description: 'Votre boutique CBD de confiance',
      backgroundColor: '#1a1a1a',
      backgroundImage: '',
      isDarkMode: true,
      footer: '© 2024 CBD Boutique',
      socialLinks: {}
    };
  }
}

export function getAdminConfig(): AdminConfig {
  try {
    const filePath = path.join(dataDir, 'config.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return data.admin || { password: 'admin123' };
  } catch (error) {
    console.error('Error reading admin config:', error);
    return { password: 'admin123' };
  }
}

export function saveShopConfig(config: ShopConfig): void {
  try {
    const filePath = path.join(dataDir, 'config.json');
    const adminConfig = getAdminConfig();
    const data = {
      shop: config,
      admin: adminConfig
    };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving shop config:', error);
  }
}

export function saveAdminConfig(config: AdminConfig): void {
  try {
    const filePath = path.join(dataDir, 'config.json');
    const shopConfig = getShopConfig();
    const data = {
      shop: shopConfig,
      admin: config
    };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving admin config:', error);
  }
}