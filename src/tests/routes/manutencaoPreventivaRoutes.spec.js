import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app';
import request from "supertest";
import faker from 'faker-br';

/*  
  .post("/manutencoesPreventivas",   ManutencoesPreventivasController.cadastrarManutencaoPreventiva)
  .get("/manutencoesPreventivas",  ManutencoesPreventivasController.listarManutencoesPreventivas)
  .get("/manutencoesPreventivas/:id",  ManutencoesPreventivasController.listarManutencaoPreventivaPorId)
  .patch("/manutencoesPreventivas/:id",  ManutencoesPreventivasController.atualizarManutencaoPreventiva)
  .put("/manutencoesPreventivas/:id",  ManutencoesPreventivasController.atualizarManutencaoPreventiva)
  */

let server
let token = false;
let idManutencao;

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

describe.skip('/POST em manutencoesPreventivas', () => {
    it("Deve cadastrar uma manutencao", async () => {
        const dados = await request(app)
            .post('/manutencoesPreventivas')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'aplication/json')
            .send({
                dataCriacao: new Date(),
                kmNecessario: 5000,
                idVeiculo: '123',
                placaVeiculo: 'ABC1234',
                idUsuario: '456',
                nomeUsuario: 'Fulano',
                valorTotal: 1000,
                produtos: ['Óleo', 'Filtro de óleo', 'Filtro de ar'],
                imagem: ['imagem1.jpg', 'imagem2.jpg'],
                observacao: 'Manutenção preventiva realizada'
            })
            .expect(201);
            idManutencao = dados._body._id;
    });
});

describe.skip('/GET em manutencoesPreventivas', () => {
    it("Deve retornar uma lista de manutencoesPreventivas", async () => {
        const dados = await request(app)
            .get('/manutencoesPreventivas')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'aplication/json')
            .expect(200);
        expect(dados._body.docs[1].idVeiculo).toEqual('123');
    });
});

describe.skip('/GET/ID em manutencoesPreventivas', () => {
    it("Deve retornar uma manutencao por ID ", async () => {
        const dados = await request(app)
            .get(`/manutencoesPreventivas/${idManutencao}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(200);
        expect(dados._body.idVeiculo
        ).toEqual('123');
    });

    it("Deve retornar erro de ID invalido ", async () => {
        const dados = await request(app)
            .get('/manutencoesPreventivas/robinho')
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
        expect(dados._body.message).toEqual('ID inválido');
    });
});

describe.skip('/PATCH/ID em manutencoesPreventivas', () => {
    it("Deve atualizar o manutencao cadastrada", async () => {
        const dados = await request(app)
            .patch(`/manutencoesPreventivas/${idManutencao}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ nomeUsuario: "carlos yeh" })
            .expect(200);
        expect(dados._body.message).toEqual('Cadastro atualizado com sucesso');
    });
});

describe.skip('/DELETE/ID em manutencoesPreventivas', () => {
    it("Deve deletar manutencao cadastrada", async () => {
        const dados = await request(app)
            .delete(`/manutencoesPreventivas/${idManutencao}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
});