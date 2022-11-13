const allSales = [
  {
    "saleId": 1,
    "date": "2022-11-12T21:25:43.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-11-12T21:25:43.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2022-11-12T21:25:43.000Z",
    "productId": 3,
    "quantity": 15
  },
];

const saleById = [
  {
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

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

module.exports = {
  allSales,
  saleById,
  validReq,
  validRes,
  reqWithInvalidQuantity,
  reqWithInvalidProductId
};