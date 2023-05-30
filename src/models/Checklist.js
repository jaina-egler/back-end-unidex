import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate';
import Veiculo from "../models/Veiculo.js";
import Pessoa from "../models/Pessoa.js";


const checklistScheme = new mongoose.Schema(
    {
        data_verificacao: {
            type: Date, maxlength: 50, trim: true,
            required: [true, 'A data de realização checklist é obrigatória.'],
        },
        Oid_veiculo: { type: mongoose.Schema.Types.ObjectId, ref: Veiculo },
        Oid_motorista: {
            type: mongoose.Types.ObjectId, ref: Pessoa, trim: true,
            required: [true, 'O motorista é obrigatório.'],
        },
        ativo: { type: Boolean, required: true, default: true },
        veiculo_lavado: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        lataria_amassada: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
            fotos: { type: Array, trim: true }
        },
        riscados_pintura: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
            fotos: { type: Array, trim: true }
        },
        bau_bom_estado: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
            fotos: { type: Array, trim: true }
        },
        faixas_refletivas_bom_estado: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
            fotos: { type: Array, trim: true }
        },
        farol_funcionando: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        luz_alta_funcionando: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        meia_luz_funcionando: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        setas_funcionando: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        lanternas_laterias_funcionando: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        lanterna_traseira_funcionando: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        luz_freio_funcionando: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        pneus_calibrados: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        pneus_carecas: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
            fotos: { type: Array, trim: true },
        },
        pneu_estepe_calibrado: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        troca_oleo_em_dia: {
            resposta: { type: Boolean },
        },
        agua_radiador_conferida: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        macaco_em_bom_estado: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        triangulo_de_sinalização_em_bom_estado: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        chave_de_roda_e_cabo_de_força: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        veiculo_lubrificado: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        freios_regulados: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        documento_obrigatorio_em_dia: {
            resposta: { type: Boolean },
        },
        manual_do_veiculo_em_bom_estado: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        habitacao_do_condutor_em_dia: {
            resposta: { type: Boolean },
        },
        cartao_ANTT_em_dia: {
            resposta: { type: Boolean },
        },
        adesivo_ANTT_em_bom_estado: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        pintura_tara_em_bom_estado: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        tacografo_funcionando_e_em_bom_estado: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        disco_de_tacografo_substituido: {
            resposta: { type: Boolean },
            obs: { type: String, trim: true },
        },
        certificado_de_aferição_em_dia: {
            resposta: { type: Boolean },
        }
    },
    { versionKey: false }
);

checklistScheme.plugin(mongoosePaginate);

const Checklist = mongoose.model('checkList', checklistScheme);

export default Checklist;