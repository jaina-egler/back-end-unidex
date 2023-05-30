import faker from "faker-br"
import Fornecedor from "../models/Fornecedor.js"
import Produtos from "../models/Produto.js"

const produtos = async (quant) => {
    await Produtos.deleteMany()

    const fornecedores = []
    await Fornecedor.find().then(res => {
        fornecedores.push(...res)
    })

    for (let i = 0; i < quant; i++){
        const fornecedor = fornecedores.at(Math.floor(Math.random() * fornecedores.length))

        const produto = {
            nome: faker.lorem.word() + " " + faker.lorem.word(),
            marca: faker.lorem.word() + " " + faker.lorem.word(),
            descricao: faker.lorem.sentence(),
            fornecedor_combinado: {
                Oid_fornecedor: fornecedor._id,
                valor_combinado: ((Math.random() * 100) + 10).toFixed(2)
            },
            valor: ((Math.random() * 100) + 10).toFixed(2),
            ativo: faker.random.boolean()
        }
        await Produtos.insertMany([produto])
    }

    console.log("Produtos inseridos com sucesso!");
}

export default produtos