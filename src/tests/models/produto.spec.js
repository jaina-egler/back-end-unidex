import { describe, expect, it, jest, } from '@jest/globals';
import Produto from '../../models/Produto.js';
import produtoController from '../../controllers/ProdutosController.js'
import mongoose from 'mongoose';

describe('Deve retornar teste de unidade de produto', () => {
    afterEach(() => jest.clearAllMocks());
    const objetoProduto = {
        nome: "Óleo",
        marca: "Shell",
        descricao: "Óleo Shell",
        fornecedor_combinado: {
            Oid_fornecedor: new mongoose.Types.ObjectId(),
            valor_combinado: 20000
        },
        valor: 30000,
        ativo: true
    };

    it('Deve instanciar um novo produto', () => {
        const produto = new Produto(objetoProduto);
        expect(produto).toEqual(expect.objectContaining(objetoProduto));
    });

    it('Deve fazer uma chamada simulada de cadastro ao BD', () => {
        produtoController.cadastrarProduto = jest.fn().mockReturnValue(objetoProduto)

        const retorno = produtoController.cadastrarProduto();
        expect(retorno).toEqual(expect.objectContaining(objetoProduto));
    });
});
