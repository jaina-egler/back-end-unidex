import Controllers from "../common/Controllers.js";
import Abastecimento from "../models/Abastecimento.js";
import Veiculo from "../models/Veiculo.js";

class AbastecimentosController {
  static controllers = new Controllers(
    Abastecimento,
    "Abastecimento",
    "Abastecimentos",
    ["Oid_motorista", "Oid_fornecedor", "Oid_veiculo"]
  );

  static cadastrarAbastecimento = async (req, res, next) => {
    await this.controllers.cadastrar(req.body).then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    });
  };

  static listarAbastecimentos = async (req, res, next) => {
    const { pagina, limite } = req.query;

    const {
      data_inicial,
      data_final,
      placa,
      motorista,
      fornecedor,
      ativo = "true",
    } = req.query;

    const filtros_veiculo = {};

    const erros = [];

    if (placa) filtros_veiculo.placa = new RegExp(placa, "i");

    const veiculos = await Veiculo.find(filtros_veiculo, { _id: true }).then(
      (res) => res.map((r) => r._id)
    );

    const filtros = {};

    if (data_inicial || data_final) {
      if (data_inicial && data_final && data_inicial > data_final)
        erros.push("A data inicial deve ser menor que a data final");

      filtros.data_abastecimento = {};

      if (data_inicial)
        filtros.data_abastecimento.$gte = new Date(data_inicial);

      if (data_final) filtros.data_abastecimento.$lte = new Date(data_final);
    }

    if (motorista) filtros.Oid_motorista = motorista;

    if (fornecedor) filtros.Oid_fornecedor = fornecedor;

    if (placa) {
      if (veiculos) filtros.Oid_veiculo = { $in: veiculos };
      else filtros.Oid_veiculo = { $nin: veiculos };
    }

    filtros.ativo = ativo

    const options = {
      pagina: pagina,
      limite: parseInt(limite) > 10 ? 10 : parseInt(limite) || 3,
    };

    if (erros.length > 0) {
      res.status(400).send({
        codigo: 400,
        mensagem: "Não foi possível listar os usuários",
        dados: erros,
      });
    } else {
      await this.controllers.listar(filtros, options).then((resposta) => {
        res.status(resposta.codigo).send(resposta);
      });
    }
  };

  static listarAbastecimentoPorId = async (req, res, next) => {
    await this.controllers.pegarPorId(req.params.id).then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    });
  };

  static atualizarAbastecimento = async (req, res, next) => {
    await this.controllers
      .atualizar(req.params.id, req.body)
      .then((resposta) => {
        res.status(resposta.codigo).send(resposta);
      });
  };

  static excluirAbastecimento = async (req, res, next) => {
    await this.controllers.deletar(req.params.id).then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    });
  };
}

export default AbastecimentosController;
