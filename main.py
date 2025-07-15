#!/usr/bin/env python3
"""
Application Python pour Replit et Vercel
Ce fichier est utilisé pour le développement local et sur Replit
"""

from api.index import app

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)