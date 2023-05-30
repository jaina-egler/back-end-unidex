import Controllers from "../common/Controllers.js";
import Pessoa from "../models/Pessoa.js";

class ControllersTeste {
    static controllers = new Controllers(Pessoa, "Pessoa", "Pessoas")

    static listar = async (req, res) => {
        const { pagina, limite } = req.query
        const { nome, cpf, logradouro, data_inicial, data_final } = req.query

        const opcoes = {
            pagina,
            limite
        }

        const filtros = {}

        if (nome)
            filtros.nome = new RegExp(nome, 'i')

        if (cpf)
            filtros.cpf = new RegExp(cpf, 'i')

        if (logradouro)
            filtros["endereco.logradouro"] = new RegExp(logradouro, 'i')


        if (data_inicial) {
            filtros.data_nascimento = filtros.data_nascimento ? { ...filtros.data_nascimento, $gte: data_inicial } : { $gte: data_inicial }
        }

        if (data_final) {
            filtros.data_nascimento = filtros.data_nascimento ? { ...filtros.data_nascimento, $lte: data_final } : { $lte: data_final }
        }

        if (data_inicial > data_final)
            res.status(400).send({ codigo: 400, mensagem: "A data inicial deve ser menor que a data final" })

        else
            await this.controllers.listar(filtros, opcoes)
                .then(resposta => {
                    res.status(resposta.codigo).send(resposta)
                })
    }
    async cadastrar(req, res) {
        await this.controllers.cadastrar(req.body)
            .then(resposta => {
                res.status(resposta.codigo).send(resposta)
            })
    }
    async pegarPorId(req, res) {
        await this.controllers.pegarPorId(req.params.id)
            .then(resposta => {
                res.status(resposta.codigo).send(resposta)
            })
    }
    async atualizar(req, res) {
        await this.controllers.atualizar(req.params.id, req.body)
            .then(resposta => {
                res.status(resposta.codigo).send(resposta)
            })
    }
    async deletar(req, res) {
        await this.controllers.deletar(req.params.id)
            .then(resposta => {
                res.status(resposta.codigo).send(resposta)
            })
    }
}

export default ControllersTeste