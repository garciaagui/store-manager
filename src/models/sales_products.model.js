const connection = require('./connection');

const registerRelationshipSalesProducts = async (saleId, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`,
    [saleId, productId, quantity],
  );

  return insertId;
};

const deleteRelationshipSalesProducts = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    `DELETE FROM StoreManager.sales_products
    WHERE sale_id = ?`,
    [saleId],
  );

  return affectedRows;
};

module.exports = { registerRelationshipSalesProducts, deleteRelationshipSalesProducts };