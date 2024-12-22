//libs ========================================================================

const express = require('express');
const path = require('path') // Necessário para manipular caminhos de diretórios
const mysql = require('mysql2/promise'); 

const app = express();
const port = process.env.PORT || 58873 // porta do servidor

// define o diretório público onde está o 'index.html'
const publicDir = path.join(__dirname,'../../public_html')
app.use(express.static(publicDir)); // Serve arquivos estáticos a partir do diretório definido

//Rotas =====================================================================

app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(publicDir, 'index.html')); // Envia o arquivo `index.html`
    } catch(error) {
        console.error('Erro ao enviar o arquivo index.html:', error.message);
        res.status(500).send('Erro interno no servidor');
    }
    
})


// Server ===================================================================

var server = app.listen(port, function () {
   console.log(`Servidor iniciado na porta: ${port}`)
})