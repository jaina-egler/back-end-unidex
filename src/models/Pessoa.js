import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import validation from "../utils/validation.js";

const pessoaSchema = new mongoose.Schema(
    {
        senha: { type: String, minlength: 8, trim: true, required: true, select: false, index: true },
        nome: {
            type: String, trim: true,
            required: [true, 'O nome de usuário é obrigatório.'],
            minlength: [3, 'O nome de usuário deve ter pelo menos 3 caracteres.'],
            maxlength: [80, 'O nome de usuário deve ter no máximo 80 caracteres.'],
        },
        cpf: {
            type: String,
            required: [true, 'O CPF é obrigatório.'],
            minlength: [11, 'O CPF deve ter 11 caracteres.'],
            maxlength: [11, 'O CPF deve ter 11 caracteres.'],
            validate: {
                validator: validation.validateCPFApi,
                message: "CPF inválido!"
            }
        },
        rg: {
            type: String,
            required: [false],
        },
        data_nascimento: { type: Date, required: true },
        endereco: {
            logradouro: {
                type: String,
                required: [true, 'O endereço.logradouro é obrigatório.'],
                minlength: [3, 'O endereço.logradouro deve ter pelo menos 3 caracteres.'],
                maxlength: [80, 'O endereço.logradouro deve ter no máximo 80 caracteres.'],
            },
            numero: {
                type: String,
                required: [true, 'O endereço.numero é obrigatório.'],
                minlength: [1, 'O endereço.numero deve ter pelo menos 1 caracteres.'],
                maxlength: [80, 'O endereço.numero deve ter no máximo 10 caracteres.'],
            },
            cep: {
                type: String, required:
                    [true, 'O endereço.cep é obrigatório.'],
                minlength: [8, 'O endereço.cep deve ter 8 caracteres.'],
                maxlength: [8, 'O endereço.cep deve ter 8 caracteres.'],
            },
            bairro: {
                type: String, required:
                    [true, 'O endereço.bairro é obrigatório.'],
                minlength: [3, 'O endereço.bairro deve ter no mínimo 3 caracteres.'],
                maxlength: [80, 'O endereço.bairro deve ter no máximo 80 caracteres.'],
            },
            cidade: {
                type: String, required:
                    [true, 'O endereço.cidade é obrigatório.'],
                minlength: [3, 'O endereço.cidade deve ter no mínimo 3 caracteres.'],
                maxlength: [80, 'O endereço.cidade deve ter no máximo 80 caracteres.'],
            },
            estado: {
                type: String, required:
                    [true, 'O endereço.estado é obrigatório.'],
                minlength: [2, 'O endereço.estado deve ter 2 caracteres.'],
                maxlength: [2, 'O endereço.estado deve ter 2 caracteres.'],
            },
            complemento: { type: String, required: false },

        },
        cnh: {
            numero: {
                type: String, required:
                    [true, 'A cnh.numero é obrigatória.'],
                minlength: [11, 'A cnh.numero deve ter 11 caracteres.'],
                maxlength: [11, 'O cnh.numero deve ter 11 caracteres.'],
                validate: {
                    validator: validation.validateCNH,
                    message: "CNH inválida!"
                }
            },
            categoria: {
                type: String, required:
                    [true, 'A cnh.categoria é obrigatória.'],
                minlength: [1, 'A cnh.categoria deve ter no minimo 1 caracteres.'],
                maxlength: [2, 'O cnh.categoria deve ter no maximo 2 caracteres.'],
            },
            vencimento: {
                type: Date, required:
                    [true, 'A cnh.vencimento é obrigatória.']
            },
        },
        foto_pessoa: { type: String },
        nivel: { type: Number, default: 0 },
        telefone: { type: String },
        observacao: { type: String },
        ativo: { type: Boolean },
        email: {
            type: String, required: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },

    }
);

pessoaSchema.plugin(mongoosePaginate);

const Pessoa = mongoose.model('pessoas', pessoaSchema);

export default Pessoa
