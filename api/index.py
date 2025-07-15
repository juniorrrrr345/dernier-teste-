from flask import Flask, jsonify, request
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({
        "message": "Bienvenue sur mon API Python!",
        "timestamp": datetime.now().isoformat(),
        "status": "success"
    })

@app.route('/api/hello')
def hello():
    name = request.args.get('name', 'Monde')
    return jsonify({
        "message": f"Bonjour {name}!",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/weather')
def weather():
    # Simulation d'une API météo
    return jsonify({
        "city": "Paris",
        "temperature": 22,
        "condition": "Ensoleillé",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        # Simuler une liste d'utilisateurs
        users = [
            {"id": 1, "name": "Alice", "email": "alice@example.com"},
            {"id": 2, "name": "Bob", "email": "bob@example.com"},
            {"id": 3, "name": "Charlie", "email": "charlie@example.com"}
        ]
        return jsonify({"users": users})
    
    elif request.method == 'POST':
        data = request.get_json()
        if not data or 'name' not in data:
            return jsonify({"error": "Le nom est requis"}), 400
        
        # Simuler l'ajout d'un utilisateur
        new_user = {
            "id": 4,
            "name": data['name'],
            "email": data.get('email', f"{data['name'].lower()}@example.com")
        }
        return jsonify({"message": "Utilisateur créé", "user": new_user}), 201

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Route non trouvée"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Erreur interne du serveur"}), 500

# Pour le développement local
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))