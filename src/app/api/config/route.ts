import { NextRequest, NextResponse } from 'next/server';
import { getShopConfig, saveShopConfig } from '@/lib/data';

export async function GET() {
  try {
    const config = getShopConfig();
    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération de la configuration' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const configData = await request.json();
    saveShopConfig(configData);
    
    return NextResponse.json({ success: true, data: configData });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la sauvegarde de la configuration' },
      { status: 500 }
    );
  }
}