
const radio = document.querySelectorAll('.radio') //selecionar todos radios
const containerFormularioCadastroJs = document.querySelector('.container-formulario-cadastro-js')

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
                </label>`
        }
    }); 
}











