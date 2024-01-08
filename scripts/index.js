const doadores = document.querySelectorAll(".container-doador")

doadores.forEach((elemente) => elemente.addEventListener('click',  () => {
    window.location.href = "pages/doador.html"
}))
