const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const productModel = require('../../../src/models/products.model');
const mocks = require('./mocks/products.model.mock');

describe('Testes de unidade do model de produtos', function () {
  afterEach(sinon.restore);

  describe('Listagem de produtos', function () {
    it('Retorna todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([mocks.allProducts]);

      const result = await productModel.findAll();

      expect(result).to.be.a('array');
      expect(result).to.be.deep.equal(mocks.allProducts);
    });

    it('Retorna o produto a partir de seu id', async function () {
      sinon.stub(connection, 'execute').resolves([[mocks.allProducts[0]]]);

      const result = await productModel.findById(1);

      expect(result).to.be.deep.equal(mocks.allProducts[0]);
    });
  });

  describe('Cadastro de produtos', function () {
    it('Retorna o ID produto cadastrado', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const result = await productModel.registerProduct(mocks.newProduct.name);

      expect(result).to.be.deep.equal(mocks.newProduct.id);
    });
  })
});
