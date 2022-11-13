const productService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { message } = await productService.findAll();

  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const registerProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productService.registerProduct(name);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productService.updateProduct(name, id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productService.deleteProduct(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).json();
};

module.exports = {
  findAll,
  findById,
  registerProduct,
  updateProduct,
  deleteProduct,
};
