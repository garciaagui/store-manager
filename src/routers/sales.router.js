const express = require('express');
require('express-async-errors');
const salesController = require('../controllers/sales.controller');
const validateSalesFields = require('../middlewares/validateSalesFields');

const router = express.Router();

router.post('/', validateSalesFields, salesController.registerSale);

module.exports = router;
