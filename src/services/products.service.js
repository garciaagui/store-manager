const productModel = require('../models/products.model');
const validations = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  const error = validations.validateId(productId);
  if (error.type) return error;

  const product = await productModel.findById(productId);
  if (product) return { type: null, message: product };
  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const registerProduct = async (name) => {
  const error = validations.validateNewProduct(name);
  if (error.type) return error;

  const newProductId = await productModel.registerProduct(name);
  const newProduct = await productModel.findById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (name, productId) => {
  const error = await validations.validateProductUpdating(name, productId);
  if (error.type) return error;

  await productModel.updateProduct(name, productId);

  const updatedProduct = await productModel.findById(productId);

  return { type: null, message: updatedProduct };
};

const deleteProduct = async (productId) => {
  const error = await validations.validateProductDeletion(productId);
  if (error.type) return error;

  await productModel.deleteProduct(productId);

  return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  registerProduct,
  updateProduct,
  deleteProduct,
};