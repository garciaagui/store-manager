const salesService = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const registerSale = async (req, res) => {
  const itemsSold = [...req.body];

  const { type, message } = await salesService.registerSale(itemsSold);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  registerSale,
};
