const express = require('express');
require('express-async-errors');
const productController = require('../controllers/products.controller');
const validateProductsFields = require('../middlewares/validateProductsFields');

const router = express.Router();

router.get('/', productController.findAll);

router.post('/', validateProductsFields, productController.registerProduct);

router.get('/:id', productController.findById);

module.exports = router;
