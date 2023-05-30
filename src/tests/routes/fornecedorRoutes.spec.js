import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app';
import request from "supertest";
import faker from 'faker-br';
import Fornecedor from '../../models/Fornecedor';

/*
  .post("/fornecedores",  FornecedoresController.cadastrarFornecedor)
  .get("/fornecedores/:id", FornecedoresController.listarFornecedorPorId)
  .patch("/fornecedores/:id", FornecedoresController.atualizarFornecedor)
  .delete("/fornecedores/:id", FornecedoresController.excluirFornecedor)
  */

let server
let token = false;
let id_fornecedor;

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


const fornecedor = {
    razao_social: "Carlos",
    nome_fantasia: "carlos yeh",
    telefone: "69984456287",
    email: "yasmin@gmail.com",
    observacoes: "Observações",

    endereco: {
        logradouro: "Quadra",
        numero: "2587",
        bairro: "Bodanese",
        cidade: "Vilhena",
        estado: "Rondonia",
        pais: "Brasil",
        cep: "76981064",
  },
};

describe("/POST em Fornecedores", () => {
    it("Deve cadastrar um Fornecedor", async () => {
      const resposta = await request(app)
        .post("/fornecedores")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .send(fornecedor)
        .expect(201)
        .then((res) => res.body);
  
      expect(resposta.mensagem).toBe("Fornecedor cadastrado(a) com sucesso!")
      id_fornecedor = resposta.dados._id;
    });
  });
  
  describe("/GET em Fornecedor", () => {
    it("Deve retornar uma lista de Fornecedores", async () => {
      const resposta = await request(app)
        .get("/fornecedores")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .expect(200)
        .then(res => res.body)
  
      expect(resposta.mensagem).toBe("Fornecedores encontrado(a)s com sucesso!")
    });
  
    
  });
  
  describe("/GET/ID em Fornecedores", () => {
    it("Deve retornar um Fornecedor por ID ", async () => {
      const dados = await request(app)
        .get(`/fornecedores/${id_fornecedor}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "aplication/json")
        .expect("content-type", /json/)
        .expect(200);
    });
  
    it("Deve retornar erro de Id inválido ", async () => {
      const resposta = await request(app)
        .get("/fornecedores/robinho")
        .set("Authorization", `Bearer ${token}`)
        .expect(403)
        .then(res => res.body)
  
      expect(resposta.mensagem).toBe("O Id inserido é inválido!");
    });
  
    it("Deve retornar erro de Fornecedor não encontrado", async () => {
      const resposta = await request(app)
        .get("/fornecedores/" + new mongoose.Types.ObjectId())
        .set("Authorization", `Bearer ${token}`)
        .expect(404)
        .then(res => res.body)
      expect(resposta.mensagem).toBe("Fornecedor não encontrado(a)!")
    })
  });
  
  describe("/PATCH/ID em Fornecedor", () => {
    it("Deve atualizar fornecedor cadastrada", async () => {
      const resposta = await request(app)
        .patch(`/fornecedores/${id_fornecedor}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ km_atual: 2600 })
        .expect(200)
        .then(res => res.body)
  
      expect(resposta.mensagem).toEqual("Fornecedor atualizado(a) com sucesso!");
    });
  
    it("Deve retornar erro de Id inválido", async () => {
      const resposta = await request(app)
        .patch("/fornecedores/yasqueen")
        .set("Authorization", `Bearer ${token}`)
        .send({ km_atual: 2600 })
        .expect(403)
        .then(res => res.body)
  
      expect(resposta.mensagem).toBe("O Id inserido é inválido!")
    })
  
    it("Deve retornar erro de Fornecedor não encontrado", async () => {
      const resposta = await request(app)
        .patch("/fornecedores/" + new mongoose.Types.ObjectId())
        .set("Authorization", `Bearer ${token}`)
        .send({ km_atual: 2600 })
        .expect(404)
        .then(res => res.body)
  
      expect(resposta.mensagem).toBe("Fornecedor não encontrado(a)!")
    })
  });
  
  describe("/DELETE/ID em Fornecedores", () => {
    it("Deve deletar um Fornecedor cadastrado", async () => {
      const resposta = await request(app)
        .delete(`/fornecedores/${id_fornecedor}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .then(res => res.body)
  
      expect(resposta.mensagem).toBe("Fornecedor excluído(a) com sucesso!")
    });
  
    it("Deve retornar erro de Id inválido", async () => {
      const resposta = await request(app)
        .delete("/fornecedores/yasqueeen")
        .set("Authorization", `Bearer ${token}`)
        .expect(403)
        .then(res => res.body)
  
      expect(resposta.mensagem).toBe("O Id inserido é inválido!")
    })
  
    it("Deve retornar erro de Fornecedor não encontrado", async () => {
      const resposta = await request(app)
        .delete("/fornecedores/" + new mongoose.Types.ObjectId())
        .set("Authorization", `Bearer ${token}`)
        .expect(404)
        .then(res => res.body)
  
      expect(resposta.mensagem).toBe("Fornecedor não encontrado(a)!")
    })
  });
  