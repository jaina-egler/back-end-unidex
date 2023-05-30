import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app';
import request from "supertest";
import placaAleatoria from '../../utils/placaAleatoria';

/*
  .get("/veiculos", VeiculosController.listarVeiculos)
  .get("/veiculos/:id", VeiculosController.listarVeiculoPorId)
  .post("/veiculos",  VeiculosController.cadastrarVeiculo)
  .patch("/veiculos/:id", VeiculosController.atualizarVeiculo)
  .put("/veiculos/:id", VeiculosController.atualizarVeiculo)
  .delete("/veiculos/:id", VeiculosController.excluirVeiculo)
  */

let server;
let token = false;
let id_veiculo;

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


const veiculo = {
  placa: placaAleatoria(),
  marca: "Volvo",
  modelo: "FH11",
  ano: 2020,
  renavan: "12345678910",
  vencimento_ipva: new Date(),
  km_atual: 10000,
  ativo: true
};

describe("/POST em Veículos", () => {
  it("Deve cadastrar um Veículo", async () => {
    const resposta = await request(app)
    .post("/veiculos")
    .set("Authorization", `Bearer ${token}`)
    .set("Accept", "aplication/json")
    .send(veiculo)
    .expect(201)
    .then(res => res.body)

    expect(resposta.mensagem).toBe("Veiculo cadastrado(a) com sucesso!")
    id_veiculo = resposta.dados._id;
  });
});

describe("/GET em Veículos", () => {
  it("Deve retornar uma lista de Veículos", async () => {
    const resposta = await request(app)
      .get("/veiculos")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "aplication/json")
      .expect(200)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Veiculos encontrado(a)s com sucesso!")
  });


});

describe("/GET/ID em Veículos", () => {
  it("Deve retornar um Veículo por ID ", async () => {
    const dados = await request(app)
      .get(`/veiculos/${id_veiculo}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "aplication/json")
      .expect("content-type", /json/)
      .expect(200);
  });

  it("Deve retornar erro de Id inválido ", async () => {
    const resposta = await request(app)
      .get("/veiculos/id_invalido")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("O Id inserido é inválido!");
  });

  it("Deve retornar erro de Veículo não encontrado", async () => {
    const resposta = await request(app)
      .get("/veiculos/" + new mongoose.Types.ObjectId())
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Veiculo não encontrado(a)!")
  })
});

describe("/PATCH/ID em Veículos", () => {
  it("Deve atualizar um Veículo cadastrado", async () => {
    const resposta = await request(app)
      .patch(`/veiculos/${id_veiculo}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ km_atual: 0 })
      .expect(200)
      .then(res => res.body)

    expect(resposta.mensagem).toEqual("Veiculo atualizado(a) com sucesso!");
  });

  it("Deve retornar erro de Id inválido", async () => {
    const resposta = await request(app)
      .patch("/veiculos/id_invalido")
      .set("Authorization", `Bearer ${token}`)
      .send({ km_atual: 0 })
      .expect(403)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("O Id inserido é inválido!")
  })

  it("Deve retornar erro de Veículo não encontrado", async () => {
    const resposta = await request(app)
      .patch("/veiculos/" + new mongoose.Types.ObjectId())
      .set("Authorization", `Bearer ${token}`)
      .send({ km_atual: 0 })
      .expect(404)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Veiculo não encontrado(a)!")
  })
});

describe("/DELETE/ID em Veículos", () => {
  it("Deve deletar um Veículo cadastrado", async () => {
    const resposta = await request(app)
      .delete(`/veiculos/${id_veiculo}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Veiculo excluído(a) com sucesso!")
  });

  it("Deve retornar erro de Id inválido", async () => {
    const resposta = await request(app)
      .delete("/veiculos/id_invalido")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("O Id inserido é inválido!")
  })

  it("Deve retornar erro de Veículo não encontrado", async () => {
    const resposta = await request(app)
      .delete("/veiculos/" + new mongoose.Types.ObjectId())
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Veiculo não encontrado(a)!")
  })
});
