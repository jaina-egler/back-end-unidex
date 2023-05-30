import express from "express";
import ManutencoesPreventivasController from "../controllers/ManutencoesPreventivasController.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /manutencoesPreventivas:
 *      get:
 *        tags:
 *          - Operações com Manutenções Preventivas
 *        summary: Recupera todas as manutenções preventivas
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
 *                  $ref: '#/components/schemas/manutencoes_preventivas'
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
 *          - Operações com Manutenções Preventivas
 *        summary: Cria uma nova manutenção preventiva
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/manutencao_preventiva'
 *        responses:
 *          "201":
 *            description: Manutenção preventiva criada com sucesso.!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/manutencao_preventiva"
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
 *  /manutencoesPreventivas/{id}:
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
 *          - Operações com Manutenções Preventivas
 *        summary: Recupera os dados específicos de uma manutenção preventiva
 *        responses:
 *          '200':
 *            description: Sucesso!
 *            content: 
 *              application/json:
 *                schema: 
 *                  $ref: '#/components/schemas/manutencao_preventiva'
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
 *          - Operações com Manutenções Preventivas
 *        summary: Edita uma manutenção preventiva
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/manutencao_preventiva'
 *        responses:
 *          "201":
 *            description: Manutenção editada deletada com sucesso.!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/manutencao_preventiva"
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
 *          - Operações com Manutenções Preventivas
 *        summary: Editar um ou mais campos de uma manutenção preventiva
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/manutencao_preventiva'
 *        responses:
 *          "200":
 *            description: Manutenção preventiva editada com sucesso.!
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/manutencao_preventiva"
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
  .get("/manutencoesPreventivas",  ManutencoesPreventivasController.listarManutencoesPreventivas)
  .get("/manutencoesPreventivas/:id",  ManutencoesPreventivasController.listarManutencoesPreventivas)
  .post("/manutencoesPreventivas",   ManutencoesPreventivasController.cadastrarManutencaoPreventiva)
  .delete("/manutencoesPreventivas/:id",  ManutencoesPreventivasController.inativarManutencaoPreventiva)
  .put("/manutencoesPreventivas/:id",  ManutencoesPreventivasController.atualizarManutencaoPreventiva)  
export default router;
