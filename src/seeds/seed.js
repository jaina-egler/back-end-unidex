import db from "../config/dbConect.js";
import abastecimentos from "./abastecimentosSeed.js";
import checklist from "./checklistSeed.js";
import fornecedores from "./fornecedorSeed.js";
import manutencoesCorretivas from "./manutencoesCorretivasSeed.js";
import manutencoesPreventivas from "./manutencoesPreventivasSeed.js";
import pessoas from "./pessoasSeed.js";
import produtos from "./produtosSeed.js";
import veiculos from "./veiculosSeed.js";
import loginSeed from "./login.js";

// Discutindo sobre o uso de async/awaits

// estabelecendo e testando a conexão
db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
  console.log("Conexão com o banco estabelecida!");
});

await pessoas(30);

await fornecedores(30);
await produtos(30);
await veiculos(30);
await abastecimentos(30);
await checklist(30);
await manutencoesCorretivas(30);
await manutencoesPreventivas(30);
await loginSeed();

//Deligando a conexão com o banco de dados com mensagem de sucesso ou de erro
db.close((err) => {
  err ? console.log(err) : console.log("Conexão com o banco encerrada!");
});
