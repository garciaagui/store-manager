const validReq = {
  body: [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const validRes = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const reqWithInvalidQuantity = {
  body: [
    {
      "productId": 1,
      "quantity": 0
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

const reqWithInvalidProductId = {
  body: [
    {
      "productId": 99999999,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}

module.exports = { validReq, validRes, reqWithInvalidQuantity, reqWithInvalidProductId };