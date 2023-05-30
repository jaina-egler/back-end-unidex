import express from "express";
import FornecedoresController from "../controllers/FornecedoresController.js"

const router = express.Router();
/**
 * @swagger
 * paths:
 *  /fornecedores:
 *      get:
 *        tags:
 *          - Operações com Fornecedores
 *        summary: Recupera todos os Fornecedores
 *        parameters:
 *          - name: nome_fantasia
 *            in: query
 *            description: Recupera arquivos semelhantes ao nome fornecido pelo usuário
 *            required: false
 *            default: 
 *            schema:
 *              type: string
 *          - name: ativo
 *            in: query
 *            description: Recuperar arquivos ativos (true) ou inativos (false)
 *            required: false
 *            default: true
 *            schema:
 *              type: boolean
 *        responses:
 *          '200':
 *            description: Sucesso!
 *            content: 
 *              application/json:
 *                schema: 
 *                  $ref: '#/components/schemas/fornecedores'
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro'
 *      post:
 *        security:
 *          - bearerAuth: []
 *        tags:
 *          - Operações com Fornecedores
 *        summary: Cria um novo fornecedor
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/fornecedor'
 *        responses:
 *          "201":
 *            description: Fornecedor criado com sucesso.!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/fornecedor"
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro'
 *          '401':
 *            description: O token está inválido!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro_401'
 *  /fornecedores/{id}:
 *      parameters:
 *        - name: id
 *          in: path
 *          schema:
 *            type: string
 *          example: '63759606e0a9fb91607a8c4d'
 *          required: true
 *          description: Id da fornecedor
 *      get:
 *        tags:
 *          - Operações com Fornecedores
 *        summary: Recupera os dados específicos de um fornecedor
 *        responses:
 *          '200':
 *            description: Sucesso!
 *            content: 
 *              application/json:
 *                schema: 
 *                  $ref: '#/components/schemas/fornecedor'
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro'
 *      put:
 *        security:
 *          - bearerAuth: []
 *        tags:
 *          - Operações com Fornecedores
 *        summary: Edita um fornecedor
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/fornecedor'
 *        responses:
 *          "201":
 *            description: Fornecedor editado com sucesso.!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/fornecedor"
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro'
 *          '401':
 *            description: O token está inválido!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro_401'
 *      patch:
 *        security:
 *          - bearerAuth: []
 *        tags:
 *          - Operações com Fornecedores
 *        summary: Editar um ou mais campos de um fornecedor
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/fornecedor'
 *        responses:
 *          "200":
 *            description: Fornecedor editado com sucesso.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/fornecedor"
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro'
 *          '401':
 *            description: O token está inválido!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro_401'
 *      delete:
 *        security:
 *          - bearerAuth: []
 *        tags:
 *          - Operações com Fornecedores
 *        summary: Deleta um fornecedor do BD
 *        responses:
 *          '200':
 *            description: Fornecedor deletado com sucesso.
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro'
 *          '401':
 *            description: O token está inválido!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro_401'
 */

router
  .get("/fornecedores", FornecedoresController.listarFornecedor)
  .get("/fornecedores/:id", FornecedoresController.listarFornecedorPorId)
  .post("/fornecedores",  FornecedoresController.cadastrarFornecedor)
  .patch("/fornecedores/:id", FornecedoresController.atualizarFornecedor)
  .put("/fornecedores/:id", FornecedoresController.atualizarFornecedor)
  .delete("/fornecedores/:id", FornecedoresController.excluirFornecedor)
  
export default router;
 
 