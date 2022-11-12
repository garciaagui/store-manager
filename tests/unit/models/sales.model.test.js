const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
// const mocks = require('./mocks/sales.model.mock');

describe('Testes de unidade do model de vendas', function () {
  afterEach(sinon.restore);

  describe('Cadastro de vendas', function () {
    it('Retorna o ID da venda cadastrada', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

      const result = await salesModel.registerSale();

      expect(result).to.be.deep.equal(3);
    });
  })
});
