const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/sales.model');
const mocks = require('./mocks/sales.model.mock');

describe('Testes de unidade do model de vendas', function () {
  afterEach(sinon.restore);

  describe('Listagem de vendas', function () {
    it('Retorna todas as vendas', async function () {
      sinon.stub(connection, 'execute').resolves([mocks.allSales]);

      const result = await salesModel.findAll();

      expect(result).to.be.a('array');
      expect(result).to.be.deep.equal(mocks.allSales);
    });

    it('Retorna a venda a partir de seu id', async function () {
      sinon.stub(connection, 'execute').resolves([mocks.saleById]);

      const result = await salesModel.findById(1);

      expect(result).to.be.deep.equal(mocks.saleById);
    });
  });

  describe('Cadastro de vendas', function () {
    it('Retorna o ID da venda cadastrada', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);

      const result = await salesModel.registerSale();

      expect(result).to.be.deep.equal(3);
    });
  });

  describe('Exclusão de vendas', function () {
    it('Retorna o número de linhas afetadas pela exclusão', async function () {
      const saleId = 3;
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

      const result = await salesModel.deleteSale(saleId);

      expect(result).to.be.deep.equal(1);
    });
  });

});
