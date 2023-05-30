import mongoose from "mongoose"

const ManutencaoCorretiva = {
    type: "object",
    example: {
        data_criacao: new Date(),
        data_manutencao: new Date(),
        Oid_veiculo: new mongoose.Types.ObjectId("644a79a8a29154f511054e57"),
        Oid_motorista: new mongoose.Types.ObjectId(),
        valor_total: 20000,
        km_atual: 23,
        tipo_manutencao: "Funilaria e Pintura",
        imagens: [
            ".jpg"
        ],
        nota_fiscal: ".jpg",
        localizacao: "nlnkl",
        ativo: true,
        observacao: "Observação"
    },
    properties: {
        data_criacao: { type: "Date" },
        data_manutencao: { type: "Date" },
        Oid_veiculo: { type: "ObjectId" },
        Oid_motorista: { type: "ObjectId" },
        valor_total: { type: "number" },
        km_atual: { type: "number" },
        tipo_manutencao: { type: "string" },
        imagens: {
            type: "array",
            items: {
                type: "string"
                
            }
        },
        nota_fiscal: { type: "string" },
        localizacao: { type: "string" },
        ativo: { type: "boolean" },
        observacao: { type: "string" }
    }
}

export default ManutencaoCorretiva