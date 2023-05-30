import { cpf, cnpj } from "cpf-cnpj-validator";

function Validation() {
  function validateEmail(email) {
    const regexEmail =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!regexEmail.test(email)) {
      return "Email inválido!";
    }
  }

  function validateCNPJApi(cnpjNumber) {
    if (!cnpj.isValid(cnpjNumber)) {
      return "CNPJ inválido!";
    }
  }

  function validateCPFApi(cpfNumber) {
    if (!cpf.isValid(cpfNumber)) {
      return "CPF inválido!";
    }
  }

  function validatePlaca(placa) {
    // Formato BR apenas
    const regexPlaca = /^[a-zA-Z]{3}-\d{4}$/;

    if (regexPlaca.test(placa)) {
      console.log("Placa inválida!");
    }
  }

  function validateCNH(cnh) {
    cnh = cnh.replace(/\D/g, ""); // remove tudo o que não for dígito

    if (cnh.length != 11) {// CNH com menos de 11 dígitos
      return false; // CNH inválida
    }

    const regexIguais = /^(\d)\1+$/; // CNH com todos os dígitos iguais
    if (regexIguais.test(cnh)) {// Realiza o teste
      return false; // CNH inválida
    }

    let soma = 0; // variável que armazenará o valor da soma
    let multiplicador = 9; // variável que armazenará o valor do multiplicador

    for (let i = 0; i < 9; ++i, --multiplicador) {// laço de repetição para calcular o valor da soma
      soma += cnh.charAt(i) * multiplicador; // calcula o valor da soma
    }

    let desempate = 0; // variável que armazenará o valor do dígito de desempate
    let primeiro = soma % 11; // calcula o valor do primeiro dígito verificador

    if (primeiro >= 10) {// se o valor do primeiro dígito verificador for maior que 10
      primeiro = 0; // o valor do primeiro dígito verificador será igual a 0
      desempate = 2; // o valor do dígito de desempate será igual a 2
    }

    soma = 0; // zera o valor da soma
    multiplicador = 1; // zera o valor do multiplicador

    for (let i = 0; i < 9; ++i, ++multiplicador) {// laço de repetição para calcular o valor da soma
      soma += cnh.charAt(i) * multiplicador; // calcula o valor da soma
    }

    let auxiliar = soma % 11; // calcula o valor do segundo dígito verificador
    let segundo = (auxiliar >= 10) ? 0 : Math.abs(auxiliar - desempate); // calcula o valor do segundo dígito verificador

    return primeiro == cnh.charAt(9) && segundo == cnh.charAt(10); // retorna true se a CNH for válida e false se for inválida
  }

  /* Código para gerar número de CNH em JavaScript*/
  function gerarCNH() {
    let cnh = ""; // variável que armazenará o número da CNH
    let soma = 0; // variável que armazenará o valor da soma

    for (let i = 0; i < 9; ++i) {// laço de repetição para calcular o valor da soma
      cnh += Math.floor(Math.random() * 9); // gera um número aleatório entre 0 e 9 e concatena na variável cnh
      soma += cnh.charAt(i) * (9 - i); // calcula o valor da soma
    }

    let desempate = 0; // variável que armazenará o valor do dígito de desempate
    let primeiro = soma % 11; // calcula o valor do primeiro dígito verificador

    if (primeiro >= 10) {// se o valor do primeiro dígito verificador for maior que 10
      primeiro = 0; // o valor do primeiro dígito verificador será igual a 0
      desempate = 2; // o valor do dígito de desempate será igual a 2
    }

    soma = 0; // zera o valor da soma

    for (let i = 0; i < 9; ++i) {// laço de repetição para calcular o valor da soma
      soma += cnh.charAt(i) * (1 + i); // calcula o valor da soma
    }

    let auxiliar = soma % 11; // calcula o valor do segundo dígito verificador
    let segundo = (auxiliar >= 10) ? 0 : Math.abs(auxiliar - desempate); // calcula o valor do segundo dígito verificador

    return cnh + primeiro + segundo; // retorna o número da CNH
  }

  return {
    validateEmail,
    validateCNPJApi,
    validateCPFApi,
    validatePlaca,
    validateCNH,
    gerarCNH,
  };
}

export default Validation();
