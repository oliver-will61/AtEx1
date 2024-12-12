const conteudoPrincipal = document.querySelector(".conteudo-principal");
let dadosDoadores;

//carregaPaginaPrincipal();

main();

async function carregaJSON(){
    try {
        const response = await fetch("dados_doador.json") //carrega o arquivo JSON
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

    const objetoSelecionado = dadosDoadores.find(objeto => objeto.nomeDoador === doadorSelecionado)
    
    const logo = document.querySelector(".logo-icone")
    const tituloHeader = document.querySelector(".titulo-header")
    const subtitulo = document.querySelector(".subtitulo")
    const footer = document.querySelector(".rodape")

    conteudoPrincipal.innerHTML ="" // deixa em branco a tela principa

    logo.src = `${objetoSelecionado.img}`;
    logo.style = "border-radius: 30px;"

    footer.style = "display:block";

    tituloHeader.innerHTML = doadorSelecionado

    conteudoPrincipal.innerHTML = `

        <h2 class="subtitulo">Doando</h2>
        <p class="texto-doador">${objetoSelecionado.produto}</p>

        <div class="container-img-produto-doador">
            <img class="img-produto-doador" src=${objetoSelecionado.imgProduto}>
        </div>


        <h2 class="subtitulo">Descrição</h2>
        <p class="texto-doador">${objetoSelecionado.descricao}</p>

        <h2 class="subtitulo">Endereço</h2>

        <p class="texto-doador">
            ${objetoSelecionado.end.rua}, ${objetoSelecionado.end.numero}, ${objetoSelecionado.end.bairro},
            ${objetoSelecionado.end.cidade}, ${objetoSelecionado.end.estado}, ${objetoSelecionado.end.cep}
        </p>

        <div class="container-mapa">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.2661598831164!2d-46.66148162290235!3d-23.55888246150462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59cd060ea13b%3A0x7c535e9d9784e6c2!2sAv.%20Paulista%2C%202000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-200!5e0!3m2!1spt-BR!2sbr!4v1705085697883!5m2!1spt-BR!2sbr" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    `
}

