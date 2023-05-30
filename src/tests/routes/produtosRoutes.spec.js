import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import app from '../../app';
import request from "supertest";

/*
  .get("/produtos/:id", ProdutosController.listarProdutoPorId)
  .post("/produtos",  ProdutosController.cadastrarProduto)
  .patch("/produtos/:id", ProdutosController.atualizarProduto)
  .put("/produtos/:id", ProdutosController.atualizarProduto)
  */

let server
let token = false;
let idProduto;
let produto = {
  nome: "Óleo",
  marca: "Shell",
  descricao: "Óleo Shell",
  fornecedor_combinado: {
    nome_fornecedor: "Posto Shell - Pirapitinga",
    id_fornecedor: new mongoose.Types.ObjectId,
    valor_combinado: 20000
  },
  valor: 30000
}


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

// describe.skip('/POST em produtos', () => {
//   it("Deve cadastrar um produto", async () => {
//     const dados = await request(app)
//       .post('/produtos')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Accept', 'aplication/json')
//       .send({
//         nome: "Óleo",
//         marca: "Shell",
//         descricao: "Óleo Shell",
//         fornecedor_combinado: {
//             nome_fornecedor: "Posto Shell - Pirapitinga",
//             id_fornecedor: new mongoose.Types.ObjectId,
//             valor_combinado: 20000
//         },
//         valor: 30000
//     })
//       .expect(201);
//     idProduto = dados._body._id;
//   });
// });


// describe.skip('/GET em produtos', () => {
//   it("Deve retornar uma lista de produtos", async () => {
//     const dados = await request(app)
//       .get('/produtos')
//       .set('Authorization', `Bearer ${token}`)
//       .set('Accept', 'aplication/json')
//       .expect(200);
//     expect(dados._body.docs[1].nome).toContain("Óleo");
//   });
// });

// describe.skip('/GET/ID em produtos', () => {
//   it("Deve retornar uma pessoa por ID ", async () => {
//     const dados = await request(app)
//       .get(`/produtos/${idProduto}`)
//       .set('Authorization', `Bearer ${token}`)
//       .set('Accept', 'aplication/json')
//       .expect('content-type', /json/)
//       .expect(200);
//     //console.log(dados._body)
//     expect(dados._body.nome
//     ).toContain("Óleo");
//   });

//   it("Deve retornar erro de ID invalido ", async () => {
//     const dados = await request(app)
//       .get('/produtos/azeitona')
//       .set('Authorization', `Bearer ${token}`)
//       .expect(400);
//     //console.log(dados._body)
//     expect(dados._body.message).toEqual('ID inválido');
//   });
// });



// describe.skip('/PACTH/ID em produtos', () => {
//     it("Deve atualizar um produto cadastrado", async () => {
//         const dados = await request(app)
//         .patch(`/produtos/${idProduto}`)
//         .set('Authorization', `Bearer ${token}`)
//         .send({nome: "Óleo Diesel"})
//         .expect(200);
//         expect(dados._body.message).toEqual('Cadastro atualizado com sucesso');
//     });
// });

// describe.skip('/DELETE/ID em produtos', () => {
//     it("Deve deletar um produto cadastrado", async () => {
//         const dados = await request(app)
//         .delete(`/produtos/${idProduto}`)
//         .set('Authorization', `Bearer ${token}`)
//         .expect(200);
//     });
// });



describe("/POST em Produtos", () => {
  it("Deve cadastrar um Produto", async () => {
    const resposta = await request(app)
      .post("/produtos")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "aplication/json")
      .send(produto)
      .expect(201)
      .then((res) => res.body);

    expect(resposta.mensagem).toBe("Produto cadastrado(a) com sucesso!")
    idProduto = resposta.dados._id;
  });
});

describe("/GET em Produtos", () => {
  it("Deve retornar uma lista de Produtos", async () => {
    const resposta = await request(app)
      .get("/Produtos")
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "aplication/json")
      .expect(200)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Produtos encontrado(a)s com sucesso!")
  });


});

describe("/GET/ID em Produtos", () => {
  it("Deve retornar um Abastecimento por ID ", async () => {
    const dados = await request(app)
      .get(`/produtos/${idProduto}`)
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "aplication/json")
      .expect("content-type", /json/)
      .expect(200);
  });

  it("Deve retornar erro de Id inválido ", async () => {
    const resposta = await request(app)
      .get("/produtos/robinho")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("O Id inserido é inválido!");
  });

  it("Deve retornar erro de Abastecimento não encontrado", async () => {
    const resposta = await request(app)
      .get("/produtos/" + new mongoose.Types.ObjectId())
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Produto não encontrado(a)!")
  })
});

describe("/PATCH/ID em Produtos", () => {
  it("Deve atualizar Produto cadastrado", async () => {
    const resposta = await request(app)
      .patch(`/produtos/${idProduto}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ km_atual: 2600 })
      .expect(200)
      .then(res => res.body)

    expect(resposta.mensagem).toEqual("Produto atualizado(a) com sucesso!");
  });

  it("Deve retornar erro de Id inválido", async () => {
    const resposta = await request(app)
      .patch("/produtos/robinho")
      .set("Authorization", `Bearer ${token}`)
      .send({ km_atual: 2600 })
      .expect(403)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("O Id inserido é inválido!")
  })

  it("Deve retornar erro de Produto não encontrado", async () => {
    const resposta = await request(app)
      .patch("/produtos/" + new mongoose.Types.ObjectId())
      .set("Authorization", `Bearer ${token}`)
      .send({ km_atual: 2600 })
      .expect(404)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Produto não encontrado(a)!")
  })
});

describe("/DELETE/ID em Produtos", () => {
  it("Deve deletar um Produto cadastrado", async () => {
    const resposta = await request(app)
      .delete(`/produtos/${idProduto}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Produto excluído(a) com sucesso!")
  });

  it("Deve retornar erro de Id inválido", async () => {
    const resposta = await request(app)
      .delete("/produtos/robinho")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("O Id inserido é inválido!")
  })

  it("Deve retornar erro de Produto não encontrado", async () => {
    const resposta = await request(app)
      .delete("/produtos/" + new mongoose.Types.ObjectId())
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then(res => res.body)

    expect(resposta.mensagem).toBe("Produto não encontrado(a)!")
  })
});
