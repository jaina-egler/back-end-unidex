import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
import Validation from "../utils/validation.js";
import Pessoa from "../models/Pessoa.js";
import Fornecedor from '../models/Fornecedor.js'
import Veiculo from "../models/Veiculo.js";

const abastecimentoSchema = new mongoose.Schema({
    data_abastecimento: {
        type: Date, maxlength: 50, trim: true,
        required: [true, 'A data do abastecimento é obrigatória!']
    },
    Oid_veiculo: {
        type: mongoose.Types.ObjectId, ref: Veiculo, trim: true,
        required: [true, 'O veículo é obrigatório!']
    },
    Oid_motorista: {
        type: mongoose.Types.ObjectId, ref: Pessoa, trim: true,
        required: [true, 'O motorista é obrigatório!'],
    },
    litragem: {
        type: Number,
        required: [true, 'A litragem do abastecimento é obrigatória.'],
        validate: {
            validator: v => {
                const a = v > 1;
                return a;
            },
            message: 'A litragem deve ser maior que zero!'
        }
    },
    Oid_fornecedor: {
        type: mongoose.Types.ObjectId, ref: Fornecedor, trim: true,
        required: [true, 'O fornecedor do abastecimento é obrigatório.'],
    },
    km_atual: {
        type: Number,
        required: [true, 'A kilometragem do abastecimento é obrigatória.'],
        validate: {
            validator: v => {
                const a = v > 1;
                return a;
            },
            message: 'O km do veículo deve ser maior que 0'
        }
    },
    consumo_medio: { type: Number, trim: true },
    nota_fiscal: { type: String, required: false, trim: true },
    localizacao: {
        latitude: { type: Number, required: [true, 'A latitude da localização é obrigatória.'], trim: true },
        longitude: { type: Number, required: [true, 'A longitude da localização é obrigatória.'], trim: true },
    },
    observacao: { type: String, trim: true },
    ativo: { type: Boolean, required: true, default: true }
})

const Abastecimento = new mongoose.model('abastecimentos', abastecimentoSchema)

export default Abastecimento;