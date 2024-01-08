const doadores = document.querySelectorAll(".container-doador")

doadores.forEach((elemente) => elemente.addEventListener('click',  () => {
    window.location.href = "/AtEx1-main/pages/doador.html"
}))