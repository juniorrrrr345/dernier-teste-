import pytest
from api.index import app
import json

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_home_endpoint(client):
    """Test de l'endpoint d'accueil"""
    response = client.get('/')
    data = json.loads(response.data)
    
    assert response.status_code == 200
    assert 'message' in data
    assert 'timestamp' in data
    assert data['status'] == 'success'

def test_hello_endpoint_default(client):
    """Test de l'endpoint hello avec nom par défaut"""
    response = client.get('/api/hello')
    data = json.loads(response.data)
    
    assert response.status_code == 200
    assert 'Bonjour Monde!' in data['message']
    assert 'timestamp' in data

def test_hello_endpoint_with_name(client):
    """Test de l'endpoint hello avec nom personnalisé"""
    response = client.get('/api/hello?name=Alice')
    data = json.loads(response.data)
    
    assert response.status_code == 200
    assert 'Bonjour Alice!' in data['message']

def test_weather_endpoint(client):
    """Test de l'endpoint météo"""
    response = client.get('/api/weather')
    data = json.loads(response.data)
    
    assert response.status_code == 200
    assert 'city' in data
    assert 'temperature' in data
    assert 'condition' in data
    assert data['city'] == 'Paris'

def test_users_get_endpoint(client):
    """Test de l'endpoint users GET"""
    response = client.get('/api/users')
    data = json.loads(response.data)
    
    assert response.status_code == 200
    assert 'users' in data
    assert isinstance(data['users'], list)
    assert len(data['users']) > 0

def test_users_post_endpoint_success(client):
    """Test de l'endpoint users POST avec succès"""
    user_data = {'name': 'Test User', 'email': 'test@example.com'}
    response = client.post('/api/users', 
                          data=json.dumps(user_data),
                          content_type='application/json')
    data = json.loads(response.data)
    
    assert response.status_code == 201
    assert 'message' in data
    assert 'user' in data
    assert data['user']['name'] == 'Test User'

def test_users_post_endpoint_missing_name(client):
    """Test de l'endpoint users POST sans nom"""
    user_data = {'email': 'test@example.com'}
    response = client.post('/api/users',
                          data=json.dumps(user_data),
                          content_type='application/json')
    data = json.loads(response.data)
    
    assert response.status_code == 400
    assert 'error' in data

def test_404_error(client):
    """Test de la gestion des erreurs 404"""
    response = client.get('/endpoint-inexistant')
    data = json.loads(response.data)
    
    assert response.status_code == 404
    assert 'error' in data