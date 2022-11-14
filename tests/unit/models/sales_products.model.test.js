const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesProductsModel = require('../../../src/models/sales_products.model');
const itemsSold = require('./mocks/sales_products.model.mock');

describe('Testes de unidade do model de relacionamento de vendas e produtos', function () {
  afterEach(sinon.restore);

  describe('Cadastro de relacionamento de vendas e produtos', function () {
    it('Retorna os produtos relacionados à venda', async function () {
      const saleId = 3;
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);

      const result = await salesProductsModel.registerRelationshipSalesProducts(saleId, itemsSold[0]);

      expect(result).to.be.deep.equal(1);
    });
  });

  describe('Exclusão das linhas para posterior atualização das informações de um relacionamento entre vendas e produtos', function () {
    it('Retorna o número de linhas afetadas pela atualização', async function () {
      const saleId = 3;
      sinon.stub(connection, 'execute').resolves([{ affectedRows: itemsSold.length }]);

      const result = await salesProductsModel.deleteRelationshipSalesProducts(saleId);

      expect(result).to.be.deep.equal(itemsSold.length);
    });
  });
});
