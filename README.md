# API Python pour Replit et Vercel

Ce projet est une API Python simple qui peut être développée sur Replit et déployée sur Vercel.

## 🚀 Fonctionnalités

- API REST avec Flask
- Endpoints pour différents services
- Compatible avec Replit et Vercel
- Configuration automatique pour le déploiement

## 📋 Endpoints disponibles

### GET /
Page d'accueil avec informations de base

### GET /api/hello?name=Nom
Salutation personnalisée

### GET /api/weather
Informations météo simulées

### GET /api/users
Liste des utilisateurs

### POST /api/users
Créer un nouvel utilisateur

## 🛠️ Installation et développement

### Sur Replit

1. Clonez ce repository dans votre Replit
2. Les dépendances s'installeront automatiquement
3. Cliquez sur "Run" pour démarrer le serveur

### En local

```bash
# Installer les dépendances
pip install -r requirements.txt

# Démarrer le serveur
python main.py
```

Le serveur sera accessible sur `http://localhost:8080`

## 🚀 Déploiement sur Vercel

### Prérequis

1. Compte Vercel
2. CLI Vercel installé (`npm i -g vercel`)

### Étapes de déploiement

1. **Connectez-vous à Vercel :**
   ```bash
   vercel login
   ```

2. **Déployez le projet :**
   ```bash
   vercel
   ```

3. **Pour les déploiements suivants :**
   ```bash
   vercel --prod
   ```

### Configuration Vercel

Le fichier `vercel.json` configure automatiquement :
- Le runtime Python 3.9
- Les routes vers l'API
- La structure de déploiement

## 📁 Structure du projet

```
├── api/
│   └── index.py          # Point d'entrée pour Vercel
├── main.py               # Point d'entrée pour Replit/local
├── requirements.txt       # Dépendances Python
├── vercel.json           # Configuration Vercel
├── .replit               # Configuration Replit
├── pyproject.toml        # Configuration Python moderne
└── README.md             # Ce fichier
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` pour les variables locales :

```env
FLASK_ENV=development
PORT=8080
```

### Personnalisation

1. **Ajouter de nouveaux endpoints :** Modifiez `api/index.py`
2. **Changer la configuration :** Modifiez `vercel.json`
3. **Ajouter des dépendances :** Modifiez `requirements.txt`

## 🧪 Tests

```bash
# Installer les dépendances de développement
pip install -e ".[dev]"

# Lancer les tests
pytest

# Formater le code
black .

# Vérifier la qualité du code
flake8 .
```

## 📝 Exemples d'utilisation

### Test de l'API

```bash
# Test de la page d'accueil
curl https://votre-projet.vercel.app/

# Test de l'endpoint hello
curl "https://votre-projet.vercel.app/api/hello?name=Alice"

# Test de l'endpoint users
curl https://votre-projet.vercel.app/api/users

# Créer un utilisateur
curl -X POST https://votre-projet.vercel.app/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Nouveau", "email": "nouveau@example.com"}'
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez que toutes les dépendances sont installées
2. Consultez les logs Vercel pour les erreurs de déploiement
3. Testez en local avant de déployer

---

**Note :** Ce projet est optimisé pour fonctionner à la fois sur Replit (développement) et Vercel (production).
