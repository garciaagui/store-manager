const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesProductsModel = require('../../../src/models/sales_products.model');
const salesService = require('../../../src/services/sales.service')
const mocks = require('./mocks/sales.service.mock');

describe('Testes de unidade do service de vendas', function () {
  afterEach(sinon.restore);

  describe('Cadastro de vendas com informações válidas', function () {
    it('Retorna a venda cadastrada', async function () {
      const saleId = 3
      sinon.stub(salesModel, 'registerSale').resolves(saleId);
      sinon.stub(salesProductsModel, 'registerRelationshipSalesProducts')
        .onCall(0)
        .resolves({ insertId: 1 })
        .onCall(1)
        .resolves({ insertId: 2 })

      const result = await salesService.registerSale(mocks.validItemsSold);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal({ id: saleId, itemsSold: mocks.validItemsSold });
    });
  });

  describe('Tentativa de cadastro de vendas com informações inválidas', function () {
    const saleId = 3;

    beforeEach(function () {
      sinon.stub(salesModel, 'registerSale').resolves(saleId);
      sinon.stub(salesProductsModel, 'registerRelationshipSalesProducts').resolves(undefined)
    });

    it('Retorna um erro caso alguma quantidade seja inválida', async function () {
      const result = await salesService.registerSale(mocks.itemsWithInvalidQuantity);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"quantity" must be greater than or equal to 1');
    });

    it('Retorna um erro caso não haja nenhum produto vinculado a algum ID passado', async function () {
      const result = await salesService.registerSale(mocks.itemsWithInvalidProductId);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });
  });
});
