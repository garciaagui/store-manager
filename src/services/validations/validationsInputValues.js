const schemas = require('./schemas');
const productModel = require('../../models/products.model');

const validateId = (id) => {
  const { error } = schemas.idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = schemas.registerProductSchema.validate(name);
  if (error) {
    return { type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' }; 
  }

  return { type: null, message: '' };
};

const validateNewSale = async (itemsSold) => {
  // const { error } = schemas.registerSaleSchema
  //   .validate({ saleId, itemsSold });
  
  const { error } = schemas.registerSaleSchema.validate(itemsSold);
  if (error && error.message.includes('quantity')) {
    return {
      type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1',
    }; 
  }
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const items = await Promise.all(
    itemsSold.map(async ({ productId }) => productModel.findById(productId)),
  );

  const someItemIsMissing = items.some((item) => item === undefined);
  if (someItemIsMissing) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

const validateProductUpdating = async (name, productId) => {
  const { error } = schemas.updateProduct.validate({ name, productId });
  if (error) return { type: 'INVALID_VALUE', message: error.message };

  const doesTheProductExist = await productModel.findById(productId);
  if (!doesTheProductExist) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateNewProduct,
  validateNewSale,
  validateProductUpdating,
};