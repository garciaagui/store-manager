const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const validateProductsFields = require('../../../src/middlewares/validateProductsFields');

describe('Testes de unidade do middleware validateProductsFields', function () {
  it('Tentando enviar a requisição sem preencher o nome', async function () {
    const res = {};
    const req = { body: {} };
    const next = sinon.stub().returns();
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateProductsFields(req, res);

    expect(next).to.have.not.been.called;
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
});