import Abastecimento from "./models/Abastecimento.js";
import Checklist from "./models/Checklist.js";
import Fornecedor from "./models/Fornecedor.js";
import ManutencaoCorretiva from "./models/ManutencaoCorretiva.js";
import ManutencaoPreventiva from "./models/ManutencaoPreventiva.js";
import Pessoa from "./models/Pessoa.js";
import Produto from "./models/Produto.js";
import Veiculo from "./models/Veiculo.js";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API UNIDEX - FSLAB",
      description:
        "API para controlar checklist, fornecedor, abastecimento, pessoas e outros",
      version: "0.0.1",
      termsOfService: "http://localhost:3031",
      contact: {
        name: "API-UNIDEX",
        email: "fslab@fslab.dev",
        url: "fslab.dev",
      },
      license: {
        name: "Lincença: GPLv3",
        url: "https://www.gnu.org/licenses/gpl-3.0.html",
      },
    },
    externalDocs: {
      description: "Documentação detalhada",
      url: "http://localhost:3031/docs",
    },
    servers: [
      {
        url: "https://k3s.devops.fslab.dev/30334",
        description: "API em produção no FSLAB",
      },
      {
        url: 'http://localhost:3034',
        description: "API em desenvolvimento no FSLAB",
      },
    ],
    paths: {},
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        pessoa: Pessoa,
        pessoas: {
          type: "array",
          items: {
            $ref: "#/components/schemas/pessoa",
          },
        },
        abastecimento: Abastecimento,
        abastecimentos: {
          type: "array",
          items: {
            $ref: "#/components/schemas/abastecimento"
          }
        },
        checklist: Checklist,
        checklists: {
          type: "array",
          items: {
            $ref: "#/components/schemas/checklist"
          }
        },
        fornecedor: Fornecedor,
        fornecedores: {
          type: "array",
          items: {
            $ref: "#/components/schemas/fornecedor"
          }
        },
        manutencao_corretiva: ManutencaoCorretiva,
        manutencoes_corretivas: {
          type: "array",
          items: {
            $ref: "#/components/schemas/manutencao_corretiva"
          }
        },
        manutencao_preventiva: ManutencaoPreventiva,
        manutencoes_preventivas: {
          type: "array",
          items: {
            $ref: "#/components/schemas/manutencao_preventiva"
          }
        },
        produto: Produto,
        produtos: {
          type: "array",
          items: {
            $ref: '#/components/schemas/produto'
          }
        },
        veiculo: Veiculo,
        veiculos: {
          type: "array",
          items: {
            $ref: '#/components/schemas/veiculo'
          }
        },
        erro: {
          type: "object",
          example: {
            message: "Erro ao executar a operação."
          },
          properties: {
            codigo: {
              type: "string"
            },
            mensagem: {
              type: "string",
            },
            dados: {
              type: "object"
            }
          }
        }
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

export default swaggerOptions;
