import { describe, expect, it, jest } from "@jest/globals";
import Abastecimento from "../../models/Abastecimento.js";
import AbastecimentosController from "../../controllers/AbastecimentosController.js";
import mongoose, { mongo } from "mongoose";

describe("Deve retornar teste de unidade de abastecimento", () => {
  afterEach(() => jest.clearAllMocks());

  const objetoAbastecimento = {
    data_abastecimento: new Date(),
    Oid_motorista: new mongoose.Types.ObjectId(),
    litragem: 20,
    Oid_fornecedor: new mongoose.Types.ObjectId(),
    Oid_veiculo: new mongoose.Types.ObjectId(),
    km_atual: 100,
    consumo_medio: 20,
    nota_fiscal: ".txt",
    localizacao: {
      latitude: 0,
      longitude: 0,
    },
    observacao: "obs",
    ativo: true,
  };

  it("Deve instanciar um novo abastecimento", async () => {
    const abastecimento = new Abastecimento(objetoAbastecimento);

    expect(abastecimento).toEqual(expect.objectContaining(objetoAbastecimento));
  });

  it("Deve retornar erro de data inválida", async () => {
    const abastecimento_errado = {
      ...objetoAbastecimento,
      data_abastecimento: "",
      Oid_motorista: null,
    };

    const abastecimento = new Abastecimento(abastecimento_errado);

    try {
      await abastecimento.validate();
    } catch (erros) {
      expect(erros.errors).toHaveProperty("data_abastecimento");
      expect(erros.errors.data_abastecimento.properties).toHaveProperty(
        "message",
        "A data do abastecimento é obrigatória!"
      );
    }
  });

  it("Deve retornar erro de veículo inválido", async () => {
    const abastecimento_errado = {
      ...objetoAbastecimento,
      Oid_veiculo: null,
    };

    const abastecimento = new Abastecimento(abastecimento_errado);

    try {
      await abastecimento.validate();
    } catch (erros) {
      expect(erros.errors).toHaveProperty("Oid_veiculo");
      expect(erros.errors.Oid_veiculo.properties).toHaveProperty(
        "message",
        "O veículo é obrigatório!"
      );
    }
  });

  it("Deve retornar erro de motorista inválido", async () => {
    const abastecimento_errado = {
      ...objetoAbastecimento,
      Oid_motorista: null,
    };

    const abastecimento = new Abastecimento(abastecimento_errado);

    try {
      await abastecimento.validate();
    } catch (erros) {
      expect(erros.errors).toHaveProperty("Oid_motorista");
      expect(erros.errors.Oid_motorista.properties).toHaveProperty(
        "message",
        "O motorista é obrigatório!"
      );
    }
  });

  it("Deve retornar erro de litragem inválida", async () => {
    const abastecimento_errado = {
      ...objetoAbastecimento,
      litragem: 0,
    };

    const abastecimento = new Abastecimento(abastecimento_errado);

    try {
      await abastecimento.validate();
    } catch (erros) {
      expect(erros.errors).toHaveProperty("litragem");
      expect(erros.errors.litragem.properties).toHaveProperty(
        "message",
        "A litragem deve ser maior que zero!"
      );
    }
  });

  it("Deve retornar erro de fornecedor inválido", async () => {
    const abastecimento_errado = {
      ...objetoAbastecimento,
      Oid_fornecedor: 0,
    };

    const abastecimento = new Abastecimento(abastecimento_errado);

    try {
      await abastecimento.validate();
    } catch (erros) {
      expect(erros.errors).toHaveProperty("Oid_fornecedor");
      expect(erros.errors.Oid_fornecedor.properties).toHaveProperty(
        "message",
        "O fornecedor é obrigatório!"
      );
    }
  });


  it("Deve fazer uma chamada simulada ao cadastro no banco de dados", () => {
    AbastecimentosController.cadastrarAbastecimento = jest
      .fn()
      .mockReturnValue(objetoAbastecimento);

    const retorno = AbastecimentosController.cadastrarAbastecimento();
    expect(retorno).toEqual(expect.objectContaining(objetoAbastecimento));
  });
});
