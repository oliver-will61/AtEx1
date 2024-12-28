//libs ========================================================================

import https from 'https'
import fs from 'fs';
import express from 'express';

//path
import path from 'path'  // Necessário para manipular caminhos de diretórios
import {fileURLToPath} from 'url' // Para converter URL em caminho de arquivo

// 1. Obtém a URL do módulo atual (o script que está sendo executado)
const __filename = fileURLToPath(import.meta.url);

// 2. Converte a URL para o caminho local (o diretório onde o arquivo está)
const __dirname = path.dirname(__filename);
console.log(__dirname);  // Exibe o diretório atual onde o arquivo está localizado



import cadastroRouter from './routes/cadastro-rota.js'

const app = express();
const port = process.env.PORT || 58873 // porta do servidor


//certificado SSl e chave privada
const options = {
    key: fs.readFileSync('../../ssl/keys/c3c24_9e075_f5813831de0bc50b2e6c5517889aa430.key'),
    cert: fs.readFileSync('../../ssl/certs/willi4776_c44_integrator_host_c3c24_9e075_1766881105_68c068215218ede05a230744a7c9abb3.crt')
}



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
console.log('Carregando roteador de cadastro...');
app.use('/', cadastroRouter) // integra o roteador para lidar com rotas especificas


// Server ===================================================================


https.createServer(options, app).listen(port, ()=>{
    console.log(`Servidor HTTPS rodando na porta ${port}`)
});