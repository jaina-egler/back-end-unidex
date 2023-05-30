import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
import Pessoa from "./Pessoa.js"
import Produto from "./Produto.js"
import Veiculo from "./Veiculo.js"

const manutencaoPreventivaSchema = new mongoose.Schema(
    {
        data_criacao: { type: Date, default: Date.now,
            required: [true, 'A data de criação da manutenção preventiva é obrigatória.'],
        },
        Oid_veiculo: { type: mongoose.Types.ObjectId, trim: true, ref: Veiculo,
            required: [true, 'O id do produto é obrigatório.'],
        },
        Oid_usuario: { type: mongoose.Types.ObjectId, trim: true, ref: Pessoa,
            required: [true, 'O id do produto é obrigatório.'],
        },
        produtos: [{
            Oid_produto: { type: mongoose.Types.ObjectId, trim: true, ref: Produto,
                required: [true, 'O id do produto é obrigatório.'],
            },
            km_necessario: { type: Number,  trim: true},
            valor_unitario: { type: Number,  trim: true,
                required: [true, 'O valor unitário do produto é obrigatório.'],
            },
            quantidade: { type: Number,  trim: true,
                required: [true, 'O valor unitário do produto é obrigatório.'],
            }
        }],
        imagens: [{ type: String }],
        observacao: { type: String, trim: true },
        ativo: { type: Boolean, required: true, default: true }
    }
);

manutencaoPreventivaSchema.plugin(mongoosePaginate);

const ManutencaoPreventiva = mongoose.model('manutencoes', manutencaoPreventivaSchema);

export default ManutencaoPreventiva;
