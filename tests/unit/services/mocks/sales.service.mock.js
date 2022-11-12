const validItemsSold = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const itemsWithInvalidQuantity = [
  {
    "productId": 1,
    "quantity": 0
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

const itemsWithInvalidProductId = [
  {
    "productId": 99999999,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
];

module.exports = { validItemsSold, itemsWithInvalidQuantity, itemsWithInvalidProductId };