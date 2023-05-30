import mongoose from "mongoose"

const Produto = {
    type: 'object',
    example: {
        nome: "Óleo",
        marca: "Shell",
        descricao: "Óleo Shell",
        fornecedor_combinado: {
            nome_fornecedor: "Posto Shell - Pirapitinga",
            id_fornecedor: new mongoose.Types.ObjectId,
            valor_combinado: 20000
        },
        valor: 30000
    },
    properties: {
        nome: { type: 'string' },
        marca: { type: 'string' },
        descricao: { type: 'string' },
        fornecedor_combinado: {
            type: 'object',
            properties: {
                nome_fornecedor: { type: 'string' },
                id_fornecedor: { type: 'string' },
                valor_combinado: { type: 'number' }
            }
        }
    }
}

export default Produto