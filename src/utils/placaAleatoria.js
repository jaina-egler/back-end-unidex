function placaAleatoria() {
    let letras = []
    let numeros = []

    for (let i = 0; i < 3; i++){
        letras.push(String.fromCharCode(Math.floor(Math.random() * 25 + 65)))
        numeros.push(Math.floor(Math.random() * 10))
    }

    numeros.push(Math.floor(Math.random() * 10))

    return([letras.join(''), numeros.join('')].join(''))
}

export default placaAleatoria