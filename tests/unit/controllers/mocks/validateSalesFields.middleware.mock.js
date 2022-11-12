const reqWithoutAnyQuantity = {
  body: [
    {
      "productId": 1,
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const reqWithoutAnyProductId = {
  body: [
    {
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

module.exports = { reqWithoutAnyQuantity, reqWithoutAnyProductId };