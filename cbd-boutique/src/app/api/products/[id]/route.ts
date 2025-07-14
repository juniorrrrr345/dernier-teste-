import { NextRequest, NextResponse } from 'next/server';
import { getProducts, saveProducts } from '@/lib/data';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const products = getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    
    if (filteredProducts.length === products.length) {
      return NextResponse.json(
        { success: false, error: 'Produit non trouvé' },
        { status: 404 }
      );
    }
    
    saveProducts(filteredProducts);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la suppression du produit' },
      { status: 500 }
    );
  }
}