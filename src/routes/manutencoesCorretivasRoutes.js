import express from "express";
import ManutencoesCorretivasController from "../controllers/ManutencoesCorretivasController.js";

const router = express.Router();
/**
 * @swagger
 * paths:
 *  /manutencoesCorretivas:
 *      get:
 *        tags:
 *          - Operações com Manutenções Corretivas
 *        summary: Recupera todas as manutenções corretivas
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
 *                  $ref: '#/components/schemas/manutencoes_corretivas'
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
 *          - Operações com Manutenções Corretivas
 *        summary: Cria uma nova manutenção corretiva
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/manutencao_corretiva'
 *        responses:
 *          "201":
 *            description: Manutenção corretiva criada com sucesso.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/manutencao_corretiva"
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
 *  /manutencoesCorretivas/{id}:
 *      parameters:
 *        - name: id
 *          in: path
 *          schema:
 *            type: string
 *          example: '63759606e0a9fb91607a8c4d'
 *          required: true
 *          description: Id da manutenção
 *      get:
 *        tags:
 *          - Operações com Manutenções Corretivas
 *        summary: Recupera os dados específicos de uma manutenção corretiva
 *        responses:
 *          '200':
 *            description: Sucesso!
 *            content: 
 *              application/json:
 *                schema: 
 *                  $ref: '#/components/schemas/manutencao_corretiva'
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
 *          - Operações com Manutenções Corretivas
 *        summary: Edita uma manutenção corretiva
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/manutencao_corretiva'
 *        responses:
 *          "201":
 *            description: Manutenção corretiva editada com sucesso.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/manutencao_corretiva"
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
 *          - Operações com Manutenções Corretivas
 *        summary: Editar um ou mais campos de uma manutenção corretiva
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/manutencao_corretiva'
 *        responses:
 *          "200":
 *            description: Manutenção corretiva editada com sucesso.
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/manutencao_corretiva"
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
 *          - Operações com Manutenções Corretivas
 *        summary: Deleta uma manutenção corretiva do BD
 *        responses:
 *          '200':
 *            description: Manutenção corretiva deletada com sucesso.
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
  .get("/manutencoesCorretivas/filter", ManutencoesCorretivasController.filteringManutencoesCorretivas)
  .get("/manutencoesCorretivas", ManutencoesCorretivasController.listarManutencoesCorretivas)
  .get("/manutencoesCorretivas/:id", ManutencoesCorretivasController.listarManutencaoCorretivaPorId)
  .post("/manutencoesCorretivas",  ManutencoesCorretivasController.cadastrarManutencaoCorretiva)
  .patch("/manutencoesCorretivas/:id", ManutencoesCorretivasController.atualizarManutencaoCorretiva)
  .put("/manutencoesCorretivas/:id", ManutencoesCorretivasController.atualizarManutencaoCorretiva)
  .delete("/manutencoesCorretivas/:id", ManutencoesCorretivasController.inativarManutencaoCorretiva)
  
export default router;
 