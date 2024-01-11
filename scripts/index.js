const conteudoPrincipal = document.querySelector(".conteudo-principal");



carregaPaginaPrincipal();

function carregaPaginaPrincipal(){
    fetch("../dados_doador.json") //lê o arquivo JSON
    .then(response => response.json()
    .then(dadosDoador => {

        dadosDoador.forEach(element => {

            conteudoPrincipal.innerHTML += `        
            <div class="container-doador">
                <img class="imagem-doador"src="${element.img}">

                <div class="infomarcoes-doador">
                    <h3 class="nome-doador">${element.nomeDoador}</h3>
                    <p class="localização-doador">${element.localização}</p>
                </div>
            </div>`
        });


        const doadores = document.querySelectorAll(".container-doador")

        doadores.forEach((elemente) => elemente.addEventListener('click',  (event) => {
            doadorSelecionado = event.currentTarget.querySelector(".nome-doador").textContent;
            conteudoPrincipal.innerHTML =""

            descricaoDoador(doadorSelecionado)
        }))

    }))

    .catch(erro => console.log("Erro ao carregar o arquivo JSON!"));
}

function descricaoDoador(doadorSelecionado){
    const tituloHeader = document.querySelector(".titulo-header")
    const subtitulo = document.querySelector(".subtitulo")

    tituloHeader.innerHTML = doadorSelecionado
    conteudoPrincipal.innerHTML = `<h2 class="subtitulo">Doando</h2>`
}

