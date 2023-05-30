import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
import Validation from "../utils/validation.js";


const veiculoSchema = new mongoose.Schema(
    {
        placa: {
            type: String, length: 7, trim: true,
            required: [true, 'A placa do veículo é obrigatória.'],
            unique: [true, 'A placa cadastrada já existe'],
            minlength: [7, 'A placa do veículo deve ter 7 caracteres.'],
            maxlength: [7, 'A placa do veículo deve ter 7 caracteres.'],
            validate: {
                validator: Validation.validatePlaca,
                message: "Placa inválida!"
            }
        },
        marca: {
            type: String, maxlength: 80, trim: true,
            required: [true, 'A marca do veículo é obrigatória.'],
            minlength: [3, 'A marca do veículo deve ter no mínimo 3 caracteres.'],
            maxlength: [80, 'A marca do veículo deve ter no máximo 80 caracteres.']
        },
        modelo: {
            type: String, maxlength: 80, trim: true,
            required: [true, 'O modelo do veículo é obrigatória.'],
            minlength: [3, 'O modelo do veículo deve ter no mínimo 3 caracteres.'],
            maxlength: [80, 'O modelo do veículo deve ter no máximo 80 caracteres.']
        },
        ano: { type: Number, length: 4 },
        renavan: { type: String, length: 11 },
        vencimento_ipva: { type: Date, trim: true },
        km_atual: {
            type: Number, required: true, trim: true, default: 0,
            validate: {
                validator: v => {
                    return v >= 0;
                },
                message: 'O km atual não pode ser menor que 0'
            }
        },
        ativo: { type: Boolean, required: true, default: true }
    },
    { versionKey: false }
);

veiculoSchema.plugin(mongoosePaginate);

const Veiculo = mongoose.model('veiculos', veiculoSchema);

export default Veiculo;