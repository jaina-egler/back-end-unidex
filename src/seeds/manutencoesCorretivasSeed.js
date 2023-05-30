import faker from "faker-br"
import mongoose from "mongoose"
import ManutencaoCorretiva from "../models/ManutencaoCorretiva.js"
import Veiculo from "../models/Veiculo.js"
import Pessoa from "../models/Pessoa.js"

const manutencoesCorretivas = async (quant) => {
    await ManutencaoCorretiva.deleteMany()

    const veiculos = []
    const pessoas = []

    await Veiculo.find().then(res => {
        veiculos.push(...res)
    })

    await Pessoa.find().then(res => {
        pessoas.push(...res)
    })

    for (let i = 0; i < quant; i++) {
        const veiculo = veiculos.at(Math.floor(Math.random() * veiculos.length))
        const pessoa = pessoas.at(Math.floor(Math.random() * pessoas.length))

        const manutencao = {
            data_criacao: faker.date.past(),
            data_manutencao: faker.date.past(),
            Oid_veiculo: veiculo._id,
            Oid_motorista: pessoa._id,
            valor_total: ((Math.random() * 10000) + 200).toFixed(2),
            km_atual: Math.floor(Math.random() * 20000),
            tipo_manutencao: ['Funilaria e Pintura','Manutenção Mecânica','Suspensão','Pneus','Elétrica','Outros'].at(Math.floor(Math.random() * 6)),
            nota_fiscal: ".jpg",
            imagens: [
                ".jpg"
            ],
            localizacao: `${faker.address.latitude()} ${faker.address.longitude()}`,
            observacao: faker.lorem.paragraph(),
            ativo: faker.random.boolean()
        }

        await ManutencaoCorretiva.insertMany([manutencao])
    }

    console.log("Manutenções corretivas inseridas com sucesso!");
}

export default manutencoesCorretivas