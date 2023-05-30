import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app';
import request from "supertest";
import faker from 'faker-br';

/*  
  .get("/manutencoesCorretivas", ManutencoesCorretivasController.listarManutencoesCorretivas)
  .get("/manutencoesCorretivas/:id", ManutencoesCorretivasController.listarManutencaoCorretivaPorId)
  .post("/manutencoesCorretivas",  ManutencoesCorretivasController.cadastrarManutencaoCorretiva)
  .patch("/manutencoesCorretivas/:id", ManutencoesCorretivasController.atualizarManutencaoCorretiva)
  .put("/manutencoesCorretivas/:id", ManutencoesCorretivasController.atualizarManutencaoCorretiva)
  */

let server
let token = false;
let idManutencao;
let objManutencao;

beforeEach(() => {
    const port = 3034;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

afterAll(() => {
    mongoose.connection.close();
});

describe('/POST em manutencoesCorretivas', () => {
    it("Deve cadastrar uma manutencao", async () => {
        const dados = await request(app)
            .post('/manutencoesCorretivas')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'aplication/json')
            .send({
                dataCriacao: new Date(),
                dataManutencao: new Date(),
                idVeiculo: '1234',
                placaVeiculo: 'ABC1234',
                idUsuario: 'user123',
                nomeUsuario: 'John Doe',
                valorTotal: 1500.00,
                tipoManutencao: 'Manutenção Mecânica',
                imagem: ['imagem1.jpg', 'imagem2.jpg'],
                localizacao: 'Oficina do Zé',
                observacao: 'Foi trocada a correia dentada'
              })
            .expect(201);
            idManutencao = dados._body._id;
            objManutencao = dados;
    });
});

describe('/GET em manutencoesCorretivas', () => {
    it("Deve retornar uma lista de manutencoesCorretivas", async () => {
        const dados = await request(app)
            .get('/manutencoesCorretivas')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'aplication/json')
            .expect(200);
        expect(dados._body.docs[1].idVeiculo).toEqual('123');
    });
});

describe('/GET/ID em manutencoesCorretivas', () => {
    it("Deve retornar uma manutencao por ID ", async () => {
        const dados = await request(app)
            .get(`/manutencoesCorretivas/${idManutencao}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(200);
        expect(dados._body.idVeiculo
        ).toEqual('123');
    });

    it("Deve retornar erro de ID invalido ", async () => {
        const dados = await request(app)
            .get('/manutencoesCorretivas/robinho')
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
        expect(dados._body.message).toEqual('ID inválido');
    });
});

describe('/GET/filter em manutencoesCorretivas', () => {
    it("Deve retornar uma manutencoes filtradas por data de criacao", async () => {
        const dados = await request(app)
            .get(`/manutencoesCorretivas/filter?dtcriacao=${objManutencao.dataCriacao}?dtmanutencao=?placa=?motorista=`)
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(200);
        expect(dados._body.idVeiculo
        ).toEqual('1234');
    });
});

describe('/PATCH/ID em manutencoesCorretivas', () => {
    it("Deve atualizar o manutencao cadastrada", async () => {
        const dados = await request(app)
            .patch(`/manutencoesCorretivas/${idManutencao}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ nomeUsuario: "carlos yeh" })
            .expect(200);
        expect(dados._body.message).toEqual('Cadastro atualizado com sucesso');
    });
});

describe('/DELETE/ID em manutencoesCorretivas', () => {
    it("Deve deletar manutencao cadastrada", async () => {
        const dados = await request(app)
            .delete(`/manutencoesCorretivas/${idManutencao}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
});