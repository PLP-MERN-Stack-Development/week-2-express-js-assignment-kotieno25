const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('../utils/errors');

// In-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Get all products with filtering and pagination
router.get('/', (req, res) => {
  let filteredProducts = [...products];
  const { category, page = 1, limit = 10, search } = req.query;
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  // Search by name
  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  res.json({
    total: filteredProducts.length,
    page: parseInt(page),
    limit: parseInt(limit),
    products: paginatedProducts
  });
});

// Get product statistics
router.get('/stats', (req, res) => {
  const stats = {
    total: products.length,
    categories: {},
    inStock: products.filter(p => p.inStock).length,
    outOfStock: products.filter(p => !p.inStock).length
  };
  
  products.forEach(product => {
    stats.categories[product.category] = (stats.categories[product.category] || 0) + 1;
  });
  
  res.json(stats);
});

// Get a specific product
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return next(new NotFoundError('Product not found'));
  }
  res.json(product);
});

// Create a new product
router.post('/', (req, res) => {
  const newProduct = {
    id: uuidv4(),
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update a product
router.put('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return next(new NotFoundError('Product not found'));
  }
  
  products[index] = {
    ...products[index],
    ...req.body,
    id: req.params.id
  };
  
  res.json(products[index]);
});

// Delete a product
router.delete('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return next(new NotFoundError('Product not found'));
  }
  
  const deletedProduct = products[index];
  products = products.filter(p => p.id !== req.params.id);
  
  res.json(deletedProduct);
});

module.exports = router; 