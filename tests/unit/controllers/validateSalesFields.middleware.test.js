const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const validateSalesFields = require('../../../src/middlewares/validateSalesFields');
const mocks = require('./mocks/validateSalesFields.middleware.mock')

describe('Testes de unidade do middleware validateSalesFields', function () {
  afterEach(sinon.restore);

  it('Tentando enviar a requisição sem preencher todas as quantidades', async function () {
    const res = {};
    const req = mocks.reqWithoutAnyQuantity;
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateSalesFields(req, res, next);

    // expect(next).to.have.not.been.called;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Tentando enviar a requisição sem preencher todos os IDs dos produtos', async function () {
    const res = {};
    const req = mocks.reqWithoutAnyProductId;
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateSalesFields(req, res, next);

    // expect(next).to.have.not.been.called;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });
});