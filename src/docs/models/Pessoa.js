import mongoose from "mongoose"

const Pessoa = {
    type: "object",
    example: {
        nome: "Guliver da Silva",
        email: "guliver@gmail.com",
        senha: "12345678",
        ativo: true,
        data_nascimento: "1990-01-01",
        cpf: "12345678900",
        rg: "123456789",
        endereco: {
            cep: "12345-678",
            logradouro: "Rua dos Bobos",
            numero: "0",
            bairro: "Bairro dos Bobos",
            cidade: "Cidade dos Bobos",
            estado: "RO",
            complemento: "Complemento dos Bobos",
        },
        cnh: {
            numero: "1234567890",
            categoria: "AE",
            vencimento: "2025-01-01",
        },
        fotoPessoa: "http://localhost:3030/fotos/guliver.jpg",
        nivel: 1,
        telefone: "(11) 12345-6789",
        observacao: "Observação do usuário",
        ativo: true,
    },
    properties: {
        type: "object",
        properties: {
            _id: {
                type: "string",
                description: "ID do usuário",
            },
            nome: {
                type: "string",
                description: "Nome do usuário",
            },
            email: {
                type: "string",
                description: "E-mail do usuário",
            },
            senha: {
                type: "string",
                description: "Senha do usuário",
            },
            ativo: {
                type: "boolean",
                description: "Usuário ativo",
            },
            data_nascimento: {
                type: "Date",
                description: "Data de nascimento do usuário",
            },
            cpf: {
                type: "string",
                description: "CPF do usuário",
            },
            rg: {
                type: "string",
                description: "RG do usuário",
            },
            endereco: {
                type: "object",
                properties: {
                    cep: {
                        type: "string",
                        description: "CEP do usuário",
                    },
                    logradouro: {
                        type: "string",
                        description: "Logradouro do usuário",
                    },
                    numero: {
                        type: "string",
                        description: "Número do endereço do usuário",
                    },
                    bairro: {
                        type: "string",
                        description: "Bairro do usuário",
                    },
                    cidade: {
                        type: "string",
                        description: "Cidade do usuário",
                    },
                    estado: {
                        type: "string",
                        description: "Estado do usuário",
                    },
                    complemento: {
                        type: "string",
                        description: "Complemento do endereço do usuário",
                    },
                },
                cnh: {
                    type: "object",
                    properties: {
                        numero: {
                            type: "string",
                            description: "Número da CNH do usuário",
                        },
                        categoria: {
                            type: "string",
                            description: "Categoria da CNH do usuário",
                        },
                        vencimento: {
                            type: "Date",
                            description: "Data de vencimento da CNH do usuário",
                        },
                    },
                    fotoPessoa: {
                        type: "string",
                        description: "Caminho da foto do usuário",
                    },
                    nivel: {
                        type: "number",
                        description: "Nível 'de acesso do usuário",
                    },
                    telefone: {
                        type: "string",
                        description: "Telefone do usuário",
                    },
                    observacao: {
                        type: "string",
                        description: "Observação do usuário",
                    },
                    ativo: {
                        type: "boolean",
                        description: "Usuário ativo",
                    },
                },
            },
        },
    },
}

export default Pessoa