const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/products.model');
const productListMock = require('./mocks/products.model.mock');

describe('Testes de unidade do model de produtos', function () {
  afterEach(sinon.restore);

  describe('Listagem de produtos', function () {
    it('Retorna todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([productListMock]);

      const result = await productModel.findAll();

      expect(result).to.be.a('array');
      expect(result).to.be.deep.equal(productListMock);
    });

    it('Retorna o produto a partir de seu id', async function () {
      sinon.stub(connection, 'execute').resolves([[productListMock[0]]]);

      const result = await productModel.findById(1);

      expect(result).to.be.deep.equal(productListMock[0]);
    });
  });
});
