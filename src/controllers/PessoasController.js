import Pessoas from '../models/Pessoa.js';
import Controllers from '../common/Controllers.js';

class PessoasController {
  static controllers = new Controllers(Pessoas, 'Pessoa', 'Pessoas', []);

  static listar = async (req, res) => {
    const { pagina, limite } = req.query;
    const { nome, email, cpf, cnh } = req.query;

    const opcoes = {
      pagina,
      limite,
    };

    const filtros = {};

    if (nome) {
      filtros.nome = new RegExp(nome, 'i');
    }

    if (email) {
      filtros.email = new RegExp(email, 'i');
    }

    if (cpf) {
      filtros.cpf = new RegExp(cpf, 'd');
    }

    if (cnh) {
      filtros['cnh.numero'] = new RegExp(cnh, 'd');
    }

    await this.controllers.listar(filtros, opcoes).then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    });
  };

  static pegarPorId = async (req, res) => {
    await this.controllers.pegarPorId(req.params.id).then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    });
  };

  static cadastrar = async (req, res) => {
    await this.controllers.cadastrar(req.body).then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    });
  };

  static atualizar = async (req, res) => {
    await this.controllers
      .atualizar(req.params.id, req.body)
      .then((resposta) => {
        res.status(resposta.codigo).send(resposta);
      });
  };

  static deletar = async (req, res, next) => {
    await this.controllers.deletar(req.params.id).then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    });
  };
}

export default PessoasController;
