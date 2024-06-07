let buffer = "0";
let stringEval = '';

const display = document.querySelector('.display');

//funcao responsavel por detectar cliques na tela e separa-los conforme o tipo de dado clicado.
function clicarButton(value){
    if(isNaN(value) && value !== '.'){
        processaOperadores(value);
    } else {
        escreverNoDisplay(value);
    }
    console.log(stringEval);
    display.innerText = buffer;
}

function escreverNoDisplay(caracteres){
    if(caracteres === '.' && buffer.includes('.')){
        return;
    }

    if(caracteres !== '.' && buffer === '0') {
        buffer = caracteres;
    } else {
        buffer += caracteres
    }
}

function processaOperadores(valorDigitado){
    switch(valorDigitado){
        case 'C':
            buffer = '0';
            stringEval = '';
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length -1);
            }
            break;
        case '=':
            stringEval += buffer;
            buffer = eval(stringEval);
            stringEval = '';

            break;
        case '÷':
        case '×':
        case '+': 
        case '−':
            preparaStringParaEval(valorDigitado);
            break;
    }
}

function preparaStringParaEval(symbol){
    let operador;
    
    stringEval += buffer;
    stringEval = eval(stringEval);
    
    if(symbol === '÷'){
        operador = '/';
    } else if (symbol === '×'){
        operador = '*';
    } else if (symbol === '−'){
        operador = '-';
    } else if (symbol === '+'){
        operador = '+';
    }

    stringEval += operador;
    buffer = '0';
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        clicarButton(event.target.innerText);
    })
}

init();