# 🌿 CBD Premium Boutique

Une boutique en ligne moderne et responsive pour les produits CBD, construite avec Next.js 14, Tailwind CSS et optimisée pour le déploiement sur Vercel.

## ✨ Fonctionnalités

### 🛍️ Boutique
- **Page d'accueil** : Affichage des produits sous forme de cartes avec vidéos
- **Pages de détail** : Vidéos intégrées, descriptions complètes, boutons de commande
- **Design responsive** : Optimisé pour mobile, tablette et desktop
- **Mode sombre/clair** : Basculement automatique selon la configuration

### 🔐 Administration
- **Authentification simple** : Connexion par mot de passe
- **Gestion des produits** : Ajout, modification, suppression
- **Configuration de la boutique** : Nom, description, couleurs, mode sombre
- **Gestion des médias** : Upload d'images et vidéos via URLs
- **Liens sociaux** : Configuration des réseaux sociaux

### 🎨 Personnalisation
- **Thème personnalisable** : Couleurs, images de fond
- **Mode sombre/clair** : Basculement automatique
- **Footer configurable** : Texte et liens personnalisables
- **SEO optimisé** : Métadonnées configurables

## 🚀 Technologies

- **Next.js 14** : Framework React avec App Router
- **TypeScript** : Typage statique pour la sécurité
- **Tailwind CSS** : Framework CSS utilitaire
- **Lucide React** : Icônes modernes
- **JSON Storage** : Stockage des données en fichiers JSON

## 📦 Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd cbd-boutique
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer en développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 🔧 Configuration

### Configuration initiale
Le mot de passe admin par défaut est `admin123`. Vous pouvez le modifier dans `src/data/config.json`.

### Structure des données
- `src/data/products.json` : Liste des produits
- `src/data/config.json` : Configuration de la boutique

### Ajout de produits
1. Accédez à `/admin`
2. Connectez-vous avec le mot de passe
3. Cliquez sur "Ajouter un produit"
4. Remplissez les informations :
   - Nom du produit
   - Description
   - Prix
   - URL de l'image
   - URL de la vidéo
   - Lien de commande
   - Slug (URL unique)

## 🎯 Déploiement sur Vercel

### 1. Préparation
```bash
# Build du projet
npm run build

# Test en production
npm start
```

### 2. Déploiement automatique
1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement Next.js
3. Le déploiement se fera automatiquement à chaque push

### 3. Variables d'environnement (optionnel)
Si nécessaire, ajoutez des variables d'environnement dans Vercel :
- `NEXT_PUBLIC_SITE_URL` : URL de votre site
- `ADMIN_PASSWORD` : Mot de passe admin (remplace le fichier config)

## 📱 Responsive Design

Le site est optimisé pour :
- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

## 🎨 Personnalisation

### Couleurs
Modifiez les couleurs dans `tailwind.config.js` ou utilisez les classes Tailwind directement.

### Images et vidéos
- Utilisez des URLs externes pour les médias
- Formats supportés : JPG, PNG, MP4, WebM
- Taille recommandée : 1920x1080 pour les vidéos

### Police
La police Geist est utilisée par défaut. Vous pouvez la changer dans `src/app/layout.tsx`.

## 🔒 Sécurité

- Authentification simple par mot de passe
- Validation des données côté serveur
- Protection contre les injections
- Headers de sécurité automatiques

## 📈 Performance

- **Images optimisées** : Next.js Image component
- **Lazy loading** : Chargement différé des médias
- **Code splitting** : Chargement à la demande
- **SEO optimisé** : Métadonnées dynamiques

## 🛠️ Développement

### Structure du projet
```
src/
├── app/                 # Pages Next.js 14
│   ├── admin/          # Panel d'administration
│   ├── api/            # API routes
│   ├── produit/        # Pages de détail
│   └── globals.css     # Styles globaux
├── components/         # Composants réutilisables
├── data/              # Données JSON
├── lib/               # Utilitaires
└── types/             # Types TypeScript
```

### Scripts disponibles
```bash
npm run dev          # Développement
npm run build        # Build production
npm run start        # Serveur production
npm run lint         # Vérification ESLint
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
1. Vérifiez la documentation
2. Consultez les issues GitHub
3. Contactez l'équipe de développement

---

**Développé avec ❤️ pour la communauté CBD**
