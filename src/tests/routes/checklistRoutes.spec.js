import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app';
import request from "supertest";
import faker from 'faker-br';

/*
    .post("/checklist",  ChecklistController.cadastrarCheckList)
  */

let server
let token = false;
let idChecklist;


beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

afterAll(() => {
    mongoose.connection.close();
});

describe('/POST em checklist', () => {
    it("Deve cadastrar um checklist", async () => {
        const dataChecklist = new Date()
        const dados = await request(app)
            .post('/checklist')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'aplication/json')
            .send({
                data_verificacao: dataChecklist,
                Oid_veiculo: new mongoose.Types.ObjectId,
                Oid_motorista: new mongoose.Types.ObjectId,
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
                }
            })
            .expect(201);
        idChecklist = dados._body._id;

    });
});

describe('/GET em checklist', () => {
    it("Deve retornar uma lista de checklist", async () => {
        const dados = await request(app)
            .get('/checklist')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'aplication/json')
            .expect(200);
        expect(dados._body.docs[1].ativo).toEqual(true);
    });
});

describe('/GET/ID em checklist', () => {
    it("Deve retornar uma checklist por ID ", async () => {
        const dados = await request(app)
            .get(`/checklist/${idChecklist}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(200);
        expect(dados._body.ativo).toEqual(true);
    });

    it("Deve retornar erro de ID invalido ", async () => {
        const dados = await request(app)
            .get('/checklist/azeitona')
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
        expect(dados._body.message).toEqual('Erro ao localizar o checklist!');
    });
});



describe('/PACTH/ID em checklist', () => {
    it("Deve atualizar um checklist cadastrado", async () => {
        const dados = await request(app)
            .patch(`/checklist/${idChecklist}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ ativo: false })
            .expect(200);
        expect(dados._body.message).toEqual('Cadastro atualizado com sucesso');
    });
});

describe('/DELETE/ID em checklist', () => {
    it("Deve deletar um checklist cadastrado", async () => {
        const dados = await request(app)
            .delete(`/checklist/${idChecklist}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
});

