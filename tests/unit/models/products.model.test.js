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

    it('Retorna produtos a partir do nome', async function () {
      sinon.stub(connection, 'execute').resolves([mocks.allProducts[3]]);

      const result = await productModel.findByName('Capitão');

      expect(result).to.be.deep.equal(mocks.allProducts[3]);
    })
  });

  describe('Cadastro de produtos', function () {
    it('Retorna o ID produto cadastrado', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

      const result = await productModel.registerProduct(mocks.newProduct.name);

      expect(result).to.be.deep.equal(mocks.newProduct.id);
    });
  });

  describe('Atualização de produtos', function () {
    it('Retorna o número de linhas afetadas pela atualização', async function () {
      const newValue = 'Martelo do Batman';
      const productId = 1;
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await productModel.updateProduct(newValue, productId);

      expect(result).to.be.deep.equal(1);
    });
  });

  describe('Exclusão de produtos', function () {
    it('Retorna o número de linhas afetadas pela exclusão', async function () {
      const productId = 3;
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await productModel.deleteProduct(productId);

      expect(result).to.be.deep.equal(1);
    });
  });
});
