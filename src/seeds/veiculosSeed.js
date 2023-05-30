import faker from "faker-br"
import Veiculo from "../models/Veiculo.js"
import placaAleatoria from "../utils/placaAleatoria.js"

const veiculos = async (quant) => {
    await Veiculo.deleteMany()

    for (let i = 0; i < quant; i++) {
        const veiculo = {
            placa: placaAleatoria(),
            marca: faker.lorem.word() + " " + faker.lorem.word(),
            modelo: faker.lorem.word() + " " + faker.lorem.word(),
            ano: Math.floor(Math.random() * 2020) + 1990,
            renavan: `${Math.floor(Math.random() * 10)}`.repeat(11),
            vencimento_ipva: faker.date.future(),
        }

        await Veiculo.insertMany([veiculo])
    }

    console.log("Veiculos inseridos com sucesso!");
}

export default veiculos