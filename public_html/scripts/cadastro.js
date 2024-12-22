
const radio = document.querySelectorAll('.radio') //selecionar todos radios
const botao = document.querySelector('.botao')

const emailInput = document.querySelector("#email-cadastro")
const senhaInput = document.querySelector('#senha-cadastro')  
const senhaInput2 = document.querySelector('#senha-cadastro-2')  

//main ================================================================================================================================================================

botao.addEventListener('click', function (){

    // validações 
    let senha = verificaSeASenhaSeRepete();

    if (senha == true){
        mandaDadosParaServidor(); // cria a tupla do usuario para mandar para o banco de dados
    }
})

// funções


function verificaSeASenhaSeRepete() {
    const senhaInputTexto = document.querySelector('#senha-cadastro-texto')  //tag span que aparece em caso de erro
    if (senhaInput2.value != senhaInput.value){
        senhaInputTexto.innerHTML = `<p class= "mensagem-erro">Digite a mesma senha em ambos os campos de senha!<p>`

        senhaInput.style.borderColor = 'var(--cor1)'
        senhaInput2.style.borderColor = 'var(--cor1)'

        return false
    } 

    else {
        senhaInputTexto.innerHTML = ''
        for(let i=0; i<= senhaInput.length -1; i++){
            senhaInput[i].style.borderColor = 'black'  //pegas todos os inputs de senha e pinta a cor da borda
        }
        return true
    }
}

function mandaDadosParaServidor(){  

    const nome = document.querySelector("#nome-cadastro");
    const sobrenome = document.querySelector("#sobrenome-cadastro");

    const usuario = {
        email: emailInput.value,
        senha: senhaInput.value,
        nome: nome.value,
        sobrenome: sobrenome.value
    }


    // Envia uma solicitação POST para o servidor
    fetch('http://localhost:58873/submit', {  
        method: 'POST', // Método da solicitação
        headers: {
            'Content-type': 'application/json' // Tipo de conteúdo sendo enviado (JSON)
        },
        body: JSON.stringify(usuario) // Converte o objeto em uma string JSON
    })
      // a função fetch gera uma promise e o método then() é usado para processar a resposta da requisição
    .then(response => response.text()) // Converte a resposta do servidor para texto
    .then(data => {  // Depois que a resposta é convertida em texto, ela é processada
        console.log('Resposta do servidor:', data); // Exibe a resposta do servidor no console
    })
    .catch(erro => { // Caso ocorra algum erro durante o processo (como falha de conexão), captura o erro
        console.error('Erro ao enviar dados para o servidor:', erro); // Exibe uma mensagem de erro no console
    });
}

