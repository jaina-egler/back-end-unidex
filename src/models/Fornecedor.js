import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';


const fornecedorSchema = new mongoose.Schema(
    {
        razao_social: { type: String, required: true, trim: true },
        nome_fantasia: { type: String, required: true, trim: true },
        telefone: { type: String, required: true },
        ativo: { type: Boolean, required: true, default: true},
        email: {
            type: String,
            required: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
        observacoes: { type: String, required: false, trim: true },

        endereco: {
            _id: { type: mongoose.Types.ObjectId, required: false },
            logradouro: { type: String, required: true, trim: true },
            numero: { type: String, required: true, trim: true },
            bairro: { type: String, required: true, trim: true },
            cidade: { type: String, required: true, trim: true },
            estado: { type: String, required: true, trim: true },
            pais: { type: String, required: true, trim: true },
            cep: { type: String, required: true, trim: true }
        }
    },
    { versionKey: false }

);

fornecedorSchema.plugin(mongoosePaginate);

const Fornecedor = mongoose.model('fornecedores', fornecedorSchema);

export default Fornecedor;
