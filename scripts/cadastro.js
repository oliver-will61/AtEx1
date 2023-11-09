
const radio = document.querySelectorAll('.radio')

function obterValorRadio() {
    const entradaRadio = document.querySelector('.radio[name="opcao"]:checked');
    console.log(entradaRadio.value)
}

for(i=0; i <= radio.length -1; i++){
    radio[i].addEventListener('click', obterValorRadio);
}


