import ManutencaoCorretiva from "../models/ManutencaoCorretiva.js";
import Veiculos from "../models/Veiculo.js";
import Pessoa from "../models/Pessoa.js";

class ManutencoesCorretivasController {
  static filteringManutencoesCorretivas = async (req, res, next) => {
    const DTCriacao = req.query.dtcriacao;
    const DTManutencao = req.query.dtmanutencao;
    const placa = req.query.placa;
    const motorista = req.query.motorista;
    const perPage = req.query.perPage;
    const page = req.query.page;
    const ativo = req.query.ativo !== undefined ? req.query.ativo : true;

    let veiculos;
    let motoristaa;
    try {
      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
        ativo: ativo,
        populate: ["Oid_veiculo", "Oid_motorista"],
      };

      const filtros_veiculo = {};
      const filtros_motoristas = {};

      if (placa) filtros_veiculo.placa = new RegExp(placa, "i");

      if (motorista) filtros_motoristas.nome = new RegExp(motorista, "i");

      if (placa) {
        veiculos = await Veiculos.find(filtros_veiculo, { _id: true }).then(
          (res) => res.map((r) => r._id)
        );
      }

      if (motorista) {
        motoristaa = await Pessoa.find(filtros_motoristas, {
          _id: true,
        }).then((res) => {
          return res.map((r) => r._id);
        });
      }

      const filtros = {};

      if (DTCriacao) filtros.DTCriacao = DTCriacao;

      if (DTManutencao) filtros.DTManutencao = DTManutencao;

      if (veiculos && veiculos.length > 0)
        filtros.Oid_veiculo = { $in: veiculos };
      if (motoristaa && motoristaa.length > 0)
        filtros.Oid_motorista = { $in: motoristaa };

      // total docs
      const documentosTotais = await ManutencaoCorretiva.count(filtros).then(
        (res) => res
      );
      const totalPaginas = Math.floor(documentosTotais / options.limit) + 1;

      const response = await ManutencaoCorretiva.find(filtros)
        .populate(options.populate)
        .skip(options.limit * (options.page - 1))
        .limit(options.limit)
        .then((res) => {
          const codigo = 200;
          let mensagem = `Não foram encontrados ${this.nome_verboso_plural}!`;

          if (res.length > 0) {
            mensagem = `${this.nome_verboso_plural} encontrado(a)s com sucesso!`;
          }

          return {
            codigo,
            mensagem,
            dados: {
              documentos: res,
              pagina: options.page,
              "por-pagina": options.limit,
              "paginas-totais": totalPaginas,
              "documentos-totais": documentosTotais,
            },
          };
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });

      return res.send(response.dados);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: err });
    }
  };

  // Listar manutencoes pre. todos as manutencoes pre. || por datas || fornecedor || veiculo || motorista
  static listarManutencoesCorretivas = async (req, res, next) => {
    try {
      // campos de acordo com os filtros
      const veiculo = req.query.veiculo;
      const page = req.query.page;
      let perPage = req.query.perPage;
      const ativo = req.query.ativo !== undefined ? req.query.ativo : true;

      const options = {
        // limitar a quantidade máxima por requisição
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
        ativo: ativo,
        populate: ["Oid_veiculo", "Oid_motorista"],
      };

      if (!veiculo) {
        const manutencaoCorretiva = await ManutencaoCorretiva.paginate(
          {},
          options
        );
        return res.json(manutencaoCorretiva);
      } else {
        const manutencaoCorretiva = await ManutencaoCorretiva.paginate(
          { placaVeiculo: new RegExp(veiculo, "i") },
          options
        );
        return res.json(manutencaoCorretiva);
      }
    } catch (err) {
      next(err);
    }
  };

  // GET - Método para listar uma manutenção preventiva por id
  static listarManutencaoCorretivaPorId = async (req, res, next) => {
    // verificar pemissão para para fazer GET na rota /manutencoes_preventivas
    try {
      // parametros para PemissaoMidleware.verificarPermissao (ROTA, METODO, req, res, next, CALLBACK)
      // retorno da busca desejada
      const id = req.params.id;
      ManutencaoCorretiva.findById(id)
        .populate(["Oid_motorista", "Oid_veiculo"])
        .exec((err, ManutencaoCorretiva) => {
          if (err) {
            return res
              .status(400)
              .json({ error: true, code: 400, message: "ID inválido" });
          }
          if (!ManutencaoCorretiva) {
            return res.status(404).json({
              code: 404,
              message: "Manutenção corretiva não encontrada",
            });
          } else {
            return res.status(200).send(ManutencaoCorretiva);
          }
        });
    } catch (err) {
      // console.error(err);
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  };

  // atualizar manutenção preventiva por _id (update)
  static atualizarManutencaoCorretiva = async (req, res, next) => {
    try {
      const id = req.params.id;
      const novaManutencaoCorretiva = req.body;

      const manutencaoAtualizada = await ManutencaoCorretiva.findByIdAndUpdate(
        id,
        novaManutencaoCorretiva,
        { new: true }
      );
      res.json(manutencaoAtualizada);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  };

  // Criar manutenção preventiva POST
  static cadastrarManutencaoCorretiva = async (req, res, next) => {
    try {
      let manutencaoCorretiva = new ManutencaoCorretiva(req.body);
      await manutencaoCorretiva.save((err) => {
        if (err) {
          return res.status(500).json({
            error: true,
            code: 500,
            message: "Erro nos dados, confira e repita a operação",
            erroAPi: err,
          });
        }
        Veiculos.findByIdAndUpdate(
          req.body.Oid_veiculo,
          { km_atual: req.body.km_atual },
          async (err, veiculo) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                error: true,
                code: 500,
                message: "Erro interno do Servidor",
                erroAPi: err,
              });
            }
          }
        );
        // send after all the process of update the vehicle
        res.status(201).send(manutencaoCorretiva.toJSON());
      });
    } catch (err) {
      next(err);
    }
  };

  static inativarManutencaoCorretiva = async (req, res, next) => {
    try {
      const id = req.params.id;
      const atualizacao = req.body;

      const manutencaoCorretiva = await ManutencaoCorretiva.findByIdAndUpdate(
        id,
        atualizacao,
        { new: false }
      );
      res.json(manutencaoCorretiva);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  };
}
export default ManutencoesCorretivasController;
