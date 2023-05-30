import { describe, expect, it, jest, } from '@jest/globals';
import ManutencaoCorretiva from "../../models/ManutencaoCorretiva.js";
import ManutencaoCorretivaController from '../../controllers/ManutencoesCorretivasController.js';
import mongoose from 'mongoose';

describe('Testes de unidade para ManutencoesCorretivas', () => {
  afterEach(() => jest.clearAllMocks());

  const objetoManutencoesCorretivas = {
    data_criacao: new Date(),
    data_manutencao: new Date(),
    Oid_veiculo: new mongoose.Types.ObjectId(),
    Oid_motorista: new mongoose.Types.ObjectId(),
    valor_total: 1500.00,
    km_atual: 100,
    tipo_manutencao: 'Manutenção Mecânica',
    nota_fiscal: '.txt',
    localizacao: 'Oficina do Zé',
    observacao: 'obs',
    ativo: true
  };

  {
  }

  it('Deve instanciar uma nova Manutencao Corretiva', () => {
    const manutencoesCorretivas = new ManutencaoCorretiva(objetoManutencoesCorretivas);
    expect(manutencoesCorretivas).toEqual(expect.objectContaining(objetoManutencoesCorretivas));
    expect(manutencoesCorretivas).toHaveProperty('tipo_manutencao', 'Manutenção Mecânica');
  });

  it('Deve fazer uma chamada simulada de cadastro ao BD', () => {
    ManutencaoCorretivaController.cadastrarManutencaoCorretiva = jest.fn().mockReturnValue(objetoManutencoesCorretivas)

    const retorno = ManutencaoCorretivaController.cadastrarManutencaoCorretiva();
    expect(retorno).toEqual(expect.objectContaining(objetoManutencoesCorretivas));
  });
});
