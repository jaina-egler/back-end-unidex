import express from "express";
import VeiculosController from "../controllers/VeiculosController.js";

const router = express.Router();

/**
 * @swagger
 * #Rotas para veículos
 * /veiculos:
 *   get:
 *     tags:
 *       - Operações com Veículos
 *     summary: Recupera todos os veículos
 *     parameters:
 *       - name: ativo
 *         in: query
 *         description: Recuperar arquivos ativos (true) ou inativos (false)
 *         required: false
 *         default: true
 *         schema:
 *           type: boolean
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/veiculos'
 *               
 *       '404':
 *         description: Nenhum veículo encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 *   post:
 *     tags:
 *       - Operações com Veículos
 *     summary: Cadastra um novo veículo
 *     requestBody: 
 *       content: 
 *         application/json:                    
 *           schema:
 *              $ref: '#/components/schemas/veiculo' 
 *               
 *     responses: 
 *       '201':
 *         description: Veículo criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/veiculos'
 *       '404':
 *         description: Sem acesso ao banco
 *         content:
 *           application/json:
 *             example: Not Found
 *       '409':
 *         description: Veículo já existente
 *         content:
 *           application/json:
 *             example: Conflict
 *             
 * /veiculos/{id}:
 *   parameters:
 *     - name: id
 *       in: path
 *       schema: 
 *         type: string
 *       required: true
 *   get:
 *     tags:
 *       - Operações com Veículos
 *     summary: Recupera um veículo pelo ID
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json: 
 *             schema:
 *               $ref: '#/components/schemas/veiculo'
 *                
 *       '204':
 *         description: "Sem alteração"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/veiculo'
 * 
 *       '404':
 *         description: Veículo não encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 * 
 *   put:
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Operações com Veículos
 *     summary: Atualiza um veículo pelo ID (todos os campos)
 *     requestBody:
 *       content:
 *         application/json:
 *           example: {"placa": "ABC2345", "marca": "Volvo", "modelo": "FH 540", "ano": "2022", "renavan": "12345678910", "vencimento_ipva": "2024-04-20"}
 *           schema:
 *             $ref: '#/components/schemas/veiculo'
 *     responses:
 *       '200':
 *         description: Veículo editado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/veiculo'
 *                
 *       '204':
 *         description: "Sem alteração"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/veiculo'
 *               
 *       '404':
 *         description: Nenhum veículo encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 *   patch:
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Operações com Veículos
 *     summary: Atualiza um veículo pelo ID (um ou vários campos)
 *     requestBody: 
 *       content:
 *         application/json:
 *           example: {"ativo": "false"}
 *           schema:
 *             $ref: '#/components/schemas/veiculo'
 *     responses:
 *       '200':
 *         description: Veículo editado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/veiculo'
 *               
 *       '404':
 *         description: Nenhum veículo encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 *   delete:
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Operações com Veículos
 *     summary: Apaga um veículo pelo ID
 *     responses:
 *       '200':
 *         description: Veículo deletado com sucesso.
 *         content:
 *           application/json:
 *             example: Veículo deletado com sucesso.
 *       '404':
 *         description: Nenhum veículo encontrado
 *         content:
 *           application/json:
 *             example: Not Found
 */

router
  .get("/veiculos", VeiculosController.listarVeiculos)
  .get("/veiculos/:id", VeiculosController.listarVeiculoPorId)
  .post("/veiculos",  VeiculosController.cadastrarVeiculo)
  .patch("/veiculos/:id", VeiculosController.atualizarVeiculo)
  .put("/veiculos/:id", VeiculosController.atualizarVeiculo)
  .delete("/veiculos/:id", VeiculosController.excluirVeiculo)
  
export default router;
 
 