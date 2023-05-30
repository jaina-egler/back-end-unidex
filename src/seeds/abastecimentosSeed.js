import Abastecimento from "../models/Abastecimento.js";
import faker from "faker-br";
import Pessoa from "../models/Pessoa.js";
import Fornecedor from "../models/Fornecedor.js";
import mongoose from "mongoose";
import placaAleatoria from "../utils/placaAleatoria.js";
import Veiculo from "../models/Veiculo.js";

const abastecimentos = async (quant) => {
  await Abastecimento.deleteMany();

  const motoristas = [];
  const fornecedores = [];
  const veiculos = [];

  await Pessoa.find().then((res) => {
    motoristas.push(...res);
  });

  await Fornecedor.find().then((res) => {
    fornecedores.push(...res);
  });

  await Veiculo.find().then((res) => {
    veiculos.push(...res);
  });

  for (let i = 0; i < quant; i++) {
    const abastecimento = {
      data_abastecimento: faker.date.past(),
      Oid_veiculo: veiculos[Math.floor(Math.random() * fornecedores.length)]._id,
      Oid_fornecedor: fornecedores[Math.floor(Math.random() * fornecedores.length)]._id,
      Oid_motorista: motoristas[Math.floor(Math.random() * motoristas.length)]._id,
      litragem: Math.floor(Math.random() * 100) + 20,
      km_atual: Math.floor(Math.random() * 200) + 20,
      consumo_medio: (Math.random() * 100 + 5).toFixed(1),
      nota_fiscal: ".jpg",
      localizacao: {
        latitude: faker.address.latitude(),
        longitude: faker.address.longitude(),
      },
      observacao: faker.lorem.sentence(),
      ativo: faker.random.boolean(),
    };

    await Abastecimento.insertMany([abastecimento]);
  }

  console.log("Abastecimentos inseridos com sucesso!");
};

export default abastecimentos;
