const conteudoPrincipal = document.querySelector(".conteudo-principal");
let dadosDoadores;

//carregaPaginaPrincipal();

main();

async function carregaJSON(){
    try {
        const response = await fetch("../dados_doador.json") //carrega o arquivo JSON
        dadosDoadores = await response.json(); //lista dos objetos, convetidos para javascript
        return dadosDoadores

    } catch(erro) {
        console.log("Erro ao carregar o arquivo JSON!", erro);
    }
}

async function main(){
    try {
        await carregaJSON()

        //resto do código sera feito aqui
        carregaTelaPrincipal()
        eventoClickParaCadaDoador()


    } catch (erro) {
        console.error("Ocorreu um erro", erro)
    }
}


function carregaTelaPrincipal(){
    //coloca todos os objeto na tela principal
    
    dadosDoadores.forEach(element => {  

        conteudoPrincipal.innerHTML += `        
        <div class="container-doador">
            <img class="imagem-doador"src="${element.img}">

            <div class="infomarcoes-doador">
                <h3 class="nome-doador">${element.nomeDoador}</h3>
                <p class="localização-doador">${element.localização}</p>
            </div>
        </div>`
    });
}

function eventoClickParaCadaDoador(){
    //ao clicar em qualquer doador, ira iniciar a função "descricaoDoador"

    const doadores = document.querySelectorAll(".container-doador")

    doadores.forEach((elemente) => elemente.addEventListener('click',  (event) => {
        doadorSelecionado = event.currentTarget.querySelector(".nome-doador").textContent;

        descricaoDoador(doadorSelecionado) //carrega a tela do doador
    }))
}


function descricaoDoador(doadorSelecionado){
    //deixa a tela principal em branco e escreve a descricao de cada doador

    const tituloHeader = document.querySelector(".titulo-header")
    const subtitulo = document.querySelector(".subtitulo")

    conteudoPrincipal.innerHTML ="" // deixa em branco a tela principa
    tituloHeader.innerHTML = doadorSelecionado
    conteudoPrincipal.innerHTML = `
        <h2 class="subtitulo">Doando</h2>
        <p>1 kg de Farinha</p>

        <h2 class="subtitulo">Descrição</h2>
        <p> Um quilo de farrinha da marca Premium.</p>

        <h2 class="subtitulo">Endereço</h2>
        <span class="endereco-doador">Rua das Flores, 123</span>
        <span class="endereco-doador">Bairro Central</span>
        <span class="endereco-doador">Florianopolis</span>
        <span class="endereco-doador">Santa Catarina</span>
        <span class="endereco-doador">CEP: 12345-678</span>
    `
}

