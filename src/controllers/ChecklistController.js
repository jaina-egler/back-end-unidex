import Checklist from "../models/Checklist.js";
class ChecklistController {

  static listarChecklist = async (req, res, next) => {

    // campos de acordo com os filtros

    const idVeiculo = req.query.veiculo;
    const idMotorista = req.query.motorista;
    const dataInicial = req.query.dataInicial;
    const dataFinal = req.query.dataFinal;
    let query = {};

    if (idVeiculo) {
      query.Oid_veiculo = idVeiculo;
    }
    if (idMotorista) {
      query.Oid_motorista = idMotorista;
    }
    if (dataInicial || dataFinal) {
      query.data_verificacao = {};
      if (dataInicial) {
        query.data_verificacao.$gte = dataInicial;
      }
      if (dataFinal) {
        query.data_verificacao.$lte = dataFinal;
      }
    }
    const page = req.query.page;
    let perPage = req.query.perPage;
    const ativo = req.query.ativo ? req.query.ativo : true;
    const options = { // limitar a quantidade máxima por requisição
      page: parseInt(page) || 1,
      limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
      populate: [
        {
          path: "Oid_veiculo",
        },
        {
          path: "Oid_motorista",
        },
      ],
      ativo: ativo
    }
    const checklist = await Checklist.paginate(query, options);

    if (checklist) {

      return res.json(checklist);
    } else {
      return res.status(404).json({ message: 'Checklist não encontrado' });
    }
  }

  // Cadastrar checkList POST
  static cadastrarCheckList = async (req, res, next) => {
    try {
      let checkList = new Checklist(req.body);
      checkList.save((err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: true, code: 500, message: "Erro nos dados, confira e repita" })
        } else {
          res.status(201).send(checkList.toJSON())
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static listarChecklistPorId = async (req, res, next) => {
    const id = req.params.id;
    Checklist.findById(id).populate('veiculo').exec((err, checkList) => {
      if (checkList) {
        res.status(200).send(checkList);
        console.log(checkList.veiculo.placa)
      } else {
        res.status(400).send({ message: 'Erro ao localizar o checklist!' });
      }
    });
  }

  static atualizarChecklist = async (req, res, next) => {
    try {
      const id = req.params.id;
      const novoChecklist = req.body;

      const checklistAtualizado = await Checklist.findByIdAndUpdate(id, novoChecklist, { new: true });
      res.json(checklistAtualizado);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar checkList!' });
    }
  }

  static inativarChecklist = async (req, res, next) => {
    try {
      const id = req.params.id;
      const atualizacao = req.body;

      const checkList = await Checklist.findByIdAndUpdate(id, atualizacao, { new: false });
      res.json(checkList);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Erro ao inativar manutenção' });
    }
  }
  static excluirChecklist = async (req, res, next) => {
    try {
      const id = req.params.id;

      const checkList = await Checklist.findByIdAndDelete(id);
      res.json({ message: "Checklist excluído com sucesso." });

    } catch (err) {
      console.log(err)
      res.status(500).json({ "message": 'Erro ao excluir checklist' });
    }
  }
}

export default ChecklistController;