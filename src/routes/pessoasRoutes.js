import express from "express";
import PessoaController from "../controllers/PessoasController.js";
import AuthMiddleware from "../middlewares/AuthMIddleware.js";

const routes = express.Router();

// all routes pessoa
/**
 * @swagger
 * #Rotas para pessoa
 * /pessoas:
 *   get:
 *     tags:
 *       - Operações com Pessoas
 *     summary: Recupera todas as pessoas
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/pessoas'
 *               
 *       '404':
 *         description: Nenhuma pessoa encontrada
 *         content:
 *           application/json:
 *             example: Not Found
 *   post:
 *     tags:
 *       - Operações com Pessoas
 *     summary: Cadastra uma nova pessoa
 *     requestBody: 
 *       content: 
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/pessoa'  
 *               
 *     responses: 
 *       '201':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/pessoas'
 *       '404':
 *         description: Sem acesso ao banco
 *         content:
 *           application/json:
 *             example: Not Found
 *       '409':
 *         description: Pessoa já existente
 *         content:
 *           application/json:
 *             example: Conflict
 *             
 * /pessoas/{id}:
 *   parameters:
 *     - name: id
 *       in: path
 *       schema: 
 *         type: string
 *       required: true
 *   get:
 *     tags:
 *       - Operações com Pessoas
 *     summary: Recupera uma pessoa por ID
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json: 
 *             schema:
 *               $ref: '#/components/schemas/pessoa'
 *                
 *       '204':
 *         description: "Sem alteração"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/pessoa'
 * 
 *       '404':
 *         description: Pessoa não encontrada
 *         content:
 *           application/json:
 *             example: Not Found
 * 
 *   put:
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Operações com Pessoas
 *     summary: Atualiza uma pessoa pelo ID (todos os campos)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/pessoa'
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/pessoa'
 *                
 *       '204':
 *         description: "Sem alteração"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/pessoa'
 *               
 *       '404':
 *         description: Nenhuma pessoa encontrada
 *         content:
 *           application/json:
 *             example: Not Found
 *   patch:
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Operações com Pessoas
 *     summary: Atualiza uma pessoa pelo ID (Um ou vários campos)
 *     requestBody: 
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/pessoa'
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/pessoa'
 *               
 *       '404':
 *         description: Nenhuma pessoa encontrada
 *         content:
 *           application/json:
 *             example: Not Found
 *   delete:
 *     security: 
 *       - bearerAuth: []
 *     tags:
 *       - Operações com Pessoas
 *     summary: Apaga uma pessoa pelo ID
 *     responses:
 *       '200':
 *         description: Sucesso
 *         content:
 *           application/json:
 *             example: Deleted
 *               
 *       '404':
 *         description: Nenhuma pessoa encontrada
 *         content:
 *           application/json:
 *             example: Not Found
 *    
 */

//routes.use(AuthMiddleware);
routes
    .get("/pessoas", PessoaController.listar)
    .get("/pessoas/:id", PessoaController.pegarPorId)
    .post("/pessoas", PessoaController.cadastrar)
    .put("/pessoas/:id", PessoaController.atualizar)
    .patch("/pessoas/:id", PessoaController.atualizar)
    .delete("/pessoas/:id", PessoaController.deletar);

export default routes;
