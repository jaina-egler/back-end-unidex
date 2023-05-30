import faker from "faker-br"
import Veiculo from "../models/Veiculo.js"
import Checklist from "../models/Checklist.js"
import Pessoa from "../models/Pessoa.js";
import mongoose from "mongoose";

const checklist = async (quant) => {
    await Checklist.deleteMany();

    const veiculos = []
    await Veiculo.find().then(res => {
        veiculos.push(...res)
    })

    const pessoas = []
    await Pessoa.find().then(res => {
        pessoas.push(...res)
    })

    const gerarImagem = () => {
        const img = []

        for (let i = 1; i <= (Math.floor(Math.random() * 10) + 1); i++) {
            img.push("Imagem " + i)
        }

        return img
    }

    for (let i = 0; i < quant; i++) {
        const veiculo = veiculos.at(Math.floor(Math.random() * veiculos.length))
        const pessoa = pessoas.at(Math.floor(Math.random() * pessoas.length))

        const cl = {
            data_verificacao: faker.date.past(),
            Oid_veiculo:  veiculo._id,
            Oid_motorista:  pessoa._id,
            ativo: faker.random.boolean(),
            veiculo_lavado: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            lataria_amassada: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
                fotos: gerarImagem()
            },
            riscados_pintura: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
                fotos: gerarImagem()
            },
            bau_bom_estado: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
                fotos: gerarImagem()
            },
            faixas_refletivas_bom_estado: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
                fotos: gerarImagem()
            },
            farol_funcionando: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            luz_alta_funcionando: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            meia_luz_funcionando: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            setas_funcionando: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            lanternas_laterias_funcionando: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            lanterna_traseira_funcionando: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            luz_freio_funcionando: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            pneus_calibrados: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            pneus_carecas: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
                fotos: gerarImagem(),
            },
            pneu_estepe_calibrado: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            troca_oleo_em_dia: {
                resposta: faker.random.boolean(),
            },
            agua_radiador_conferida: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            macaco_em_bom_estado: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            triangulo_de_sinalização_em_bom_estado: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            chave_de_roda_e_cabo_de_força: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            veiculo_lubrificado: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            freios_regulados: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            documento_obrigatorio_em_dia: {
                resposta: faker.random.boolean(),
            },
            manual_do_veiculo_em_bom_estado: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            habitacao_do_condutor_em_dia: {
                resposta: faker.random.boolean(),
            },
            cartao_ANTT_em_dia: {
                resposta: faker.random.boolean(),
            },
            adesivo_ANTT_em_bom_estado: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            pintura_tara_em_bom_estado: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            tacografo_funcionando_e_em_bom_estado: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            disco_de_tacografo_substituido: {
                resposta: faker.random.boolean(),
                obs: faker.lorem.paragraph(),
            },
            certificado_de_aferição_em_dia: {
                resposta: faker.random.boolean(),
            }
        }

        await Checklist.insertMany([cl])
    }

    console.log("Checklist inseridos com sucesso!");
}

export default checklist