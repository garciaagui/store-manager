// const camelize = require('camelize');
const connection = require('./connection');

const registerRelationshipSalesProducts = async (saleId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`,
    [saleId, productId, quantity],
  );

  return insertId;
};

module.exports = { registerRelationshipSalesProducts };