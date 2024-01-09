const conteudoPrincipal = document.querySelector(".conteudo-principal");

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

        doadores.forEach((elemente) => elemente.addEventListener('click',  () => {
            window.location.href = "pages/doador.html"
        }))

    }))

    .catch(erro => console.log("Erro ao carregar o arquivo JSON!"))

