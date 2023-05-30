import express from "express";
import ChecklistController from "../controllers/ChecklistController.js";

const router = express.Router();

/**
 * @swagger
 * paths:
 *  /checklist:
 *    get:
 *      tags:
 *        - Operações com Checklists
 *      summary: Recupera todos os checklists
 *      parameters:
 *        - name: ativo
 *          in: query
 *          description: Recuperar arquivos ativos (true) ou inativos (false)
 *          required: false
 *          default: true
 *          schema:
 *            type: boolean
 *      responses:
 *        '200':
 *          description: Sucesso!
 *          content: 
 *            application/json:
 *              schema: 
 *                $ref: '#/components/schemas/checklists'
 *        '500':
 *          description: Erro ao buscar checklists.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/erro'
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Operações com Checklists
 *      summary: Cria um novo checklist
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/checklist'
 *      responses:
 *        '201':
 *          description: Checklist criado com sucesso.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schemas/checklist'
 *        '401':
 *          description: O token está inválido!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/erro_401'
 *        '500':
 *          description: Erro interno
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/erro'
 *  /checklist/{id}:
 *    parameters:
 *      - name: id
 *        in: path
 *        schema:
 *          type: string
 *        example: '63759606e0a9fb91607a8c4d'
 *        required: true
 *        description: Id do checklist
 *    get:
 *      tags:
 *        - Operações com Checklists
 *      summary: Recupera os dados específicos de um único checklist
 *      responses:
 *        '200':
 *          description: Sucesso!
 *          content: 
 *            application/json:
 *              schema: 
 *                $ref: '#/components/schemas/checklist'
 *        '500':
 *          description: Erro interno
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/erro'
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Operações com Checklists
 *      summary: Edita um checklist
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/checklist'
 *      responses:
 *        "201":
 *          description: Checklist editado com sucesso.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/checklist"
 *        '401':
 *          description: O token está inválido!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/erro_401'
 *        '500':
 *          description: Erro interno
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/erro'
 *    patch:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Operações com Checklists
 *      summary: Editar um ou mais campos de um checklist
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/checklist'
 *      responses:
 *        "200":
 *          description: Checklist editado com sucesso.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/checklist"
 *        '401':
 *          description: O token está inválido!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/erro_401'
 *        '500':
 *          description: Erro interno
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/erro'
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Operações com Checklists
 *      summary: Deleta um checklist do BD permanentemente (Recomendado usar o patch)
 *      responses:
 *        '200':
 *          description: Checklist deletado com sucesso.
 *        '500':
 *          description: Erro interno ao deletar o checklist
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/erro'
 *        '401':
 *          description: O token está inválido!
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/erro_401'
 */

router
  .get("/checklist", ChecklistController.listarChecklist)
  .post("/checklist", ChecklistController.cadastrarCheckList)
  .get("/checklist/:id", ChecklistController.listarChecklistPorId)
  .patch("/checklist/:id", ChecklistController.inativarChecklist)
  .put("/checklist/:id", ChecklistController.atualizarChecklist)
  .delete("/checklist/:id", ChecklistController.excluirChecklist)

export default router;