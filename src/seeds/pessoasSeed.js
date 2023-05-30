import faker from "faker-br"
import Pessoa from "../models/Pessoa.js"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"
import validation from "../utils/validation.js"

const pessoas = async (quant) => {

    await Pessoa.deleteMany()

    for (let i = 0; i < quant; i++){
        const nome = faker.name.firstName() + " " + faker.name.lastName()
        const pessoa = {
            senha: bcrypt.hashSync("12345678", 8),
            nome: nome,
            cpf: faker.br.cpf(),
            rg: faker.br.rg(),
            data_nascimento: faker.date.past(),
            endereco: {
                logradouro: faker.address.streetName(),
                numero: Math.floor(Math.random() * 10000) + 1,
                cep: '76982-136',
                bairro: faker.address.county(),
                cidade: faker.address.city(),
                estado: 'RO',
                complemento: faker.address.secondaryAddress(),
            },
            cnh: {
                numero: validation.gerarCNH(),
                categoria: (Math.random() > 0.5 ? "A" : "") +["B", "C", "D", "E"].at(Math.floor(Math.random() * 4)),
                vencimento: faker.date.future()
            },
            foto_pessoa: ".jpg",
            nivel: Math.floor(Math.random() * 5) + 1,
            telefone: faker.phone.phoneNumber(),
            observacao: "",
            ativo: true,
            email: nome.replace(" ", "").normalize("NFD").toLowerCase() + (Math.floor(Math.random() * 99) + 1) + "@" + (["email.com", "gmail.com", "outlook.com", "hotmail.com"].at(Math.floor(Math.random() * 4)))
        }
        await Pessoa.insertMany([pessoa])
    }
    
    console.log("Pessoas seed executado com sucesso!");
}

export default pessoas