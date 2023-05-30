import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
import Fornecedor from "./Fornecedor.js";

const produtoSchema = new mongoose.Schema(
    {
        nome: { type: String, trim: true ,
            required: [true, 'O nome do produto é obrigatório.'],
            minlength: [3, 'O nome do produto deve ter no mínimo 3 caracteres.'],
            maxlength: [80, 'O nome do produto deve ter no máximo 80 caracteres.']
        },
        marca: { type: String, maxlength: 200, trim: true,
            required: [true, 'O marca do produto é obrigatório.'],
            minlength: [3, 'O marca do produto deve ter no mínimo 3 caracteres.'],
            maxlength: [80, 'O marca do produto deve ter no máximo 80 caracteres.']
        },

        descricao: { type: String, maxlength: 200, trim: true },
        fornecedor_combinado: {
            Oid_fornecedor: { type: mongoose.Types.ObjectId, ref: Fornecedor, trim: true },
            valor_combinado: { type: Number,  trim: true },
        },
        valor: { type: Number, length: 11, trim: true },
        ativo: { type: Boolean, default: true }
    },
    { versionKey: false }
);

produtoSchema.plugin(mongoosePaginate);

const Produto = mongoose.model('produtos', produtoSchema);

export default Produto;
