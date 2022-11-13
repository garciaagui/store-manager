const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products
    ORDER BY id ASC`,
  );
  return camelize(result);
};

const findById = async (productId) => {
  const [[driver]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return camelize(driver);
};

const registerProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );
  return camelize(insertId);
};

const updateProduct = async (newValue, productId) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?;`,
    [newValue, productId],
  );

  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  registerProduct,
  updateProduct,
};
