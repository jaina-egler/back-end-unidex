import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import Veiculo from "../models/Veiculo.js";
import Fornecedor from "../models/Fornecedor.js";
import Pessoa from "../models/Pessoa.js";

const manutencaoCorretivaSchema = new mongoose.Schema({
  data_criacao: { type: Date, required: true, default: Date.now },
  data_manutencao: {
    type: Date,
    required: [true, "A data da manutenção é obrigatória."],
  },
  Oid_veiculo: {
    type: mongoose.Types.ObjectId,
    ref: Veiculo,
    required: [true, "O veículo é obrigatório"],
    trim: true,
  },
  Oid_motorista: {
    type: mongoose.Types.ObjectId,
    ref: Pessoa,
    required: [true, "O motorista é obrigatório."],
    trim: true,
  },
  valor_total: {
    type: Number,
    required: [true, "O valor total é obrigatório."],
  },
  km_atual: {
    type: Number,
    required: true,
    validate: {
      validator: (v) => {
        return v > 1;
      },
      message: "O km do veículo deve ser maior que 0",
    },
  },

  tipo_manutencao: {
    type: String,
    enum: [
      "Funilaria e Pintura",
      "Manutenção Mecânica",
      "Suspensão",
      "Pneus",
      "Elétrica",
      "Outros",
    ],
    default: "Outros",
  },
  nota_fiscal: { type: String, required: false, trim: true },
  localizacao: {
    type: String,
    required: true,
    trim: true,
    required: [
      true,
      "A localização (Google Maps) da manutenção é obrigatória.",
    ],
  },
  observacao: {
    type: String,
    trim: true,
    required: [true, "A observação é obrigatória."],
  },
  imagens: [
    {
      type: [
        {
          type: String,
          required: false,
        },
      ],
      validate: {
        validator: function (v) {
          return v.length > 3;
        },
        message: "O número máximo de imagens permitido é 3.",
      },
    },
  ],

  ativo: { type: Boolean, required: true, default: true },
});

manutencaoCorretivaSchema.plugin(mongoosePaginate);

const ManutencaoCorretiva = mongoose.model(
  "manutencoes_corretiva",
  manutencaoCorretivaSchema
);

export default ManutencaoCorretiva;
