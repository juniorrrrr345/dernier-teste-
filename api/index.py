from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
import json
import os
from werkzeug.utils import secure_filename
from PIL import Image
import uuid

app = Flask(__name__)
app.secret_key = 'votre-cle-secrete-unique-et-complexe-2024'

# Configuration
UPLOAD_FOLDER = 'static/uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'mov', 'avi', 'mkv', 'webm'}
MAX_CONTENT_LENGTH = 100 * 1024 * 1024  # 100MB max file size

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Créer les dossiers nécessaires
os.makedirs('templates', exist_ok=True)
os.makedirs('static/uploads', exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_config():
    try:
        with open('config.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return get_default_config()

def save_config(config):
    with open('config.json', 'w', encoding='utf-8') as f:
        json.dump(config, f, indent=2, ensure_ascii=False)

def get_default_config():
    return {
        "admin_password": "admin123",
        "site_title": "La Main Verte",
        "site_subtitle": "Votre boutique de produits naturels premium",
        "welcome_message": "Bienvenue chez La Main Verte ! Découvrez notre sélection de produits naturels de qualité. Utilisez les filtres ci-dessous pour explorer nos catégories.",
        "primary_color": "#2e7d32",
        "secondary_color": "#4caf50",
        "accent_color": "#81C784",
        "text_color": "#FFFFFF",
        "background_color": "#1B5E20",
        "font_family": "Poppins",
        "logo_path": "",
        "background_image": "",
        "categories": ["Plantes d'intérieur", "Jardinage", "Soins naturels", "Accessoires"],
        "farms": ["Bio Local", "Naturel Premium", "Artisanal", "Écologique"],
        "pages": {},
        "social_links": {
            "instagram": "",
            "facebook": "",
            "twitter": "",
            "tiktok": ""
        },
        "promotions": {
            "enabled": False,
            "title": "",
            "description": "",
            "discount_type": "percentage",
            "discount_value": 0,
            "background_color": "#ff4444",
            "text_color": "#ffffff"
        },
        "global_order_link": "",
        "custom_social_links": []
    }

def load_products():
    try:
        with open('products.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def save_products(products):
    with open('products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

def resize_image(image_path, max_size, is_logo=False, is_background=False):
    try:
        with Image.open(image_path) as img:
            if is_logo:
                img.thumbnail((100, 100), Image.Resampling.LANCZOS)
            elif is_background:
                # Pour l'image de fond, traitement optimisé par segments
                original_width, original_height = img.size
                target_width, target_height = 2560, 1440
                
                # Si l'image est déjà petite, pas besoin de traitement par segments
                if original_width <= target_width and original_height <= target_height:
                    img.save(image_path, optimize=False, quality=98, format='JPEG')
                    return
                
                # Redimensionner avec préservation du ratio et haute qualité
                img.thumbnail((target_width, target_height), Image.Resampling.LANCZOS)
                
                # Convertir en RGB si nécessaire pour JPEG
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')
                
                # Sauvegarder avec la meilleure qualité possible
                img.save(image_path, format='JPEG', quality=98, optimize=False, progressive=True)
                return
            else:
                img.thumbnail(max_size, Image.Resampling.LANCZOS)
            img.save(image_path, optimize=True, quality=85)
    except Exception as e:
        print(f"Erreur lors du redimensionnement: {e}")

@app.route('/')
def index():
    config = load_config()
    products = load_products()

    return render_template('index.html', config=config, products=products)

@app.route('/product/<int:product_id>')
def product_detail(product_id):
    config = load_config()
    products = load_products()

    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        flash('Produit non trouvé')
        return redirect(url_for('index'))

    return render_template('product_detail.html', config=config, product=product)

@app.route('/page/<page_name>')
def dynamic_page(page_name):
    config = load_config()
    page_content = config.get('pages', {}).get(page_name)

    if not page_content:
        flash('Page non trouvée')
        return redirect(url_for('index'))

    return render_template('dynamic_page.html', config=config, page_content=page_content, page_name=page_name)

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    config = load_config()

    if request.method == 'POST':
        password = request.form['password']

        if password == config.get('admin_password', 'admin123'):
            session['admin_logged_in'] = True
            return redirect(url_for('admin_dashboard'))
        else:
            flash('Mot de passe incorrect')

    return render_template('admin_login.html', config=config)

@app.route('/admin')
def admin_dashboard():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    config = load_config()
    products = load_products()

    return render_template('admin_dashboard.html', config=config, products=products)

@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_logged_in', None)
    return redirect(url_for('index'))

@app.route('/admin/update_config', methods=['POST'])
def update_config():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    config = load_config()

    # Mettre à jour les champs de configuration
    config['site_title'] = request.form.get('site_title', config['site_title'])
    config['site_subtitle'] = request.form.get('site_subtitle', config['site_subtitle'])
    config['welcome_message'] = request.form.get('welcome_message', config['welcome_message'])
    config['admin_password'] = request.form.get('admin_password', config['admin_password'])
    config['primary_color'] = request.form.get('primary_color', config['primary_color'])
    config['secondary_color'] = request.form.get('secondary_color', config['secondary_color'])
    config['accent_color'] = request.form.get('accent_color', config['accent_color'])
    config['text_color'] = request.form.get('text_color', config['text_color'])
    config['background_color'] = request.form.get('background_color', config['background_color'])
    config['font_family'] = request.form.get('font_family', config['font_family'])
    config['global_order_link'] = request.form.get('global_order_link', config['global_order_link'])
    config['title_effect'] = request.form.get('title_effect', config.get('title_effect', 'none'))
    config['text_animation'] = request.form.get('text_animation', config.get('text_animation', 'none'))
    config['card_animation'] = request.form.get('card_animation', config.get('card_animation', 'none'))
    config['back_home_text'] = request.form.get('back_home_text', config.get('back_home_text', '🏠 Accueil'))
    config['order_button_text'] = request.form.get('order_button_text', config.get('order_button_text', '🛒 Commander'))
    config['no_products_text'] = request.form.get('no_products_text', config.get('no_products_text', 'Aucun produit disponible pour cette sélection.'))
    config['prices_title_text'] = request.form.get('prices_title_text', config.get('prices_title_text', 'Tarifs disponibles'))

    # Gérer l'upload du logo
    if 'logo' in request.files:
        file = request.files['logo']
        if file and file.filename and allowed_file(file.filename):
            filename = secure_filename(f"logo_{uuid.uuid4()}_{file.filename}")
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            resize_image(filepath, (100, 100), is_logo=True)
            config['logo_path'] = f"uploads/{filename}"

    # Gérer l'upload de l'image de fond
    if 'background_image' in request.files:
        file = request.files['background_image']
        if file and file.filename and allowed_file(file.filename):
            filename = secure_filename(f"bg_{uuid.uuid4()}_{file.filename}")
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            resize_image(filepath, (2560, 1440), is_background=True)
            config['background_image'] = f"uploads/{filename}"

    # Mettre à jour les catégories et farms
    categories = request.form.get('categories', '').split(',')
    config['categories'] = [cat.strip() for cat in categories if cat.strip()]

    farms = request.form.get('farms', '').split(',')
    config['farms'] = [farm.strip() for farm in farms if farm.strip()]

    # Réseaux sociaux
    config['social_links']['instagram'] = request.form.get('instagram', '')
    config['social_links']['facebook'] = request.form.get('facebook', '')
    config['social_links']['twitter'] = request.form.get('twitter', '')
    config['social_links']['tiktok'] = request.form.get('tiktok', '')

    save_config(config)
    flash('Configuration mise à jour avec succès')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/add_social_link', methods=['POST'])
def add_social_link():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    config = load_config()

    name = request.form.get('social_name')
    url = request.form.get('social_url')

    if name and url:
        if 'custom_social_links' not in config:
            config['custom_social_links'] = []

        config['custom_social_links'].append({
            'name': name,
            'url': url
        })

        save_config(config)
        flash('Réseau social ajouté avec succès')

    return redirect(url_for('admin_dashboard'))

@app.route('/admin/remove_social_link/<int:index>')
def remove_social_link(index):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    config = load_config()

    if 'custom_social_links' in config and 0 <= index < len(config['custom_social_links']):
        config['custom_social_links'].pop(index)
        save_config(config)
        flash('Réseau social supprimé')

    return redirect(url_for('admin_dashboard'))

@app.route('/admin/edit_social_link/<int:index>', methods=['GET', 'POST'])
def edit_social_link(index):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    config = load_config()

    if 'custom_social_links' not in config or index >= len(config['custom_social_links']):
        flash('Réseau social non trouvé')
        return redirect(url_for('admin_dashboard'))

    if request.method == 'POST':
        name = request.form.get('social_name')
        url = request.form.get('social_url')

        if name and url:
            config['custom_social_links'][index] = {
                'name': name,
                'url': url
            }
            save_config(config)
            flash('Réseau social modifié avec succès')
            return redirect(url_for('admin_dashboard'))

    social = config['custom_social_links'][index]
    return render_template('edit_social_link.html', config=config, social=social, index=index)

@app.route('/admin/add_product', methods=['POST'])
def add_product():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    products = load_products()

    # Générer un nouvel ID
    new_id = max([p['id'] for p in products], default=0) + 1

    # Gérer l'upload d'image
    image_path = ""
    if 'image' in request.files:
        file = request.files['image']
        if file and file.filename and allowed_file(file.filename):
            filename = secure_filename(f"product_{new_id}_{file.filename}")
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            resize_image(filepath, (800, 600))
            image_path = f"uploads/{filename}"

    # Gérer l'upload de vidéo
    video_path = ""
    if 'video' in request.files:
        file = request.files['video']
        if file and file.filename and allowed_file(file.filename):
            filename = secure_filename(f"video_{new_id}_{file.filename}")
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            video_path = f"uploads/{filename}"

    # Traiter les prix multiples
    prices = []
    quantities = request.form.getlist('quantity[]')
    units = request.form.getlist('unit[]')
    price_values = request.form.getlist('price[]')

    for i in range(len(quantities)):
        if quantities[i] and units[i] and price_values[i]:
            prices.append({
                'quantity': quantities[i],
                'unit': units[i],
                'price': float(price_values[i])
            })

    new_product = {
        'id': new_id,
        'name': request.form.get('name', ''),
        'category': request.form.get('category', ''),
        'farm': request.form.get('farm', ''),
        'description': request.form.get('description', ''),
        'image': image_path,
        'video': video_path,
        'prices': prices,
        'order_link': request.form.get('order_link', ''),
        'social_links': {
            'instagram': request.form.get('product_instagram', ''),
            'facebook': request.form.get('product_facebook', ''),
            'twitter': request.form.get('product_twitter', ''),
            'tiktok': request.form.get('product_tiktok', '')
        }
    }

    products.append(new_product)
    save_products(products)
    flash('Produit ajouté avec succès')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/edit_product/<int:product_id>')
def edit_product(product_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    config = load_config()
    products = load_products()

    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        flash('Produit non trouvé')
        return redirect(url_for('admin_dashboard'))

    return render_template('edit_product_page.html', config=config, product=product)

@app.route('/admin/update_product/<int:product_id>', methods=['POST'])
def update_product(product_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    products = load_products()
    product = next((p for p in products if p['id'] == product_id), None)

    if not product:
        flash('Produit non trouvé')
        return redirect(url_for('admin_dashboard'))

    # Mettre à jour les informations du produit
    product['name'] = request.form.get('name', product['name'])
    product['category'] = request.form.get('category', product['category'])
    product['farm'] = request.form.get('farm', product['farm'])
    product['description'] = request.form.get('description', product['description'])
    product['order_link'] = request.form.get('order_link', product.get('order_link', ''))

    # Gérer l'upload d'image
    if 'image' in request.files:
        file = request.files['image']
        if file and file.filename and allowed_file(file.filename):
            filename = secure_filename(f"product_{product_id}_{file.filename}")
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            resize_image(filepath, (800, 600))
            product['image'] = f"uploads/{filename}"

    # Gérer l'upload de vidéo
    if 'video' in request.files:
        file = request.files['video']
        if file and file.filename and allowed_file(file.filename):
            filename = secure_filename(f"video_{product_id}_{file.filename}")
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            product['video'] = f"uploads/{filename}"

    # Traiter les prix multiples
    prices = []
    quantities = request.form.getlist('quantity[]')
    units = request.form.getlist('unit[]')
    price_values = request.form.getlist('price[]')

    for i in range(len(quantities)):
        if quantities[i] and units[i] and price_values[i]:
            prices.append({
                'quantity': quantities[i],
                'unit': units[i],
                'price': float(price_values[i])
            })

    product['prices'] = prices

    # Réseaux sociaux du produit
    if 'social_links' not in product:
        product['social_links'] = {}

    product['social_links']['instagram'] = request.form.get('product_instagram', '')
    product['social_links']['facebook'] = request.form.get('product_facebook', '')
    product['social_links']['twitter'] = request.form.get('product_twitter', '')
    product['social_links']['tiktok'] = request.form.get('product_tiktok', '')

    save_products(products)
    flash('Produit mis à jour avec succès')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/delete_product/<int:product_id>')
def delete_product(product_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    products = load_products()
    products = [p for p in products if p['id'] != product_id]
    save_products(products)
    flash('Produit supprimé')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/add_page', methods=['POST'])
def add_page():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    config = load_config()

    page_name = request.form.get('page_name')
    page_title = request.form.get('page_title')
    page_content = request.form.get('page_content')

    if page_name and page_title and page_content:
        if 'pages' not in config:
            config['pages'] = {}

        # Nettoyer le nom de la page (remplacer espaces par tirets, etc.)
        page_name = page_name.lower().replace(' ', '-').replace('_', '-')

        # Gérer les réseaux sociaux de la page
        social_names = request.form.getlist('page_social_name[]')
        social_urls = request.form.getlist('page_social_url[]')

        page_social_links = []
        for i in range(len(social_names)):
            if social_names[i] and social_urls[i]:
                page_social_links.append({
                    'name': social_names[i],
                    'url': social_urls[i]
                })

        config['pages'][page_name] = {
            'title': page_title,
            'content': page_content,
            'social_links': page_social_links
        }

        save_config(config)
        flash(f'Page "{page_title}" ajoutée avec succès au menu de navigation')

    return redirect(url_for('admin_dashboard'))

@app.route('/admin/edit_page/<page_name>')
def edit_page(page_name):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    config = load_config()
    page_content = config.get('pages', {}).get(page_name)

    if not page_content:
        flash('Page non trouvée')
        return redirect(url_for('admin_dashboard'))

    return render_template('edit_page.html', config=config, page_name=page_name, page_content=page_content)

@app.route('/admin/update_page/<page_name>', methods=['POST'])
def update_page(page_name):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    config = load_config()

    if 'pages' not in config or page_name not in config['pages']:
        flash('Page non trouvée')
        return redirect(url_for('admin_dashboard'))

    page_title = request.form.get('page_title')
    page_content = request.form.get('page_content')

    # Gérer les réseaux sociaux de la page
    social_names = request.form.getlist('page_social_name[]')
    social_urls = request.form.getlist('page_social_url[]')

    page_social_links = []
    for i in range(len(social_names)):
        if social_names[i] and social_urls[i]:
            page_social_links.append({
                'name': social_names[i],
                'url': social_urls[i]
            })

    config['pages'][page_name] = {
        'title': page_title,
        'content': page_content,
        'social_links': page_social_links
    }

    save_config(config)
    flash(f'Page "{page_title}" modifiée avec succès')
    return redirect(url_for('admin_dashboard'))

@app.route('/admin/delete_page/<page_name>')
def delete_page(page_name):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))

    config = load_config()

    if 'pages' in config and page_name in config['pages']:
        del config['pages'][page_name]
        save_config(config)
        flash('Page supprimée avec succès')

    return redirect(url_for('admin_dashboard'))

# Pour le développement local
if __name__ == '__main__':
    # Initialiser les fichiers de configuration s'ils n'existent pas
    if not os.path.exists('config.json'):
        save_config(get_default_config())

    if not os.path.exists('products.json'):
        save_products([])

    app.run(host='0.0.0.0', port=5000, debug=True)