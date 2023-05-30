import Produto from "../models/Produto.js";
import Controllers from "../common/Controllers.js";
import Fornecedor from "../models/Fornecedor.js";
class ProdutoController {

  static controllers = new Controllers(
    Produto,
    "Produto",
    "Produtos",
    ["fornecedor_combinado.Oid_fornecedor"]);
  // Listar manutencoes pre. todos as manutencoes pre. || por datas || fornecedor || nome || motorista 
  static listarProdutos = async (req, res, next) => {
    // campos de acordo com os filtros
    const nome = req.query.nome;
    const marca = req.query.marca;
    const page = req.query.page;
    const fornecedor = req.query.fornecedor
    let perPage = req.query.perPage;
    const ativo = req.query.ativo !== undefined ? req.query.ativo : true;

    const options = { // limitar a quantidade máxima por requisição
      pagina: parseInt(page) || 1,
      limite: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
    }

    const filtros_fornecedor = {}

    if (fornecedor) {
      filtros_fornecedor.nome_fantasia = new RegExp(fornecedor, 'i');

    }
    const fornecedores = await Fornecedor.find(filtros_fornecedor).then(resposta =>
      resposta.map(r =>
        r._id)
    );

    console.log(fornecedores)

    const filtros = {}

    if (nome) {
      filtros.nome = new RegExp(nome, 'i');
    }
    if (marca) {
      filtros.marca = new RegExp(marca, 'i');
    }

    if (fornecedores.length > 0) {
      filtros['fornecedor_combinado.Oid_fornecedor'] = { $in: fornecedores }
    }

    await this.controllers.listar(filtros, options).then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    });
  }

  // GET - Método para listar uma produto por id
  static listarProdutoPorId = async (req, res, next) => {
    // verificar pemissão para para fazer GET na rota /manutencoes_preventivas 
    await this.controllers.pegarPorId(req.params.id)
      .then(resposta => {
        res.status(resposta.codigo).send(resposta)
      })

  }

  // atualizar produto por _id (update)
  static atualizarProduto = async (req, res, next) => {

    await this.controllers.atualizar(req.params.id, req.body)
      .then(resposta => {
        res.status(resposta.codigo).send(resposta)
      })

  };

  // Criar produto POST
  static cadastrarProduto = async (req, res, next) => {
    await this.controllers.cadastrar(req.body)
      .then(resposta => {
        res.status(resposta.codigo).send(resposta)
      })

  }
  static deletarProduto = async (req, res, next) => {
    await this.controllers.deletar(req.params.id)
      .then(resposta => {
        res.status(resposta.codigo).send(resposta)
      })
  };

}
export default ProdutoController;
