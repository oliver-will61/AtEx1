
const radio = document.querySelectorAll('.radio') //selecionar todos radios
const containerFormularioCadastroJs = document.querySelector('.container-formulario-cadastro-js')
const botao = document.querySelector('.botao')


function obterValorRadio() { //obtém o valor que está no radio selecionado
    const entradaRadio = document.querySelector('.radio[name="opcao"]:checked');
    return entradaRadio.value
}

//main ================================================================================================================================================================

for(i=0; i <= radio.length -1; i++){ //carrega todos os radios e para cada um chama a função "obterValorRadio"
    
    radio[i].addEventListener('click', function() {
        entradaRadioValor = obterValorRadio();

        if (entradaRadioValor== 'Cliente'){
            containerFormularioCadastroJs.innerHTML = `
                <label for="nome-cadastro">Nome e Sobrenome
                    <input id="nome-cadastro" class="formulario-cadastro-entrada" type="text" >
                </label>

                <label for="cpf-cadastro">CPF
                    <input id="cpf-cadastro" class="formulario-cadastro-entrada" type="number" >
                </label>`

        }

        else if (entradaRadioValor == 'Estabelecimento'){
            containerFormularioCadastroJs.innerHTML = `
                <label for="nomo-empresa-cadastro">Nome da Empresa
                    <input id="nomo-empresa-cadastro" class="formulario-cadastro-entrada" type="text" >
                </label>
                
                <label for="cnpj-cadastro">CNPJ
                    <input id="cnpj-cadastro" class="formulario-cadastro-entrada" type="text" >
                </label>
                
                <label for="cep-cadastro">CEP
                    <input id="cep-cadastro" class="formulario-cadastro-entrada" type="text" >
                </label>`   
        }
    }); 
}

botao.addEventListener('click', function (){

    const senhaInput = document.querySelectorAll('#senha-cadastro')  // pega todos os inputs de senha
    const senhaInputTexto = document.querySelector('#senha-cadastro-texto')  //tag span que aparece em caso de erro

    let senhaInputValor = senhaInput[0].value
    let senhaInputValor2 = senhaInput[1].value
    
    if (senhaInputValor2 != senhaInputValor){
        senhaInputTexto.innerHTML = `<p class= "entrada-texto">Digite a mesma senha em ambos os campos de senha!<p>`

        for(let i=0; i<= senhaInput.length -1; i++){
            senhaInput[i].style.borderColor = 'var(--cor1)'  //pegas todos os inputs de senha e pinta a cor da borda
        }
    }

    else {
        senhaInputTexto.innerHTML = ''
        for(let i=0; i<= senhaInput.length -1; i++){
            senhaInput[i].style.borderColor = 'black'  //pegas todos os inputs de senha e pinta a cor da borda
        }
    }
})











