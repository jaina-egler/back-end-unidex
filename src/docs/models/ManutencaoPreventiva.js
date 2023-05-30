import mongoose from "mongoose"

const ManutencaoPreventiva = {
    type: "object",
    example: {
        data_criacao: new Date(),
        km_necessario: 200,
        id_veiculo: new mongoose.Types.ObjectId(),
        placa_veiculo: "AAABBB23",
        id_usuario: new mongoose.Types.ObjectId(),
        nome_usuario: "Pedro Marcos",
        valor_total: 2000,
        produtos: [{
            nome_produto: "Óleo",
            preco_unitario: 10,
            quantidade: 20
        }],
        imagens: [
            ".jpg"
        ],
        observacao: "",
        ativo: true
    },
    properties: {
        data_criacao: { type: "Date" },
        km_necessario: { type: "number" },
        id_veiculo: { type: "string" },
        placa_veiculo: { type: "string" },
        id_usuario: { type: "string" },
        nome_usuario: { type: "string" },
        valor_total: { type: "number" },
        produtos: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id_produto: { type: "ObjectId" },
                    nome_produto: { type: "string" },
                    preco_unitario: { type: "number" },
                    quantidade: { type: "number" }
                }
            }
        },
        imagens: {
            type: "array",
            items: { type: "string" }
        },
        observacao: { type: "string" },
        ativo: { type: "boolean" }
    }
}

export default ManutencaoPreventiva