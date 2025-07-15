# 🌿 La Main Verte - Boutique en ligne

Une application Flask moderne pour gérer une boutique de produits naturels avec interface d'administration complète.

## 🚀 Fonctionnalités

### ✨ Interface publique
- **Catalogue de produits** avec filtres par catégorie et provenance
- **Pages dynamiques** créées depuis l'admin
- **Support vidéo et images** pour les produits
- **Prix multiples** par produit
- **Réseaux sociaux** personnalisables
- **Design responsive** et moderne
- **Animations** et effets visuels

### 🔧 Interface d'administration
- **Gestion complète des produits** (ajout, modification, suppression)
- **Configuration du site** (couleurs, textes, logo, image de fond)
- **Gestion des réseaux sociaux** (principaux + personnalisés)
- **Création de pages dynamiques**
- **Upload d'images et vidéos**
- **Système de prix multiples**

## 🛠️ Installation et déploiement

### Déploiement sur Vercel

1. **Fork ou clonez ce repository**

2. **Connectez-vous à Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub

3. **Importez le projet**
   - Cliquez sur "New Project"
   - Importez votre repository
   - Vercel détectera automatiquement la configuration Python

4. **Configuration automatique**
   - Le fichier `vercel.json` est déjà configuré
   - Les dépendances sont dans `requirements.txt`
   - L'application démarre sur `/api/index.py`

5. **Déployez !**
   - Cliquez sur "Deploy"
   - Votre site sera accessible en quelques minutes

### Configuration initiale

1. **Accédez à l'admin**
   - Allez sur `votre-site.vercel.app/admin`
   - Mot de passe par défaut : `admin123`

2. **Configurez votre site**
   - Modifiez le titre, sous-titre, couleurs
   - Ajoutez votre logo et image de fond
   - Configurez vos réseaux sociaux

3. **Ajoutez vos produits**
   - Utilisez l'interface d'administration
   - Ajoutez des images/vidéos
   - Configurez les prix multiples

## 📁 Structure du projet

```
├── api/
│   └── index.py          # Point d'entrée principal pour Vercel
├── templates/            # Templates HTML
│   ├── base.html         # Template de base
│   ├── index.html        # Page d'accueil
│   ├── product_detail.html
│   ├── admin_dashboard.html
│   └── ...
├── static/              # Fichiers statiques (images, vidéos)
│   └── uploads/
├── vercel.json          # Configuration Vercel
├── requirements.txt     # Dépendances Python
└── README.md
```

## 🎨 Personnalisation

### Couleurs du thème
- **Couleur primaire** : `#2e7d32` (vert foncé)
- **Couleur secondaire** : `#4caf50` (vert clair)
- **Couleur d'accent** : `#81C784` (vert pastel)
- **Couleur de texte** : `#FFFFFF` (blanc)
- **Couleur de fond** : `#1B5E20` (vert très foncé)

### Effets visuels
- **Effets de titre** : lumineux, 3D, néon, dégradé, hologramme
- **Animations de texte** : fondu, glissement, machine à écrire, rebond, vague
- **Animations de cartes** : flottement, pulsation, rotation, mise à l'échelle

## 📱 Fonctionnalités avancées

### Réseaux sociaux
- **Principaux** : Instagram, Facebook, Twitter, TikTok
- **Personnalisés** : Signal, Telegram, WhatsApp, etc.

### Gestion des médias
- **Images** : JPG, PNG, GIF (redimensionnement automatique)
- **Vidéos** : MP4, MOV, AVI, MKV, WebM
- **Taille maximale** : 100MB par fichier

### Système de prix
- **Prix multiples** par produit
- **Quantités personnalisées** (g, kg, unités, etc.)
- **Affichage formaté** avec symboles €

## 🔒 Sécurité

- **Mot de passe admin** configurable
- **Validation des fichiers** uploadés
- **Sécurisation des noms de fichiers**
- **Protection contre les injections**

## 📊 Performance

- **Images optimisées** automatiquement
- **Vidéos compressées** pour le web
- **Interface responsive** pour tous les appareils
- **Chargement rapide** grâce à Vercel

## 🚀 Développement local

Si vous voulez tester en local :

```bash
# Installer les dépendances
pip install -r requirements.txt

# Lancer l'application
python api/index.py

# Accéder à l'application
# http://localhost:5000
```

## 📝 Notes importantes

### Pour Vercel
- L'application utilise le runtime Python 3.9
- Les fichiers statiques sont servis automatiquement
- La configuration est dans `vercel.json`

### Limitations Vercel
- **Temps d'exécution** : 30 secondes max par requête
- **Taille des fichiers** : 100MB max
- **Stockage** : Les fichiers sont persistants entre les déploiements

### Conseils d'utilisation
1. **Optimisez vos images** avant upload
2. **Utilisez des formats web** (JPEG, PNG, MP4)
3. **Testez sur mobile** pour vérifier la responsivité
4. **Sauvegardez régulièrement** votre configuration

## 🆘 Support

Si vous rencontrez des problèmes :

1. **Vérifiez les logs** dans Vercel Dashboard
2. **Testez en local** d'abord
3. **Vérifiez les permissions** des fichiers
4. **Consultez la documentation** Flask

## 📄 Licence

Ce projet est open source et disponible sous licence MIT.

---

**🌿 La Main Verte** - Votre boutique de produits naturels en ligne !
