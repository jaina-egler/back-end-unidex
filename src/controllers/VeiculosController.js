import Controllers from "../common/Controllers.js";
import Veiculos from "../models/Veiculo.js";

class VeiculosController {
  static controllers = new Controllers(
    Veiculos,
    "Veiculo",
    "Veiculos",
    []);

  static listarVeiculos = async (req, res, next) => {

    const placa = req.query.placa;
    const marca = req.query.marca;
    const modelo = req.query.modelo;
    const ano = req.query.ano;
    const renavan = req.query.renavan;
    const { data_inicial, data_final } = req.query;

    const ativo = req.query.ativo !== undefined ? req.query.ativo : true;
    const { page, perPage } = req.query;
    const options = {
      pagina: parseInt(page) || 1,
      limite: parseInt(perPage) || 10
    };

    //verifica se é passado algum parâmetro de filtro 
    const filtros = {};

    if (placa) 
      filtros.placa = new RegExp(placa, 'i');
    

    if (marca) 
      filtros.marca = new RegExp(marca, 'i');
    

    if (modelo) 
      filtros.modelo = new RegExp(modelo, 'i');
    

    if (ano) 
      filtros.ano = ano;
    

    if (renavan)
      filtros.renavan = new RegExp(renavan, 'i');
    

    //verifica se a data inicial é menor que a final
    if (data_inicial)
      filtros.vencimento_ipva = filtros.vencimento_ipva
        ? { ...filtros.vencimento_ipva, $gte: new Date(data_inicial) }
        : { $gte: new Date(data_inicial) };

    //verifica se a data final é maior que a inicial
    if (data_final)
      filtros.vencimento_ipva = filtros.vencimento_ipva
        ? { ...filtros.vencimento_ipva, $lte: new Date(data_final) }
        : { $lte: new Date(data_final) };

    if (data_inicial && data_final && data_final < data_inicial) {
      res.status(400).send({ codigo: 400, mensagem: "Data inicial deve ser menor que a data final" })
    }


    await this.controllers
      .listar(filtros, options)
      .then(resposta => res.status(resposta.codigo).send(resposta))
  };

  static listarVeiculoPorId = async (req, res, next) => {
    await this.controllers
      .pegarPorId(req.params.id)
      .then((resposta) => {
        res.status(resposta.codigo).send(resposta)
      }) 
  };

  static cadastrarVeiculo = async (req, res, next) => {

    //verificar se placa já existe
    const erros = []

    if (req.body.placa) {
      const placaExist = await Veiculos.find({ "placa": { $eq: req.body.placa } });

      if (placaExist[0]) {
        erros.push({ message: "Placa já cadastrada" })
      }

    }

    if (erros.length > 0) {
      res.status(400).send({ codigo: 400, mensagem: "Não foi possível cadastrar o veículo", dados: erros });
    } else
      await this.controllers
      .cadastrar(req.body)
      .then((resposta) => {
        res.status(resposta.codigo).send(resposta);
      });
  };

  static atualizarVeiculo = async (req, res, next) => {
    await this.controllers
    .atualizar(req.params.id, req.body)
    .then((resposta) => {
      res.status(resposta.codigo).send(resposta);
    })


  };

  static excluirVeiculo = async (req, res, next) => {
    await this.controllers
    .deletar(req.params.id)
    .then((resposta) => {
      res.status(resposta.codigo).send(resposta)
    })
  };
}

export default VeiculosController;

