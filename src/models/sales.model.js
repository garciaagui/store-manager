const camelize = require('camelize');
const connection = require('./connection');

const registerSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (now())',
  );

  return camelize(insertId);
};

module.exports = {
  registerSale,
};