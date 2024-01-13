
const radio = document.querySelectorAll('.radio') //selecionar todos radios
const botao = document.querySelector('.botao')

const emailInput = document.querySelector("#email-cadastro")
const senhaInput = document.querySelector('#senha-cadastro')  
const senhaInput2 = document.querySelector('#senha-cadastro-2')  

//main ================================================================================================================================================================

botao.addEventListener('click', function (){

    // validações 
    //let CPF = verificaCPF();
    let senha = verificaSeASenhaSeRepete();

    if (senha == true){
        mandaDadosParaServidor();
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

    // Cria um objeto com os dados dos usuários a serem enviados para o servidor

    class Usuario {
        constructor (nome, sobrenome, email, senha) {
            this.nome = nome,
            this.sobrenome = sobrenome,
            this.email = email,
            this.senha = senha
        }
    }

    const usuario = new Usuario (nome.value,sobrenome.value,emailInput.value,senhaInput.value)
    console.log(usuario.cpf)

    // Envia uma solicitação POST para o servidor
    fetch('http://localhost:3000/enviar', {  
        method: 'POST', // Método da solicitação
        headers: {
            'Content-type': 'application/json' // Tipo de conteúdo sendo enviado (JSON)
        },
        body: JSON.stringify(usuario) // Converte o objeto em uma string JSON
    })
    .then(response => response.text()) // Converte a resposta do servidor para texto
    .then(data => {
        console.log('Resposta do servidor:', data); // Log da resposta do servidor
    })
    .catch(erro => {
        console.error('Erro ao enviar dados para o servidor:', erro); // Log de erro, se ocorrer
    });
}

