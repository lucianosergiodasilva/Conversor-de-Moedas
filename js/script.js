// Variaveis

let input = document.querySelector('#inputNumero').value
let moedaSelecionada = document.getElementsByName('moeda')
let aviso = document.querySelector('#aviso')
let btnConverter = document.querySelector('#btnConverter')
let btnLimpar = document.querySelector('#btnLimpar')
let moedaEstrangeira = ''
let moedaConvertida = 0.00

// Cotações

let valorDolar = 5.31
let valorEuro = 6.23
let valorLibra = 7.26
let valorBitcoin = 229762.85
let valorReal = 0

function mensagemFormatada(moedaConvertida) {
    isNaN(valorReal) ? valorReal = 0 : ''
    console.log('Moeda convertida: ' + moedaConvertida)
    aviso.textContent = `(${moedaEstrangeira}) ${moedaConvertida}`
}

// Bloqueia o botão chutar quando clicamos fora input

function bloquearBtnConverter() {
    btnConverter.setAttribute('disabled', 'disabled')
    btnConverter.style.cursor = 'not-allowed'
    btnConverter.classList.add('bloqueado')
    
    btnLimpar.setAttribute('disabled', 'disabled')
    btnLimpar.style.cursor = 'not-allowed'
    btnLimpar.classList.add('bloqueado')

    inputNumero.value = ''
}

// Ativa o botão converter quando inserimos um número no input

function ativarBtnConverter() {
    btnConverter.removeAttribute('disabled')
    btnConverter.style.cursor = 'pointer'
    btnConverter.classList.remove('bloqueado')

    btnLimpar.removeAttribute('disabled')
    btnLimpar.style.cursor = 'pointer'
    btnLimpar.classList.remove('bloqueado')
}

// Validar campo. O argumento da função será o valor do input.

function validarNumeroDigitado(numero) {
    if (numero <= 0) {
        aviso.classList.add('atencao')
        mensagemRapida('É preciso informar um valor.')
        bloquearBtnConverter()
        console.log('Número inválido!')
    }
}

// Mostra aviso na tela e apaga após 3 segundos

function mensagemRapida(texto) {
    // O aviso recebe o texto do argumento
    aviso.textContent = texto

    // Apagar a mensagem após 3 segundos
    setTimeout(() => {
        aviso.textContent = 'Digite o valor, escolha a moeda e clique em converter.'
        aviso.classList.remove('atencao')
        inputNumero.focus()
    }, 3000)
}

// Converter moeda

btnConverter.addEventListener('click', () => {
    valorReal = parseFloat(inputNumero.value)

    // VERIFICA QUAL RADIO FOI MARCADO

    // Percorre a lista de inputs radio
    for (let i = 0; i < moedaSelecionada.length; i++) {
        // Verifica se é checked
        if (moedaSelecionada[i].checked) {
            moedaEstrangeira = moedaSelecionada[i].value
            console.log(moedaEstrangeira)
        }
    }

    // CONVERTE A MOEDA, E MOSTRA O VALOR FORMATADO

    switch (moedaEstrangeira) {
        case 'Dólar':
            moedaConvertida = (valorReal / valorDolar)
            mensagemFormatada(moedaConvertida.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
            break
        case 'Euro':
            moedaConvertida = (valorReal / valorEuro)
            mensagemFormatada(moedaConvertida.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }))
            break
        case 'Libra':
            moedaConvertida = (valorReal / valorLibra)
            mensagemFormatada(moedaConvertida.toLocaleString('en-BG', { style: 'currency', currency: 'GBP' }))
            break
        case 'Bitcoin':
            moedaConvertida = valorReal / valorBitcoin
            mensagemFormatada(parseFloat(moedaConvertida.toFixed(5)))
            break
        default:
            aviso.classList.add('atencao')
            mensagemRapida('Escolha uma moeda.')

    }
})

function limpar(){
    inputNumero.value = ''
    inputNumero.focus()
    aviso.textContent = 'Digite o valor, escolha a moeda e clique em converter.'

    console.log('Clicou em limpar')

}