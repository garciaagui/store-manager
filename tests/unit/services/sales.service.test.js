const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesProductsModel = require('../../../src/models/sales_products.model');
const salesService = require('../../../src/services/sales.service')
const mocks = require('./mocks/sales.service.mock');

describe('Testes de unidade do service de vendas', function () {
  afterEach(sinon.restore);

  describe('Listagem de todas as vendas', function () {
    it('Retorna todas as vendas', async function () {
      sinon.stub(salesModel, 'findAll').resolves(mocks.allSales);

      const result = await salesService.findAll();

      expect(result.message).to.deep.equal(mocks.allSales);
    });
  });

  describe('Listagem de venda por ID', function () {
    it('Retorna a venda caso o ID esteja correto', async function () {
      sinon.stub(salesModel, 'findById').resolves(mocks.saleById);

      const result = await salesService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mocks.saleById);
    });

    it('Retorna um erro caso não haja nenhuma venda vinculada ao ID passado', async function () {
      sinon.stub(salesModel, 'findById').resolves(undefined);

      const result = await salesService.findById(999);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });

    it('Retorna um erro caso o ID seja inválido', async function () {
      sinon.stub(salesModel, 'findById').resolves(undefined);

      const result = await salesService.findById('x');

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
  });

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

  describe('Exclusão de vendas com informações válidas', function () {
    it('Retorna nada caso o id seja correto', async function () {
      const saleId = 1;

      sinon.stub(salesModel, 'deleteSale').resolves([{ affectedRows: 1 }]);

      const result = await salesService.deleteSale(saleId);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal('');
    });
  });

  describe('Tentativa de exclusão de vendas com informações inválidas', function () {
    it('Retorna um erro caso não haja nenhuma venda vinculada ao ID passado', async function () {
      const invalidsaleId = 999;
      sinon.stub(salesModel, 'deleteSale').resolves(undefined);

      const result = await salesService.deleteSale(invalidsaleId);

      expect(result.type).to.equal('SALE_NOT_FOUND');
      expect(result.message).to.equal('Sale not found');
    });

    it('Retorna um erro caso o ID seja inválido', async function () {
      const invalidsaleId = 'x';
      sinon.stub(salesModel, 'deleteSale').resolves(undefined);

      const result = await salesService.deleteSale(invalidsaleId);

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"saleId" must be a number');
    });
  });

});
