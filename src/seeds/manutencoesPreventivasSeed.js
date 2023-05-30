import faker from "faker-br"
import mongoose from "mongoose"
import ManutencaoPreventiva from "../models/ManutencaoPreventiva.js"
import Veiculo from "../models/Veiculo.js"
import Pessoa from "../models/Pessoa.js"
import Produto from "../models/Produto.js"

const manutencoesPreventivas = async (quant) => {
    await ManutencaoPreventiva.deleteMany()

    const veiculos = []
    await Veiculo.find().then(res => {
        veiculos.push(...res)
    })

    const pessoas = []
    await Pessoa.find().then(res => {
        pessoas.push(...res)
    })

    const produtos = []
    await Produto.find().then(res => {
        produtos.push(...res)
    })

    const gerarProdutos = () => {
        const items = []
        let valor = 0;
        let i = Math.floor(Math.random() * 5) + 1

        for(; i > 0; i--){
            const produto = produtos.at(Math.floor(Math.random() * produtos.length))
            const preco = produto.valor
            const quantidade = Math.floor(Math.random() * 10) + 1

            items.push({
                id_produto: produto._id,
                nome_produto: produto.nome,
                preco_unitario: preco,
                quantidade: quantidade
            })
            valor += (preco * quantidade);
        }

        return {
            items,
            valor
        }
    }

    const gerarImagem = () => {
        const img = []

        for (let i = 1; i <= (Math.floor(Math.random() * 10)+ 1); i++){
            img.push("Imagem "+ i)
        }

        return img
    }

    for (let i = 0; i < quant; i++){
        const veiculo = veiculos[i]
        const pessoa = pessoas[i]

        const produtos = gerarProdutos()

        const manutencao = {
            data_criacao: faker.date.past(),
            km_necessario: Math.floor(Math.random() * 1000),
            id_veiculo: veiculo._id,
            placa_veiculo: veiculo.placa,
            id_usuario: pessoa._id,
            nome_usuario: pessoa.nome,
            valor_total: produtos.valor.toFixed(2),
            produtos: produtos.items,
            imagens: gerarImagem(),
            observacao: faker.lorem.paragraph(),
            ativo: faker.random.boolean()
        }

        await ManutencaoPreventiva.insertMany([manutencao])
    }

    console.log("Manutenções preventivas criadas com sucesso!");
}

export default manutencoesPreventivas