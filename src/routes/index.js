import express from "express";
import checklist from "./checklistRoutes.js";
import abastecimento from "./abastecimentosRoutes.js";
import fornecedor from "./fornecedoresRoutes.js"
import pessoa from "./pessoasRoutes.js";
import login from "./loginRoutes.js"
import manutencaoPreventiva from "./manutencoesPreventivasRoutes.js"
import manutencaoCorretiva from "./manutencoesCorretivasRoutes.js"
import veiculo from "./veiculosRoutes.js"
import produto from "./produtosRoutes.js"
import handleError from "../utils/handleError.js";
import handleNotFound from "../utils/handleNotFound.js";
import handleValidationError from "../utils/handleValidationError.js";


const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).redirect("/docs") // redirecionando para documentação
    })

    app.use(
        express.json(),
        checklist,
        login,
        abastecimento,
        fornecedor,
        manutencaoPreventiva,
        manutencaoCorretiva,
        veiculo,
        produto,
        abastecimento,
        pessoa
    );
    app.use(handleValidationError);
    app.use(handleError);

}

export default routes


