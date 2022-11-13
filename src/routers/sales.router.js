const express = require('express');
require('express-async-errors');
const salesController = require('../controllers/sales.controller');
// const salesModel = require('../models/sales.model');
// const salesService = require('../services/sales.service');
// const errorMap = require('../utils/errorMap');
const validateSalesFields = require('../middlewares/validateSalesFields');

const router = express.Router();

router.get('/', salesController.findAll);

router.post('/', validateSalesFields, salesController.registerSale);

router.get('/:id', salesController.findById);

router.delete('/:id', salesController.deleteSale);

module.exports = router;
