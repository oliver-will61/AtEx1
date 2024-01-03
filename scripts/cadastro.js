
const radio = document.querySelectorAll('.radio') //selecionar todos radios
const containerFormularioCadastroJs = document.querySelector('.container-formulario-cadastro-js')
const botao = document.querySelector('.botao')



const emailInput = document.querySelector("#email-cadastro")
const senhaInput = document.querySelectorAll('#senha-cadastro')  // pega todos os inputs de senha

//main ================================================================================================================================================================

for(i=0; i <= radio.length -1; i++){ //carrega todos os radios e para cada um chama a função "obterValorRadio"
    
    radio[i].addEventListener('click', function() {
        entradaRadioValor = obterValorRadio();

        if (entradaRadioValor== 'Cliente'){
            containerFormularioCadastroJs.innerHTML = `
                <label for="nome-cadastro">Nome
                    <input id="nome-cadastro" class="formulario-cadastro-entrada" type="text" required name=nome>
                </label>

                <label for="sobrenome-cadastro">Sobrenome
                    <input id="sobrenome-cadastro" class="formulario-cadastro-entrada" type="text" required name=sobrenome>
                </label>

                <label for="cpf-cadastro">CPF
                    <input id="cpf-cadastro" class="formulario-cadastro-entrada" type="text" required name=CPF>
                    <span id="cpf-cadastro-texto"></span>
                </label>`

        }

        else if (entradaRadioValor == 'Estabelecimento'){
            containerFormularioCadastroJs.innerHTML = `
                <label for="nomo-empresa-cadastro">Nome da Empresa
                    <input id="nomo-empresa-cadastro" class="formulario-cadastro-entrada" type="text" required >
                </label>
                
                <label for="cnpj-cadastro">CNPJ
                    <input id="cnpj-cadastro" class="formulario-cadastro-entrada" type="text" required>
                </label>
                
                <label for="cep-cadastro">CEP
                    <input id="cep-cadastro" class="formulario-cadastro-entrada" type="text" required>
                    <span id="cep-cadastro-texto"></span>
                </label>
                
                <label for="estado-cadastro">Estado
                    <input id="estado-cadastro" class="formulario-cadastro-entrada" type="text" required>
                </label>

                <label for="cidade-cadastro">Cidade
                    <input id="cidade-cadastro" class="formulario-cadastro-entrada" type="text" required>
                </label>

                <label for="bairro-cadastro">Bairro
                    <input id="bairro-cadastro" class="formulario-cadastro-entrada" type="text" required>
                </label>

                <label for="rua-cadastro">Rua
                    <input id="rua-cadastro" class="formulario-cadastro-entrada" type="text" required>
                </label>

                <label for="numero-cadastro">Número (opicional)
                    <input id="numero-cadastro" class="formulario-cadastro-entrada" type="text" required>
                </label>

                <label for="complemento-cadastro">Complemento (opicional)
                    <input id="complemento-cadastro" class="formulario-cadastro-entrada" type="text" required>
                </label> `     

                const cepCadastro = document.getElementById("cep-cadastro")
        
                cepCadastro.addEventListener('change', function(){
                    buscaEndereco(cepCadastro.value)
                })
        }
    }); 
}

botao.addEventListener('click', function (){

    // validações 
    let CPF = verificaCPF();
    let senha = verificaSeASenhaSeRepete();

    if (CPF == true && senha == true){
        mandaDadosParaServidor();
    }
})

// funções

function obterValorRadio() { //obtém o valor que está no radio selecionado
    const entradaRadio = document.querySelector('.radio[name="opcao"]:checked');
    return entradaRadio.value
}

function verificaSeASenhaSeRepete() {
    const senhaInputTexto = document.querySelector('#senha-cadastro-texto')  //tag span que aparece em caso de erro

    let senhaInputValor = senhaInput[0].value
    let senhaInputValor2 = senhaInput[1].value
    
    if (senhaInputValor2 != senhaInputValor){
        senhaInputTexto.innerHTML = `<p class= "mensagem-erro">Digite a mesma senha em ambos os campos de senha!<p>`

        for(let i=0; i<= senhaInput.length -1; i++){
            senhaInput[i].style.borderColor = 'var(--cor1)'  //pegas todos os inputs de senha e pinta a cor da borda
        }
        return false
        event.preventDefault();
    } 

    else {
        senhaInputTexto.innerHTML = ''
        for(let i=0; i<= senhaInput.length -1; i++){
            senhaInput[i].style.borderColor = 'black'  //pegas todos os inputs de senha e pinta a cor da borda
        }
        return true
    }
}

function verificaCPF(){
    const cpfInput = document.querySelector("#cpf-cadastro");
    const cpfTexto = document.querySelector("#cpf-cadastro-texto")
    
    let cpfValor = cpfInput.value

    if (Number.isNaN(cpfValor) == false && cpfValor.length < 11 || cpfValor.length > 11) {
        cpfTexto.innerHTML = `<p class= "mensagem-erro">CPF inválido!</p>`
        cpfInput.style.borderColor = 'var(--cor1)'  //pega o input e pinta a cor da borda
        return false

    } else {
        cpfTexto.innerHTML = ``
        cpfInput.style.borderColor = 'black'  //pega o input e pinta a cor da borda
        return true
    }
}

function mandaDadosParaServidor(){

    const nome = document.querySelector("#nome-cadastro");
    const sobrenome = document.querySelector("#sobrenome-cadastro");
    const cpfInput = document.querySelector("#cpf-cadastro");

    // Cria um objeto com os dados dos usuários a serem enviados para o servidor
    const dadosUsuarios = {
        nome: nome.value,
        sobrenome: sobrenome.value,
        CPF: cpfInput.value,
        email: emailInput.value,
        senha: senhaInput[0].value
    }

    console.log(dadosUsuarios);

    // Envia uma solicitação POST para o servidor
    fetch('http://localhost:3000/enviar', {  
        method: 'POST', // Método da solicitação
        headers: {
            'Content-type': 'application/json' // Tipo de conteúdo sendo enviado (JSON)
        },
        body: JSON.stringify(dadosUsuarios) // Converte o objeto em uma string JSON
    })
    .then(response => response.text()) // Converte a resposta do servidor para texto
    .then(data => {
        console.log('Resposta do servidor:', data); // Log da resposta do servidor
    })
    .catch(erro => {
        console.error('Erro ao enviar dados para o servidor:', erro); // Log de erro, se ocorrer
    });
}










