import { describe, expect, it, jest } from '@jest/globals';
import ManutencaoPreventiva from '../../models/ManutencaoPreventiva.js';
import ManutencaoPreventivaController from '../../controllers/ManutencoesPreventivasController.js'
import mongoose from 'mongoose';

describe('Testes de unidade do modelo de Manutenção Preventiva', () => {
    afterEach(() => jest.clearAllMocks());
    const produto_id = new mongoose.Types.ObjectId()
    const produtos = [{
        id_produto: produto_id,
        nome_produto: "Óleo",
        preco_unitario: 20,
        quantidade: 10
    }, {
        id_produto: produto_id,
        nome_produto: "Lubrificante",
        preco_unitario: 20,
        quantidade: 10
    }]


    const objetoManutencaoPreventiva = {
        data_criacao: new Date(),
        km_necessario: 5000,
        id_veiculo: new mongoose.Types.ObjectId(),
        placa_veiculo: 'ABC1234',
        id_usuario: new mongoose.Types.ObjectId(),
        nome_usuario: 'Fulano',
        valor_total: 1000,
        produtos: produtos,
        imagens: ["Imagem 1", "Imagem 2"],
        observacao: 'Manutenção preventiva realizada',
        ativo: true
    }

    it('Deve instanciar uma nova Manutenção Preventiva', () => {
        const manutencaoPreventiva = new ManutencaoPreventiva(objetoManutencaoPreventiva);
        manutencaoPreventiva.produtos.map((p, i)=> {
            expect(p).toEqual(expect.objectContaining(produtos[i]))
        })

    });

    it('Deve fazer uma chamada simulada de cadastro ao BD', () => {
        ManutencaoPreventivaController.cadastrarManutencaoPreventiva = jest.fn().mockReturnValue(objetoManutencaoPreventiva)

        const retorno = ManutencaoPreventivaController.cadastrarManutencaoPreventiva();
        expect(retorno).toEqual(expect.objectContaining(objetoManutencaoPreventiva));
    });
});
