const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();

const salesRelationshipsSchema = Joi.object({
  productId: idSchema,
  quantity: Joi.number().integer().min(1).required(),
});

const registerProductSchema = Joi.string().min(5).required();

// const registerSaleSchema = Joi.object({
//   saleId: idSchema,
//   itemsSold: Joi.array().items(salesRelationshipsSchema),
// });

const registerSaleSchema = Joi.array().items(salesRelationshipsSchema);

const updateProduct = Joi.object({
  productId: idSchema,
  name: Joi.string().min(5).required(),
});

module.exports = {
  idSchema,
  registerProductSchema,
  registerSaleSchema,
  updateProduct,
};