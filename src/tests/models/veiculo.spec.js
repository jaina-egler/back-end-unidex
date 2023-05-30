import { describe, expect, it, jest } from '@jest/globals';
import Veiculo from "../../models/Veiculo.js"
import VeiculosController from "../../controllers/VeiculosController.js"
import placaAleatoria from '../../utils/placaAleatoria.js';

describe("Deve retornar os testes de veículos", () => {

    afterEach(() => jest.clearAllMocks());
    const vencimentoIPVA = new Date();

    const objetoVeiculo = {
        placa: placaAleatoria(),
        marca: "Marca de Caminhão",
        modelo: "Modelo",
        ano: 2020,
        renavan: "12345678911",
        vencimento_ipva: vencimentoIPVA,
        km_atual: 10000,
        ativo: true
    };

    it('Deve instanciar um novo veículo', () => {
        const veiculo = new Veiculo(objetoVeiculo);
        expect(veiculo).toEqual(expect.objectContaining(objetoVeiculo));
        expect(veiculo).toHaveProperty('marca', "Marca de Caminhão")
    });

    it('Deve fazer uma chamada simulada de cadastro ao BD', () => {
        VeiculosController.cadastrarVeiculo = jest.fn().mockReturnValue(objetoVeiculo)

        const retorno = VeiculosController.cadastrarVeiculo();
        expect(retorno).toEqual(expect.objectContaining(objetoVeiculo));
    });
})