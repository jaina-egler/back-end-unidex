import Controllers from "../common/Controllers.js";
import ManutencoesPreventivas from "../models/ManutencaoPreventiva.js";
import Veiculo from "../models/Veiculo.js";

class ManutencoesPreventivasController {
  static controllers = new Controllers(ManutencoesPreventivas, "Manutencões Preventiva",
    "Manutenções Preventivas",
    ["Oid_usuario", "Oid_veiculo"])

  static listarManutencoesPreventivas = async (req, res, next) => {
    const { pagina, limite } = req.query;

    const { data_inicial, data_final, veiculo, motorista, ativo } =
      req.query;

    const buscarAtivo = req.query.ativo !== undefined ? req.query.ativo : true;

    const filtros_veiculo = {}

    const erros = []

    if (veiculo)
      filtros_veiculo.placa = new RegExp(veiculo, 'i')

    const veiculos = await Veiculo.find(filtros_veiculo, { _id: true }).then(
      (res) => res.map((r) => r._id)
    );

    console.log(veiculos)
    console.log(filtros_veiculo)

    const filtros = {};

    if (data_inicial || data_final) {
      if (data_inicial && data_final && data_inicial > data_final)
        erros.push("A data inicial deve ser menor que a data final")

      filtros.data_manutencao = {}

      if (data_inicial)
        filtros.data_manutencao.$gte = new Date(data_inicial)

      if (data_final)
        filtros.data_manutencao.$lte = new Date(data_final)
    }

    if (motorista) filtros.Oid_motorista = motorista;

    filtros.ativo = buscarAtivo;

    if (veiculo) {
      if (veiculos > 0)
        filtros.Oid_veiculo = { $in: veiculos }
      
      else
        filtros.Oid_veiculo = { $nin: veiculos }
    };

    const options = {
      pagina: pagina,
      limite: parseInt(limite) > 10 ? 10 : parseInt(limite) || 3,
    };

    if (erros.length > 0) {
      res.status(400).send({
        codigo: 400,
        mensagem: "Não foi possível listar as manutenções preventivas",
        dados: erros
      })
    }

    else {
      await this.controllers.listar(filtros, options).then((resposta) => {
        res.status(resposta.codigo).send(resposta);
      });
    }
  };

  static cadastrarManutencaoPreventiva = async (req, res, next) => {
    await this.controllers.cadastrar(req.body)
      .then(resposta => {
        res.status(resposta.codigo).send(resposta)
      })
  }
  static listarManutencaoPreventivaPorId = async (req, res, next) => {

    await this.controllers.pegarPorId(req.params.id)
      .then(resposta => {
        res.status(resposta.codigo).send(resposta)
      })
  }
  static atualizarManutencaoPreventiva = async (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    await this.controllers.atualizar(req.params.id, req.body)
      .then(resposta => {
        res.status(resposta.codigo).send(resposta)
      })
  }
  static inativarManutencaoPreventiva = async (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    await this.controllers.deletar(req.params.id)
      .then(resposta => {
        res.status(resposta.codigo).send(resposta)
      })
  }
}

export default ManutencoesPreventivasController