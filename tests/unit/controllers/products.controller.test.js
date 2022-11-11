const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const productService = require('../../../src/services/products.service')
const productController = require('../../../src/controllers/products.controller');
const mocks = require('./mocks/products.controller.mock');

describe('Testes de unidade do controller de produtos', function () {
  afterEach(sinon.restore);

  describe('Listagem de todos os produtos', function () {
    it('Retorna todos os produtos', async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'findAll')
        .resolves({ type: null, message: mocks.allProducts });

      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocks.allProducts);
    });
  });

  describe('Listagem de produto por ID', function () {
    it('Retorna o produto caso o ID esteja correto', async function () {
      const res = {};
      const req = { params: { id: 1 }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'findById')
        .resolves({ type: null, message: mocks.productById });

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mocks.productById);
    });

    it('Retorna um erro caso não haja nenhum produto vinculado ao ID passado', async function () {
      const res = {};
      const req = { params: { id: 999 }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });

    it('Retorna um erro caso o ID seja inválido', async function () {
      const res = {};
      const req = { params: { id: 'x' }, };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productService, 'findById')
        .resolves({ type: 'INVALID_VALUE', message: '"id" must be a number' });

      await productController.findById(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
    });
  });

});