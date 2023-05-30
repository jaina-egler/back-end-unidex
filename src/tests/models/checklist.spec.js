import { describe, expect, it, jest, } from '@jest/globals';
import Checklist from '../../models/Checklist.js';
import checklistController from '../../controllers/ChecklistController.js'
import  mongoose  from 'mongoose';

describe('Deve retornar teste de unidade de checklist', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    })
    afterEach(() => jest.clearAllMocks());
    const objetoChecklist = {

        data_verificacao: new Date(),
        Oid_veiculo:  new mongoose.Types.ObjectId(),
        Oid_motorista:  new mongoose.Types.ObjectId(),

        ativo: true,
        veiculo_lavado: {
            resposta: true,
            obs: 'obs',
        },
        lataria_amassada: {
            resposta: true,
            obs: 'obs',
            fotos: []
        },
        riscados_pintura: {
            resposta: true,
            obs: 'obs',
            fotos: []
        },
        bau_bom_estado: {
            resposta: true,
            obs: 'obs',
            fotos: []
        },
        faixas_refletivas_bom_estado: {
            resposta: true,
            obs: 'obs',
            fotos: []
        },
        farol_funcionando: {
            resposta: true,
            obs: 'obs'
        },
        luz_alta_funcionando: {
            resposta: true,
            obs: 'obs'
        },
        meia_luz_funcionando: {
            resposta: true,
            obs: 'obs'
        },
        setas_funcionando: {
            resposta: true,
            obs: 'obs'
        },
        lanternas_laterias_funcionando: {
            resposta: true,
            obs: 'obs'
        },
        lanterna_traseira_funcionando: {
            resposta: true,
            obs: 'obs'
        },
        luz_freio_funcionando: {
            resposta: true,
            obs: 'obs'
        },
        pneus_calibrados: {
            resposta: true,
            obs: 'obs'
        },
        pneus_carecas:{
            resposta: true,
            obs: 'obs',
            fotos: []
        },
        pneu_estepe_calibrado: {
            resposta: true,
            obs: 'obs'
        },
        troca_oleo_em_dia: {
            resposta: true,
        },
        agua_radiador_conferida: {
            resposta: true,
            obs: 'obs'
        },
        macaco_em_bom_estado: {
            resposta: true,
            obs: 'obs'
        },
        triangulo_de_sinalização_em_bom_estado: {
            resposta: true,
            obs: 'obs'
        },
        chave_de_roda_e_cabo_de_força: {
            resposta: true,
            obs: 'obs'
        },
        veiculo_lubrificado: {
            resposta: true,
            obs: 'obs'
        },
        freios_regulados: {
            resposta: true,
            obs: 'obs'
        },
        documento_obrigatorio_em_dia: {
            resposta: true,
        },
        manual_do_veiculo_em_bom_estado: {
            resposta: true,
            obs: 'obs'
        },
        habitacao_do_condutor_em_dia: {
            resposta: true,
        },
        cartao_ANTT_em_dia: {
            resposta: true,
        },
        adesivo_ANTT_em_bom_estado: {
            resposta: true,
            obs: 'obs'
        },
        pintura_tara_em_bom_estado: {
            resposta: true,
            obs: 'obs'
        },
        tacografo_funcionando_e_em_bom_estado: {
            resposta: true,
            obs: 'obs'
        },
        disco_de_tacografo_substituido: {
            resposta: true,
            obs: 'obs'
        },
        certificado_de_aferição_em_dia: {
            resposta: true,
        }
    };

    it('Deve instanciar um novo checklist', () => {
        const checklist = new Checklist(objetoChecklist);
        expect(checklist).toEqual(expect.objectContaining(objetoChecklist));
    });

    it('Deve fazer uma chamada simulada de cadastro ao BD', () => {
        checklistController.cadastrarCheckList = jest.fn().mockReturnValue(objetoChecklist)

        const retorno = checklistController.cadastrarCheckList();
        expect(retorno).toEqual(expect.objectContaining(objetoChecklist));
    });
});
