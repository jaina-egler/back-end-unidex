import faker from "faker-br"
import Fornecedor from "../models/Fornecedor.js"

const fornecedores = async (quant) => {
    await Fornecedor.deleteMany()
    
    for (let i = 0; i < quant; i++){
        const nome = faker.company.companyName()
        
        const fornecedor = {
            razao_social: nome,
            nome_fantasia: nome,
            telefone: faker.phone.phoneNumber(),
            email: nome.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_- ]/g, '').normalize("NFD").toLowerCase() + (Math.floor(Math.random() * 99) + 1) + "@" + (["email.com", "gmail.com", "outlook.com", "hotmail.com"].at(Math.floor(Math.random() * 4))),
            observacoes: "",
            endereco: {
                logradouro: faker.address.streetName(),
                numero: Math.floor(Math.random() * 10000) + 1,
                cep: faker.address.zipCode(),
                bairro: faker.address.county(),
                cidade: faker.address.city(),
                estado: faker.address.state(),
                pais: 'RO',
            }
        }

        await Fornecedor.insertMany([fornecedor])
    }

    console.log("Fornecedores seed executado com sucesso!");
}

export default fornecedores