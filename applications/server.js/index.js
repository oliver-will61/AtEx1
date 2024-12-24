//libs ========================================================================

const express = require('express');
const path = require('path') // Necessário para manipular caminhos de diretórios
const cadastroRouter = require ('../../etc/willi4776.c44.integrator.host/routes/cadastro-rota');
const app = express();
const port = process.env.PORT || 58873 // porta do servidor



// Middleware para interpretar JSON ===========================================

app.use(express.json()); //permite que o servidor interprete JSON no corpo da requisição

// Configuração do Diretório Público ==========================================

// define o diretório público onde está o 'index.html'
const publicDir = path.join(__dirname,'../../public_html') // Diretório onde está o 'index.html'
app.use(express.static(publicDir)); // Serve arquivos estáticos a partir do diretório definido

//Rotas =====================================================================

//Rota principal (carrega a página index.html)
app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(publicDir, 'index.html')); // Envia o arquivo `index.html`
    } catch(error) {
        console.error('Erro ao enviar o arquivo index.html:', error.message);
        res.status(500).send('Erro interno no servidor');
    }
 
});

//rota para lidar com cadastro (usadno o roteador)
app.use('/', cadastroRouter) // integra o roteador para lidar com rotas especificas


// Server ===================================================================

app.listen(port, () => {
   console.log(`Servidor iniciado na porta: ${port}`)
})