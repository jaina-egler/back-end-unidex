import {
  describe,
  expect,
  it,
  jest,
  beforeEach,
  afterAll,
  afterEach,
} from "@jest/globals";
import mongoose from "mongoose";
import app from "../../app";
import request from "supertest";
import faker from "faker-br";
import Pessoa from "../../models/Pessoa";
import Fornecedor from "../../models/Fornecedor";

/*
  .get("/abastecimentos", AuthMidleware, abastecimentoController.listarAbastecimentos)
  .get("/abastecimentos/:id", AuthMidleware, abastecimentoController.listarAbastecimentoPorId)
  .post("/abastecimentos", AuthMidleware, abastecimentoController.cadastrarAbastecimento)
  .patch("/abastecimentos/:id", AuthMidleware, abastecimentoController.atualizarAbastecimento)
  */

let server;
let token = false;
let id_abastecimento;

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

const motorista = await Pessoa.find().then((res) => res[0]._id);

const fornecedor = await Fornecedor.find().then((res) => res[0]._id);

const abastecimento = {
  data_abastecimento: new Date(),
  placa: "NCT0032",
  Oid_motorista: motorista,
  litragem: 200.9,
  Oid_fornecedor: fornecedor,
  valor_total: 500.8,
  km_atual: 2500.0,
  consumo_medio: 22.8,
  nota_fiscal: "imagemtop.png",
  localizacao: {
    latitude: -77.0364,
    longitude: 38.8951,
  },
};

describe("/POST em Abastecimentos", () => {
  it("Deve cadastrar um Abastecimento", async () => {
    const resposta = await request(app)
      .post("/abastecimentos")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "aplication/json")
      .send(abastecimento)
      .expect(201)
      .then((res) => res.body);

    expect(resposta.mensagem).toBe("Abastecimento cadastrado(a) com sucesso!")
    id_abastecimento = resposta.dados._id;
  });
});

describe("/GET em Abastecimentos", () => {
  it("Deve retornar uma lista de Abastecimentos", async () => {
    const resposta = await request(app)
      .get("/abastecimentos")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "aplication/json")
      .expect(200)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Abastecimentos encontrado(a)s com sucesso!")
  });

  
});

describe("/GET/ID em Abastecimentos", () => {
  it("Deve retornar um Abastecimento por ID ", async () => {
    const dados = await request(app)
      .get(`/abastecimentos/${id_abastecimento}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "aplication/json")
      .expect("content-type", /json/)
      .expect(200);
  });

  it("Deve retornar erro de Id inválido ", async () => {
    const resposta = await request(app)
      .get("/abastecimentos/robinho")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("O Id inserido é inválido!");
  });

  it("Deve retornar erro de Abastecimento não encontrado", async () => {
    const resposta = await request(app)
      .get("/abastecimentos/" + new mongoose.Types.ObjectId())
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Abastecimento não encontrado(a)!")
  })
});

describe("/PATCH/ID em Abastecimentos", () => {
  it("Deve atualizar abastecimento cadastrada", async () => {
    const resposta = await request(app)
      .patch(`/abastecimentos/${id_abastecimento}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ km_atual: 2600 })
      .expect(200)
      .then(res => res.body)

    expect(resposta.mensagem).toEqual("Abastecimento atualizado(a) com sucesso!");
  });

  it("Deve retornar erro de Id inválido", async () => {
    const resposta = await request(app)
      .patch("/abastecimentos/robinho")
      .set("Authorization", `Bearer ${token}`)
      .send({ km_atual: 2600 })
      .expect(403)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("O Id inserido é inválido!")
  })

  it("Deve retornar erro de Abastecimento não encontrado", async () => {
    const resposta = await request(app)
      .patch("/abastecimentos/" + new mongoose.Types.ObjectId())
      .set("Authorization", `Bearer ${token}`)
      .send({ km_atual: 2600 })
      .expect(404)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Abastecimento não encontrado(a)!")
  })
});

describe("/DELETE/ID em Abastecimentos", () => {
  it("Deve deletar um Abastecimento cadastrado", async () => {
    const resposta = await request(app)
      .delete(`/abastecimentos/${id_abastecimento}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Abastecimento excluído(a) com sucesso!")
  });

  it("Deve retornar erro de Id inválido", async () => {
    const resposta = await request(app)
      .delete("/abastecimentos/robinho")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("O Id inserido é inválido!")
  })

  it("Deve retornar erro de Abastecimento não encontrado", async () => {
    const resposta = await request(app)
      .delete("/abastecimentos/" + new mongoose.Types.ObjectId())
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Abastecimento não encontrado(a)!")
  })
});
