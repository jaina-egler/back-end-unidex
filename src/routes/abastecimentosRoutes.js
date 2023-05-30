import express from "express";
import AbastecimentosController from "../controllers/AbastecimentosController.js";
import AuthMiddleware from "../middlewares/AuthMIddleware.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /abastecimentos:
 *      get:
 *        tags:
 *          - Operações com Abastecimentos
 *        summary: Recupera todos os abastecimentos
 *        parameters:
 *          - name: pagina
 *            in: query
 *            description: Informa o número da página a ser exibida
 *            required: false
 *            default: 1
 *            schema:
 *              type: number
 *          - name: limite
 *            in: query
 *            description: Informa o número máximo de documentos que podem ser exibidos por página
 *            required: false
 *            default: 3
 *            schema:
 *              type: number
 *          - name: data_inicial
 *            in: query
 *            description: Retorna abastecimentos que tiverem uma data maior
 *            required: false
 *            default: ""
 *            schema:
 *              type: Date
 *          - name: data_final
 *            in: query
 *            description: Retorna abastecimentos que tiverem uma data menor
 *            required: false
 *            default: ""
 *            schema:
 *              type: Date
 *          - name: placa
 *            in: query
 *            description: Retorna abastecimentos cujo a placa do veículo for a mesma
 *            required: false
 *            default: ""
 *            schema:
 *              type: string
 *          - name: motorista
 *            in: query
 *            description: Retorna abastecimentos cujo o Id do motorista corresponda
 *            required: false
 *            default: ""
 *            schema:
 *              type: ObjectId
 *          - name: fornecedor
 *            in: query
 *            description: Retorna abastecimentos cujo o Id do fornecedor corresponda
 *            required: false
 *            default: ""
 *            schema:
 *              type: ObjectId
 *        responses:
 *          '200':
 *            description: Sucesso!
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    codigo:
 *                      type: number
 *                      example: 200
 *                    mensagem:
 *                      type: string
 *                      example: Abastecimentos encontrado(a)s com sucesso!
 *                    dados:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/abastecimento'
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                example:
 *                  codigo: 500
 *                  mensagem: "Não foi possível listar Abastecimentos!"
 *                schema:
 *                  $ref: '#/components/schemas/erro'
 *      post:
 *        security:
 *          - bearerAuth: []
 *        tags:
 *          - Operações com Abastecimentos
 *        summary: Cria um novo Abastecimento
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/abastecimento'
 *        responses:
 *          '201':
 *            description: Sucesso!
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    codigo:
 *                      type: number
 *                      example: 201
 *                    mensagem:
 *                      type: string
 *                      example: Abastecimento cadastrado(a) com sucesso!
 *                    dados:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/abastecimento'
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                example:
 *                  codigo: 500
 *                  mensagem: "Não foi possível cadastrar o(a) Abastecimento!"
 *                schema:
 *                  $ref: '#/components/schemas/erro'
 *          '403':
 *            description: Erro de validação
 *            content:
 *              application/json:
 *                example:
 *                  codigo: 403
 *                  mensagem: "Abastecimento inválido, verifique os dados e tente novamente!"
 *                schema:
 *                  $ref: '#/components/schemas/erro'
 *
 *  /abastecimentos/{id}:
 *      parameters:
 *        - name: id
 *          in: path
 *          schema:
 *            type: string
 *          example: '63759606e0a9fb91607a8c4d'
 *          required: true
 *          description: Id do Abastecimento
 *      get:
 *        tags:
 *          - Operações com Abastecimentos
 *        summary: Recupera os dados específicos de um Abastecimento
 *        responses:
 *          '200':
 *            description: Sucesso!
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    codigo:
 *                      type: number
 *                      example: 200
 *                    mensagem:
 *                      type: string
 *                      example: Abastecimento encontrado(a) com sucesso!
 *                    dados:
 *                      type: object
 *                      $ref: '#/components/schemas/abastecimento'
 *          '403':
 *            description: Id Inválido
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    codigo:
 *                      type: number
 *                      example: 403
 *                    mensagem:
 *                      type: string
 *                      example: O Id inserido é invalido!
 *                    dados:
 *                      type: object
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    codigo:
 *                      type: number
 *                      example: 500
 *                    mensagem:
 *                      type: string
 *                      example: Não foi possível encontrar o(a) Abastecimento!
 *                    dados:
 *                      type: object
 *      patch:
 *        security:
 *          - bearerAuth: []
 *        tags:
 *          - Operações com Abastecimentos
 *        summary: Editar um ou mais campos de um Abastecimento
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/abastecimento'
 *        responses:
 *          '200':
 *            description: Sucesso!
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    codigo:
 *                      type: number
 *                      example: 200
 *                    mensagem:
 *                      type: string
 *                      example: Abastecimento atualizado(a) com sucesso!
 *                    dados:
 *                      type: object
 *                      $ref: '#/components/schemas/abastecimento'
 *          '403':
 *            description: Id Inválido
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    codigo:
 *                      type: number
 *                      example: 403
 *                    mensagem:
 *                      type: string
 *                      example: O Id inserido é invalido!
 *                    dados:
 *                      type: object
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    codigo:
 *                      type: number
 *                      example: 500
 *                    mensagem:
 *                      type: string
 *                      example: Não foi possível atualizar o(a) Abastecimento!
 *      delete:
 *        security:
 *          - bearerAuth: []
 *        tags:
 *          - Operações com Abastecimentos
 *        summary: Deleta um Abastecimento do BD
 *        responses:
 *          '200':
 *            description: Sucesso!
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    codigo:
 *                      type: number
 *                      example: 200
 *                    mensagem:
 *                      type: string
 *                      example: Abastecimento excluído(a) com sucesso!
 *                    dados:
 *                      type: object
 *                      $ref: '#/components/schemas/abastecimento'
 *          '403':
 *            description: Id Inválido
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    codigo:
 *                      type: number
 *                      example: 403
 *                    mensagem:
 *                      type: string
 *                      example: O Id inserido é invalido!
 *                    dados:
 *                      type: object
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    codigo:
 *                      type: number
 *                      example: 500
 *                    mensagem:
 *                      type: string
 *                      example: Não foi possível excluir o(a) Abastecimento!
 */

router
  .post("/abastecimentos", AbastecimentosController.cadastrarAbastecimento)
  .get("/abastecimentos", AbastecimentosController.listarAbastecimentos)
  .get("/abastecimentos/:id", AbastecimentosController.listarAbastecimentoPorId)
  .patch("/abastecimentos/:id", AbastecimentosController.atualizarAbastecimento)
  .delete("/abastecimentos/:id", AbastecimentosController.excluirAbastecimento);

export default router;
