import mongoose, { mongo } from "mongoose";

/** 
 * Instancia um objeto para o uso de controllers padrão 
 * @constructor
 * @param {mongoose.Model} model: Modelo do mongoose para realizar as operações
 * @param {string} nome_verboso_singular: Nome de exibição no singular
 * @param {string} nome_verboso_plural: Nome de exibição no plural
 * @param {string[]} populate: Array com os campos que serão populados
 * */

class Controllers {
  constructor(model, nome_verboso_singular, nome_verboso_plural, populate) {
    this.model = model;
    this.nome_verboso_singular = nome_verboso_singular;
    this.nome_verboso_plural = nome_verboso_plural;
    this.populate = populate;
  }

  /**
   * Cadastra um novo documento
   * @param {object} dados: Objeto a ser cadastrado
  */
  async cadastrar(dados) {
    try {
      const instancia = new this.model(dados);

      const resposta = await instancia
        .save()
        .then((res) => {
          return {
            codigo: 201,
            mensagem: `${this.nome_verboso_singular} cadastrado(a) com sucesso!`,
            dados: res,
          };
        })
        .catch((err) => {
          const erro = err._message;
          let mensagem = `Não foi possivel cadastrar o(a) ${this.nome_verboso_singular}`;
          let codigo = 500;

          if (erro.includes("validation failed")) {
            codigo = 403;
            mensagem = `${this.nome_verboso_singular} inválido, verifique os dados e tente novamente!`;
          }

          return {
            codigo: codigo,
            mensagem: mensagem,
            dados: err.toJSON(),
          };
        });
      return resposta;
    } catch (err) {
      return {
        codigo: 500,
        mensagem: `Não foi possivel cadastrar o(a) ${this.nome_verboso_singular}`,
        dados: err,
      };
    }
  }

  /**
   * Lista os documentos
   * @param {object} filtros: Objeto com os filtros
   * @param {object} opcoes: Objeto com as opções de paginação (limite e pagina) 
   */
  async listar(filtros, opcoes) {
    try {
      const model = this.model;
      const pagina = parseInt(opcoes.pagina) || 1;
      const limite = opcoes.limite;
      const documentosTotais = await model.count(filtros).then((res) => res);
      const totalPaginas = Math.floor(documentosTotais / limite);

      const resposta = await model
        .find(filtros)
        .populate(this.populate)
        .skip(limite * (pagina - 1))
        .limit(limite)
        .then((res) => {
          const codigo = 200
          let mensagem = `Não foram encontrados ${this.nome_verboso_plural}!`;

          if (res.length > 0) {
            mensagem = `${this.nome_verboso_plural} encontrado(a)s com sucesso!`
          }

          return {
            codigo,
            mensagem,
            dados: {
              documentos: res,
              pagina: pagina,
              "por-pagina": limite,
              "paginas-totais": totalPaginas,
              "documentos-totais": documentosTotais,
            },
          };
        })

        .catch((err) => {
          let codigo = 500;
          let mensagem = `Não foi possível listar ${this.nome_verboso_plural}!`;
          console.log(err)

          return {
            codigo,
            mensagem,
            dados: err.toJSON(),
          };
        });

      return resposta;
    } catch (err) {
      let codigo = 500;
      let mensagem = `Não foi possível listar ${this.nome_verboso_plural}!`;

      return {
        codigo,
        mensagem,
        dados: err,
      };
    }
  }

  /**
   * Pega um único documento
   * @param {mongoose.Types.ObjectId} id: Id para requisição
   */
  async pegarPorId(id) {
    try {
      const model = this.model;

      const resposta = await model
        .findById(id)
        .populate(this.populate)
        .then((res) => {
          let codigo = 404;
          let mensagem = `${this.nome_verboso_singular} não encontrado(a)!`;

          if (res) {
            codigo = 200;
            mensagem = `${this.nome_verboso_singular} encontrado(a) com sucesso!`;
          }

          return {
            codigo,
            mensagem,
            dados: res,
          };
        })
        .catch((err) => {
          const kind = err.kind;

          let mensagem = `Não foi possível encontrar o ${this.nome_verboso_singular}`;
          let codigo = 500;

          if (kind === "ObjectId") {
            codigo = 403;
            mensagem = "O Id inserido é inválido!";
          }

          return {
            codigo: codigo,
            mensagem: mensagem,
            dados: err.toJSON(),
          };
        });

      return resposta;
    } catch (err) {
      return {
        codigo: 500,
        mensagem: `Não foi possível encontrar o ${this.nome_verboso_singular}`,
        dados: err,
      };
    }
  }

  /**
   * Atualiza um documento
   * @param {mongoose.Types.ObjectId} id: Id para a requisição
   * @param {object} dados: Dados que serão atualizados
   */
  async atualizar(id, dados) {
    try {
      const model = this.model;

      const resposta = await model
        .findByIdAndUpdate(id, dados)
        .then(async (res) => {
          let codigo = 404;
          let mensagem = `${this.nome_verboso_singular} não encontrado(a)!`;
          let dados = {};

          if (res) {
            const documento_antigo = res;
            const documento_novo = await model.findById(id).then((res) => res);

            (codigo = 200),
              (mensagem = `${this.nome_verboso_singular} atualizado(a) com sucesso!`);
            dados = {
              documento_antigo,
              documento_novo,
            };
          }
          return {
            codigo,
            mensagem,
            dados,
          };
        })
        .catch((err) => {
          const kind = err.kind;

          let codigo = 500;
          let mensagem = `Não foi possível atualizar o(a) ${this.nome_verboso_singular}!`;

          if (kind === "ObjectId") {
            codigo = 403;
            mensagem = "O Id inserido é inválido!";
          }

          return {
            codigo,
            mensagem,
            dados: err,
          };
        });

      return resposta;
    } catch (err) {
      return {
        codigo: 500,
        mensagem: `Não foi possível atualizar o(a) ${this.nome_verboso_singular}!`,
        dados: err,
      };
    }
  }

  /**
   * Deleta um documento
   * @param {mongoose.Types.ObjectId} id: Id para requisição
   */
  async deletar(id) {
    try {
      const model = this.model;

      const resposta = await model
        .findByIdAndDelete(id)
        .then((res) => {
          let codigo = 404;
          let mensagem = `${this.nome_verboso_singular} não encontrado(a)!`;
          let dados = {};

          if (res) {
            codigo = 200;
            mensagem = `${this.nome_verboso_singular} excluído(a) com sucesso!`;
            dados = res;
          }

          return {
            codigo,
            mensagem,
            dados,
          };
        })
        .catch((err) => {
          let codigo = 500;
          let mensagem = `Não foi possível excluir o(a) ${this.nome_verboso_singular}!`;

          const kind = err.kind;

          if (kind == "ObjectId") {
            (codigo = 403), (mensagem = "O Id inserido é inválido!");
          }

          return {
            codigo,
            mensagem,
            dados: err.toJSON(),
          };
        });

      return resposta;
    } catch (err) {
      let codigo = 500;
      let mensagem = `Não foi possível excluir o(a) ${this.nome_verboso_singular}!`;

      return {
        codigo,
        mensagem,
        dados: err,
      };
    }
  }
}

export default Controllers;
