
import Controllers from "../common/Controllers.js";
import Fornecedor from "../models/Fornecedor.js";

class FornecedoresController {

  static controllers = new Controllers(Fornecedor, "Fornecedor", "Fornecedores", [])

  static listarFornecedorPorId = async (req, res, next) => {
    await this.controllers.pegarPorId(req.params.id).then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    });
  }

  static cadastrarFornecedor = async (req, res, next) => {
    await this.controllers.cadastrar(req.body).then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    });
  }

  static listarFornecedor = async (req, res, next) => {
    const { pagina, limite } = req.query;

    const { nome, logradouro, cidade, email, telefone } = req.query;

    const filtros = {};


    if(nome){
      filtros.nome_fantasia = new RegExp(nome, 'i')
    }

    if(logradouro){
      filtros['endereco.logradouro'] = new RegExp(logradouro, 'i')
    }

    if(cidade){
      filtros['endereco.cidade'] = new RegExp(cidade, 'i')
    }

    if(email){
      filtros.email = new RegExp(email, 'i')
    }

    if(telefone){
      filtros.telefone = new RegExp(telefone, 'i')
    }

    const options = {
      pagina: pagina,
      limite: parseInt(limite) > 10 ? 10 : parseInt(limite) || 3,
    };

    await this.controllers.listar(filtros, options).then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    });
  }
  static atualizarFornecedor = async (req, res, next) => {
    await this.controllers
    .atualizar(req.params.id, req.body)
    .then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    });
  }

  static excluirFornecedor = async (req, res, next) => {
    await this.controllers.deletar(req.params.id).then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    });
  }
}


export default FornecedoresController;