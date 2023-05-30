import mongoose from "mongoose";
import placaAleatoria from "../../utils/placaAleatoria.js";

const Abastecimento = {
  type: "object",
  example: {
    data_abastecimento: new Date(),
    Oid_veiculo: new mongoose.Types.ObjectId(),

    litragem: 200,
    consumo_medio: 200,
    nota_fiscal: ".jpeg",
    localizacao: {
      latitude: 20.0,
      longitude: 10.0,
    },
    observacao: "Observação",
    ativo: true,
    km_atual: 1000,
    Oid_fornecedor: new mongoose.Types.ObjectId(),
    Oid_motorista: new mongoose.Types.ObjectId(),
  },
  properties: {
    data_abastecimento: {
      type: "Date",
      description: "Data em que o abastecimento foi realizado",
    },
    Oid_veiculo: {
      type: "ObjectId",
      description: "Id do veículo que realizou o abastecimento",
    },
    Oid_motorista: {
      type: "ObjectId",
      description: "Id do motorista que realizou o abastecimento",
    },
    litragem: {
      type: "number",
      description: "Litragem abastecida do veículo",
    },
    Oid_fornecedor: {
      type: "ObjectId",
      description: "Id do fornecedor que realizou o abastecimento",
    },
    consumo_medio: {
      type: "number",
      description: "Consumo médio do veículo no momento do abastecimento",
    },
    nota_fiscal: {
      type: "string",
      description: "Caminho da foto da nota fiscal do abastecimento",
    },
    localizacao: {
      type: "object",
      properties: {
        latitude: { type: "number" },
        longitude: { type: "number" },
      },
      description: "Coordenadas de onde o veículo foi abastecido",
    },
    observacao: {
      type: "string",
      description: "Observações adicionais do abastecimento",
    },
    ativo: {
      type: "boolean",
      description: "Situação do abastecimento",
    },
    km_atual: { 
        type: "number",
        description: "Quilometragem do veículo no momento do abastecimento"
    },
  },
};

export default Abastecimento;
