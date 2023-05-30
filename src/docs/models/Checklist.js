import mongoose from "mongoose"

const situacao_sem_foto = {
    type: 'object',
    properties: {
        resposta: { type: 'boolean' },
        obs: { type: 'string' }
    }
}

const situacao_com_foto = {
    type: 'object',
    properties: {
        resposta: { type: 'boolean' },
        obs: { type: 'string' },
        fotos: {
            type: 'array',
            items: {
                type: 'string'
            }
        }
    }
}


const Checklist = {
    type: 'object',
    example: {
        data_verificacao: new Date(),
        Oid_veiculo: new mongoose.Types.ObjectId(),
        Oid_motorista: new mongoose.Types.ObjectId(),
        veiculo_lavado: {
            resposta: false,
            obs: ""
        },
        lataria_amassada: {
            resposta: false,
            obs: "",
            fotos: []
        },
        riscados_pintura: {
            resposta: false,
            obs: "",
            fotos: []
        },
        bau_bom_estado: {
            resposta: false,
            obs: "",
            fotos: []
        },
        faixas_refletivas_bom_estado: {
            resposta: false,
            obs: "",
            fotos: []
        },
        pneu_estepe_calibrado: {
            resposta: false,
            obs: ""
        },
        agua_radiador_conferida: {
            resposta: false,
            obs: ""
        },
        macaco_em_bom_estado: {
            resposta: false,
            obs: ""
        },
        triangulo_de_sinalização_em_bom_estado: {
            resposta: false,
            obs: ""
        },
        chave_de_roda_e_cabo_de_força: {
            resposta: false,
            obs: ""
        },
        veiculo_lubrificado: {
            resposta: false,
            obs: ""
        },
        freios_regulados: {
            resposta: false,
            obs: ""
        },
        manual_do_veiculo_em_bom_estado: {
            resposta: false,
            obs: ""
        },
        adesivo_ANTT_em_bom_estado: {
            resposta: false,
            obs: ""
        },
        pintura_tara_em_bom_estado: {
            resposta: false,
            obs: ""
        },
        tacografo_funcionando_e_em_bom_estado: {
            resposta: false,
            obs: ""
        },
        disco_de_tacografo_substituido: {
            resposta: false,
            obs: ""
        },
        troca_oleo_em_dia: {
            resposta: false
        },
        documento_obrigatorio_em_dia: {
            resposta: false
        },
        habitacao_do_condutor_em_dia: {
            resposta: false
        },
        cartao_ANTT_em_dia: {
            resposta: false
        },
        certificado_de_aferição_em_dia: {
            resposta: false
        },

    },
    properties: {
        data_verificacao: { type: 'string' },
        Oid_veiculo: { type: 'ObjectId' },
        Oid_motorista: { type: 'ObjectId' },
        veiculo_lavado: situacao_sem_foto,
        lataria_amassada: situacao_com_foto,
        riscados_pintura: situacao_com_foto,
        bau_bom_estado: situacao_com_foto,
        faixas_refletivas_bom_estado: situacao_com_foto,
        farol_funcionando: situacao_sem_foto,
        luz_alta_funcionando: situacao_sem_foto,
        meia_luz_funcionando: situacao_sem_foto,
        setas_funcionando: situacao_sem_foto,
        lanternas_laterias_funcionando: situacao_sem_foto,
        lanterna_traseira_funcionando: situacao_sem_foto,
        luz_freio_funcionando: situacao_sem_foto,
        pneus_calibrados: situacao_sem_foto,
        pneus_carecas: situacao_com_foto,
        pneu_estepe_calibrado: situacao_sem_foto,
        troca_oleo_em_dia: {
            type: 'object',
            properties: {
                resposta: { type: 'boolean' }
            }
        },
        agua_radiador_conferida: situacao_sem_foto,
        macaco_em_bom_estado: situacao_sem_foto,
        triangulo_de_sinalização_em_bom_estado: situacao_sem_foto,
        chave_de_roda_e_cabo_de_força: situacao_sem_foto,
        veiculo_lubrificado: situacao_sem_foto,
        freios_regulados: situacao_sem_foto,
        documento_obrigatorio_em_dia: {
            type: 'object',
            properties: {
                resposta: { type: 'boolean' }
            }
        },
        manual_do_veiculo_em_bom_estado: situacao_sem_foto,
        habitacao_do_condutor_em_dia: {
            type: 'object',
            properties: {
                resposta: { type: 'boolean' }
            }
        },
        cartao_ANTT_em_dia: {
            type: 'object',
            properties: {
                resposta: { type: 'boolean' }
            }
        },
        adesivo_ANTT_em_bom_estado: situacao_sem_foto,
        pintura_tara_em_bom_estado: situacao_sem_foto,
        tacografo_funcionando_e_em_bom_estado: situacao_sem_foto,
        disco_de_tacografo_substituido: situacao_sem_foto,
        certificado_de_aferição_em_dia: {
            type: 'object',
            properties: {
                resposta: { type: 'boolean' }
            }
        }
    }
}

export default Checklist