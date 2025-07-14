import { NextRequest, NextResponse } from 'next/server';
import { getAdminConfig } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const adminConfig = getAdminConfig();
    
    if (password === adminConfig.password) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: 'Mot de passe incorrect' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}