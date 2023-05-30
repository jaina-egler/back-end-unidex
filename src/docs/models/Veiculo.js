const Veiculo = {
    type: 'object',
    example: {
        placa: "ABC1234",
        marca: "Volvo",
        modelo: "FH 540",
        ano: "2022",
        renavan: "12345678910",
        vencimento_ipva: "2024-04-20"
    },
    properties: {
        placa: { type: "string" },
        marca: { type: "string" },
        modelo: { type: "string" },
        ano: { type: "string" },
        renavam: { type: "string" },
        vencimento_ipva: { type: "Date" }
    }
}

export default Veiculo