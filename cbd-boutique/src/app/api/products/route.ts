import { NextRequest, NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/data';
import { Product } from '@/types';

export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des produits' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    const products = getProducts();
    
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    products.push(newProduct);
    saveProducts(products);
    
    return NextResponse.json({ success: true, data: newProduct });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du produit' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const productData = await request.json();
    const products = getProducts();
    
    const index = products.findIndex(p => p.id === productData.id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Produit non trouvé' },
        { status: 404 }
      );
    }
    
    const updatedProduct: Product = {
      ...products[index],
      ...productData,
      updatedAt: new Date().toISOString(),
    };
    
    products[index] = updatedProduct;
    saveProducts(products);
    
    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la mise à jour du produit' },
      { status: 500 }
    );
  }
}