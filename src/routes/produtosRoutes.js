import express from "express";
import ProdutosController from "../controllers/ProdutosController.js";

const router = express.Router();
/**
 * @swagger
 * paths:
 *  /produtos:
 *      get:
 *        tags:
 *          - Operações com Produtos
 *        summary: Recupera todos os produtos
 *        parameters:
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
 *                  $ref: '#/components/schemas/produtos'
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
 *          - Operações com Produtos
 *        summary: Cria um novo produto
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/produto'
 *        responses:
 *          "201":
 *            description: Sucesso!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/produto"
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
 *  /produtos/{id}:
 *      parameters:
 *        - name: id
 *          in: path
 *          schema:
 *            type: string
 *          example: '63759606e0a9fb91607a8c4d'
 *          required: true
 *          description: Id do produto
 *      get:
 *        tags:
 *          - Operações com Produtos
 *        summary: Recupera os dados específicos de um único produto
 *        responses:
 *          '200':
 *            description: Sucesso!
 *            content: 
 *              application/json:
 *                schema: 
 *                  $ref: '#/components/schemas/produto'
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
 *          - Operações com Produtos
 *        summary: Edita um produto
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/produto'
 *        responses:
 *          "201":
 *            description: Sucesso!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/produto"
 *          '401':
 *            description: O token está inválido!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro_401'
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro'
 *      patch:
 *        security:
 *          - bearerAuth: []
 *        tags:
 *          - Operações com Produtos
 *        summary: Editar um ou mais campos de um produto
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/produto'
 *        responses:
 *          "200":
 *            description: Sucesso!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/produto"
 *          '401':
 *            description: O token está inválido!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro_401'
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro'
 *      delete:
 *        security:
 *          - bearerAuth: []
 *        tags:
 *          - Operações com Produtos
 *        summary: Deleta um produto do BD
 *        responses:
 *          '200':
 *            description: Sucesso
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/produto'
 *          '401':
 *            description: O token está inválido!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro_401'
 *          '500':
 *            description: Erro interno
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/erro'
 * components:
 *   schemas:
 *      erro_401:
 *        type: object
 *        properties:
 *         code:
 *           type: integer
 *           example: 401
 *         message:
 *           type: string
 *           example: "O token está inválido!"
 */

router
  .get("/produtos", ProdutosController.listarProdutos)
  .get("/produtos/:id", ProdutosController.listarProdutoPorId)
  .post("/produtos",  ProdutosController.cadastrarProduto)
  .patch("/produtos/:id", ProdutosController.atualizarProduto)
  .put("/produtos/:id", ProdutosController.atualizarProduto)
  .delete("/produtos/:id", ProdutosController.deletarProduto)
  
export default router;
 
 