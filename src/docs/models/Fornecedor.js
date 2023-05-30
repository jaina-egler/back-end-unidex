const Fornecedor = {
    type: "object",
    example: {
        razao_social: "Posto Impiritu",
        nome_fantasia: "Posto Impiritu",
        telefone: "99999999999",
        email: "postoimpiritu@gmail.com",
        observacoes: "",
        endereco: {
            logradouro: "Avenida Oliveira",
            numero: "0",
            bairro: "Imbuí",
            cidade: "São Paulo",
            estado: "São Paulo",
            pais: "Brasil",
            cep: "00000000"
        }
    },
    properties: {
        razao_social: { type: "string" },
        nome_fantasia: { type: "string" },
        telefone: { type: "string" },
        email: { type: "string" },
        observacoes: { type: "string" },
        endereco: {
            type: "object",
            properties: {
                logradouro: {type: "string"},
                numero: {type: "string"},
                bairro: {type: "string"},
                cidade: {type: "string"},
                estado: {type: "string"},
                pais: {type: "string"},
                cep: {type: "string"}
            }
        }
    }
}

export default Fornecedor