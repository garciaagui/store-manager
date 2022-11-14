const express = require('express');
require('express-async-errors');
const productController = require('../controllers/products.controller');
const validateProductsFields = require('../middlewares/validateProductsFields');

const router = express.Router();

router.get('/', productController.findAll);

router.post('/', validateProductsFields, productController.registerProduct);

router.get('/search', productController.findByName);

router.get('/:id', productController.findById);

router.put('/:id', validateProductsFields, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;
