const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesProductsModel = require('../../../src/models/sales_products.model');
const itemsSold = require('./mocks/sales_products.model.mock');

describe('Testes de unidade do model de relacionamento de vendas e produtos', function () {
  afterEach(sinon.restore);

  describe('Cadastro de relacionamento de vendas e produtos', function () {
    it('Retorna os produtos relacionados à venda', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const saleId = 3;

      const result = await salesProductsModel.registerRelationshipSalesProducts(saleId, itemsSold[0]);

      expect(result).to.be.deep.equal(1);
    });
  })
});
