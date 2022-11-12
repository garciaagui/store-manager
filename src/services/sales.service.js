const validations = require('./validations/validationsInputValues');
const salesModel = require('../models/sales.model');
const salesProductsModel = require('../models/sales_products.model');

const saveSalesRelationships = (newSaleId, productsSold) => {
  if (productsSold && productsSold.length > 0) {
    return productsSold.map(async (e) => {
      await salesProductsModel.registerRelationshipSalesProducts(
        newSaleId,
        e.productId,
        e.quantity,
      );
    });
  }
};

const registerSale = async (itemsSold) => {
  const error = await validations.validateNewSale(itemsSold);
  if (error.type) return error;
  
  const saleId = await salesModel.registerSale();
  
  await Promise.all(saveSalesRelationships(saleId, itemsSold));

  const messageContent = { id: saleId, itemsSold };

  return { type: null, message: messageContent };
};

module.exports = {
  registerSale,
};