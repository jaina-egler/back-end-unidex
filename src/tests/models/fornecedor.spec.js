import { describe, expect, it, jest, } from '@jest/globals';
import Fornecedor from '../../models/Fornecedor.js';
import fornecedorController from '../../controllers/FornecedoresController.js'

describe('Deve retornar teste de unidade de fornecedor', () => {
    afterEach(() => jest.clearAllMocks());
    const objetoFornecedor = {
        razao_social: "Carlos",
        nome_fantasia: "carlos yeh",
        telefone: "69984456287",
        ativo: true,
        email: "yasmin@gmail.com",
        observacoes: "Observações",

        endereco: {
            logradouro: "Quadra",
            numero: "2587",
            bairro: "Bodanese",
            cidade: "Vilhena",
            estado: "Rondonia",
            pais: "Brasil",
            cep: "76981064",
        }
    };

    it('Deve instanciar um novo fornecedor', () => {
        const fornecedor = new Fornecedor(objetoFornecedor);
        expect(fornecedor).toEqual(expect.objectContaining(objetoFornecedor));
    });

    it('Deve fazer uma chamada simulada de cadastro ao BD', () => {
        fornecedorController.cadastrarfornecedor = jest.fn().mockReturnValue(objetoFornecedor)

        const retorno = fornecedorController.cadastrarfornecedor();
        expect(retorno).toEqual(expect.objectContaining(objetoFornecedor));
    });
});
