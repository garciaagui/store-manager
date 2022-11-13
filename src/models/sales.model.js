const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT
      sp.sale_id,
      s.date,
      sp.product_id,
      sp.quantity
    FROM StoreManager.sales_products as sp
    INNER JOIN StoreManager.sales as s
    ON sp.sale_id = s.id
    ORDER BY sp.sale_id ASC, sp.product_id ASC;`,
  );
  return camelize(result);
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
  `SELECT
    s.date,
    sp.product_id,
    sp.quantity
  FROM StoreManager.sales_products as sp
  INNER JOIN StoreManager.sales as s
  ON sp.sale_id = s.id
  WHERE sp.sale_id = ?
  ORDER BY sp.sale_id ASC, sp.product_id ASC;`,
  [saleId],
  );
  return camelize(sale);
};

const registerSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (now())',
  );

  return camelize(insertId);
};

module.exports = {
  findAll,
  findById,
  registerSale,
};