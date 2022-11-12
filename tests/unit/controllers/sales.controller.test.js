const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const salesService = require('../../../src/services/sales.service')
const salesController = require('../../../src/controllers/sales.controller');
const mocks = require('./mocks/sales.controller.mock');

describe('Testes de unidade do controller de vendas', function () {
  afterEach(sinon.restore);

  describe('Cadastro de vendas com informações válidas', function () {
    it('Retorna o produto cadastrado', async function () {
      const res = {};
      const req = mocks.validReq;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'registerSale')
        .resolves({ type: null, message: mocks.validRes });

      await salesController.registerSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mocks.validRes);
    })
  });

  describe('Tentativa de cadastro de vendas com informações inválidas', function () {

    it('Retorna um erro caso alguma quantidade seja inválida', async function () {
      const errorMessage = '"quantity" must be greater than or equal to 1';
      const res = {};
      const req = mocks.reqWithInvalidQuantity;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'registerSale')
        .resolves({ type: 'INVALID_VALUE', message: errorMessage });

      await salesController.registerSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: errorMessage });
    });

    it('Retorna um erro caso alguma quantidade seja inválida', async function () {
      const errorMessage = 'Product not found';
      const res = {};
      const req = mocks.reqWithInvalidProductId;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'registerSale')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: errorMessage });

      await salesController.registerSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: errorMessage });
    });
  });

});