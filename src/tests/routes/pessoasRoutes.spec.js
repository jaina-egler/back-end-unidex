import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals';
import mongoose from 'mongoose';
import app from '../../app';
import request from 'supertest';
import Pessoa from '../../models/Pessoa';

let server
let token = false;
const pessoa = {
  nome: 'João das Couves',
  data_nascimento: '2000-10-02',
  cpf: '05239904219',
  rg: '123456789',
  endereco: {
    logradouro: 'Rua das Flores',
    numero: '123',
    cep: '123456789',
    bairro: 'Centro',
    cidade: 'São Paulo',
    estado: 'SP',
    complemento: 'Casa',
  },
  cnh: {
    categoria: 'AB',
    numero: '16282508110',
    vencimento: '2020-12-31',
  },
  foto: 'foto.jpg',
  nivel: 1,
  telefone: '11999999999',
  observacao: 'Observação',
  ativo: true,
  email: 'joao@gmail.com',
  senha: '12345678'
}

let id_pessoa = ''

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

describe('/POST em Pessoas', () => {
  it('Deve cadastrar uma Pessoa', async () => {
    const resposta = await request(app)
      .post('/pessoas')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'aplication/json')
      .send(pessoa)
      .expect(201)
      .then((res) => res.body);

    expect(resposta.mensagem).toBe('Pessoa cadastrado(a) com sucesso!')
    id_pessoa = resposta.dados._id;
  });
});

describe('/GET em Pessoas', () => {
  it('Deve retornar uma lista de Pessoas', async () => {
    const resposta = await request(app)
      .get('/pessoas')
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'aplication/json')
      .expect(200)
      .then(res => res.body)

    expect(resposta.mensagem).toBe('Pessoas encontrado(a)s com sucesso!')
  });

  
});

describe('/GET/ID em Pessoas', () => {
  it('Deve retornar uma Pessoa por ID ', async () => {
    const dados = await request(app)
      .get(`/pessoas/${id_pessoa}`)
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'aplication/json')
      .expect('content-type', /json/)
      .expect(200);
  });

  it('Deve retornar erro de Id inválido ', async () => {
    const resposta = await request(app)
      .get('/pessoas/robinho')
      .set('Authorization', `Bearer ${token}`)
      .expect(403)
      .then(res => res.body)

    expect(resposta.mensagem).toBe('O Id inserido é inválido!');
  });

  it('Deve retornar erro de Pessoa não encontrado', async () => {
    const resposta = await request(app)
      .get('/pessoas/' + new mongoose.Types.ObjectId())
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .then(res => res.body)

    expect(resposta.mensagem).toBe('Pessoa não encontrado(a)!')
  })
});

describe('/PATCH/ID em Pessoas', () => {
  it('Deve atualizar pessoa cadastrada', async () => {
    const resposta = await request(app)
      .patch(`/pessoas/${id_pessoa}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ km_atual: 2600 })
      .expect(200)
      .then(res => res.body)

    expect(resposta.mensagem).toEqual('Pessoa atualizado(a) com sucesso!');
  });

  it('Deve retornar erro de Id inválido', async () => {
    const resposta = await request(app)
      .patch('/pessoas/robinho')
      .set('Authorization', `Bearer ${token}`)
      .send({ km_atual: 2600 })
      .expect(403)
      .then(res => res.body)

    expect(resposta.mensagem).toBe('O Id inserido é inválido!')
  })

  it('Deve retornar erro de Pessoa não encontrado', async () => {
    const resposta = await request(app)
      .patch('/pessoas/' + new mongoose.Types.ObjectId())
      .set('Authorization', `Bearer ${token}`)
      .send({ km_atual: 2600 })
      .expect(404)
      .then(res => res.body)

    expect(resposta.mensagem).toBe('Pessoa não encontrado(a)!')
  })
});

describe('/DELETE/ID em Pessoas', () => {
  it('Deve deletar uma Pessoa cadastrado', async () => {
    const resposta = await request(app)
      .delete(`/pessoas/${id_pessoa}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then(res => res.body)

    expect(resposta.mensagem).toBe('Pessoa excluído(a) com sucesso!')
  });

  it('Deve retornar erro de Id inválido', async () => {
    const resposta = await request(app)
      .delete('/pessoas/robinho')
      .set('Authorization', `Bearer ${token}`)
      .expect(403)
      .then(res => res.body)

    expect(resposta.mensagem).toBe('O Id inserido é inválido!')
  })

  it('Deve retornar erro de Pessoa não encontrado', async () => {
    const resposta = await request(app)
      .delete('/pessoas/' + new mongoose.Types.ObjectId())
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .then(res => res.body)

    expect(resposta.mensagem).toBe('Pessoa não encontrado(a)!')
  })
});
