async function buscaEndereco (cep) {
    //var mensagemErro = document.getElementById('erro');
   // mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro){
            throw Error ('CEP não existente');
        }

        // var cidade = document.getElementById('cidade');
        // var logradouro = document.getElementById('endereco');
        let estado = document.getElementById('estado-cadastro');

        // cidade.value = consultaCEPConvertida.localidade;
        // logradouro.value = consultaCEPConvertida.logradouro;
        estado.value = consultaCEPConvertida.uf;
        console.log(estado.value);

        // console.log(consultaCEPConvertida);
        // return consultaCEPConvertida;
    }   catch (erro) {
        // console.log(erro)
        // mensagemErro.innerHTML =`<p>CEP inválido. tente novamente!</p>`
    }
}

//var cep = document.getElementById('cep');
//cep.addEventListener("focusout", () => buscaEndereco(cep.value));