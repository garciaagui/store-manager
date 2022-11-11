const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/products.model');
const productService = require('../../../src/services/products.service')
const mocks = require('./mocks/products.service.mock');

describe('Testes de unidade do service de produtos', function () {
  afterEach(sinon.restore);

  describe('Listagem de todos os produtos', function () {
    it('Retorna todos os produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(mocks.allProducts);

      const result = await productService.findAll();

      expect(result.message).to.deep.equal(mocks.allProducts);
    });
  });

  describe('Listagem de produto por ID', function () {
    it('Retorna o produto caso o ID esteja correto', async function () {
      sinon.stub(productModel, 'findById').resolves(mocks.productById);

      const result = await productService.findById(1);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mocks.productById);
    });

    it('Retorna um erro caso não haja nenhum produto vinculado ao ID passado', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);

      const result = await productService.findById(999);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found');
    });

    it('Retorna um erro caso o ID seja inválido', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);

      const result = await productService.findById('x');

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"id" must be a number');
    });
  });

  describe('Cadastro de produtos', function () {
    it('Retorna o produto cadastrado', async function () {
      sinon.stub(productModel, 'registerProduct').resolves([{ insertId: 4 }]);
      sinon.stub(productModel, 'findById').resolves(mocks.newProduct);

      const result = await productService.registerProduct(mocks.newProduct.name);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(mocks.newProduct);
    })

    it('Retorna um erro caso o nome seja inválido', async function () {
      sinon.stub(productModel, 'registerProduct').resolves(undefined);

      const result = await productService.registerProduct('xxx');

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    })
  })
});
