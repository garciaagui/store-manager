const express = require('express');
require('express-async-errors');
const productController = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productController.findAll);

router.get('/:id', productController.findById);

module.exports = router;
