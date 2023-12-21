async function buscaEndereco (cep) {

    const mensagemErroCep = document.getElementById('cep-cadastro-texto')
    const cepCadastro = document.getElementById("cep-cadastro")

    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json();
        

        if (consultaCEPConvertida.erro){
            throw Error ('CEP não existente');
        }

        mensagemErroCep.innerHTML = ''
        cepCadastro.style.borderColor = 'black' //pinta a borda do input de preta


        const cidade = document.getElementById('cidade-cadastro');
        cidade.value = consultaCEPConvertida.localidade;

        const estado = document.getElementById('estado-cadastro');
        estado.value = consultaCEPConvertida.uf;

        const bairro = document.getElementById('bairro-cadastro')
        bairro.value = consultaCEPConvertida.bairro

        const rua = document.getElementById('rua-cadastro');
        rua.value = consultaCEPConvertida.logradouro;
        

    }   catch (erro) {

            mensagemErroCep.innerHTML =`<p class= "mensagem-erro">CEP inválido. tente novamente!</p>`
            cepCadastro.style.borderColor = 'var(--cor1)' //pinta a borda do input de vermelho
    }
}
