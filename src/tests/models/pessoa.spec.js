import { describe, expect, it, jest } from "@jest/globals";
import Pessoa from "../../models/Pessoa";
import PessoaController from "../../controllers/PessoasController.js";

describe("Deve retornar os testes de unidade de pessoa", () => {
  afterEach(() => jest.clearAllMocks());

  const objetoPessoa = {
    "nome": "João das Couves",
    "cpf": "12345678901",
    "rg": "123456789",
    "data_nascimento": new Date("1990-01-01"),
    "endereco": {
      "logradouro": "Rua das Flores",
      "numero": "123",
      "cep": "12345678",
      "bairro": "Centro",
      "cidade": "São Paulo",
      "estado": "SP",
      "complemento": "Casa",
    },
    "cnh": {
      "numero": "16282508110",
      "categoria": "AE",
      "vencimento": new Date("2020-12-31"),
    },
    "foto_pessoa": "foto.jpg",
    "nivel": 1,
    "telefone": "11999999999",
    "observacao": "Observação",
    "ativo": true,
    "email": "joao@gmail.com",
    "senha": "12345678",
  };

  it("Deve Instanciar uma nova pessoa", () => {
    const pessoa = new Pessoa(objetoPessoa);
    expect(pessoa).toEqual(expect.objectContaining(objetoPessoa));

    expect(pessoa).toHaveProperty("nome", "João das Couves");
    /* expect.objectContaining = comparação de objeto, subconjunto do objeto
           toHaveProperty = verifica as propriedades do objeto
        */
  });

  it("Deve fazer uma chamada simulada de cadastro ao BD", () => {
    PessoaController.cadastrar = jest.fn().mockReturnValue(objetoPessoa);

    const retorno = PessoaController.cadastrar();
    expect(retorno).toEqual(
      expect.objectContaining({
        nome: expect.any(String),
        ...objetoPessoa,
      })
    );
  });
});
