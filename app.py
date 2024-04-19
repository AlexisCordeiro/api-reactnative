from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://<user>:<senha>@<endpointdobanco>/<nomedobanco>'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    price = db.Column(db.Float, nullable=False)

@app.route('/api/products', methods=['GET'])
def get_all_products():
    products = Product.query.all()
    result = [{'id': product.id, 'name': product.name,
    'description': product.description,
    'price': product.price} for product in products]
    return jsonify(result)

@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.json
    if 'name' in data and 'description' in data and 'price' in data:
        new_product = Product(name=data['name'], description=data['description'], price=data['price'])
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Product created successfully'}), 201
    else:
        return jsonify({'error': 'Missing required fields'}), 400


@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify({'id': product.id, 'name': product.name,
    'description': product.description,
    'price': product.price})

@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.json
    product.name = data['name']
    product.description = data['description']
    product.price = data['price']
    db.session.commit()
    return jsonify({'message': 'Product updated successfully'})

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
