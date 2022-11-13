const salesService = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  const { message } = await salesService.findAll();

  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const registerSale = async (req, res) => {
  const itemsSold = [...req.body];

  const { type, message } = await salesService.registerSale(itemsSold);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  findAll,
  findById,
  registerSale,
};
