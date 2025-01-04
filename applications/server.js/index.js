//libs ========================================================================

import https from 'https'
import fs from 'fs';
import express from 'express';
import mysql from 'mysql2/promise'; // Importa a biblioteca mysql2, permitindo o uso de promessas com o MySQL
import path from 'path'  // Necessário para manipular caminhos de diretórios
import {fileURLToPath} from 'url' // Para converter URL em caminho de arquivo
import cors from 'cors';

// Rotas =======================================================================

import cadastroRouter from './routes/cadastro-rota.js'

//path =====================================================================

// 1. Obtém a URL do módulo atual (o script que está sendo executado)
const __filename = fileURLToPath(import.meta.url);

// 2. Converte a URL para o caminho local (o diretório onde o arquivo está)
const __dirname = path.dirname(__filename);
console.log(__dirname);  // Exibe o diretório atual onde o arquivo está localizado


// Banco de dados Config =====================================================

const userdb = process.env.userdb
const passwdb = process.env.passwdb
const database = process.env.database
const portDB = 3306 // Porta padrão do MySQL
const host = process.env.host

// função para iniciar o banco
async function initDatabase(){
    try{
        const connection = await mysql.createConnection({
            host: host,
            user: userdb,
            database: database,
            password: passwdb,
            port: portDB
        });
    
        console.log('Conexão com o banco de dados estabelecida com sucesso!'); // Confirma a conexão bem-sucedida
        return connection;
        
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados: ", error.message); // Captura e exibe erros na inicialização da conexão
        throw error; // lança o erro para ser tratado em outro lugar, caso necessário
    }
}

// Configuração do HTTPS (Certificado SSL) ==================================

const keyPath = path.join(__dirname, '../../ssl/keys/c3346_c4321_5cd879379917dde79c79f4d61a8e766f.key');
const certPath = path.join(__dirname, '../../ssl/certs/certificado_completo.crt');

// Tente ler os arquivos e registre se falhou
let key, cert;


try {
    key = fs.readFileSync(keyPath);
    console.log('Chave privada carregada com sucesso');
} catch (error){
     console.error('Erro ao carregar chave privada:', error.message);
}


try {
    cert = fs.readFileSync(certPath);
    console.log('Certificado carregada com sucesso');
} catch (error){
     console.error('Erro ao carregar o certificado:', error.message);
}


const certificadoAndKey = {
     key: key,
     cert: cert
}

// Server ======================================================================

async function startServe(){
    try{
        const app = express();
        const port = process.env.PORT || 58873 // porta do servidor
        
        app.use(express.json()); //permite que o servidor interprete JSON no corpo da requisição
        
        app.use(cors({
            origin: '*', // ou 'https://*' para permitir todos os domínios
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-type', 'Authorization'],
            preflightContinue: false,
            optionsSuccessStatus: 204
        }));
        
        app.options('*', cors()); // Permite todas as requisições OPTIONS
        
        app.set('trust proxy', true); // Permite que o Express saiba que está atrás de um proxy
        
        
        // Configuração do Diretório Público ==========================================
    
        // define o diretório público onde está o 'index.html'
        const publicDir = path.join(__dirname,'../../public_html') // Diretório onde está o 'index.html'
        app.use(express.static(publicDir)); // Serve arquivos estáticos a partir do diretório definido
    
        //Rotas ====================================================================
    
        //Rota principal (carrega a página index.html)
        app.get('/', (req, res) => {
            try {
                res.sendFile(path.join(publicDir, 'index.html')); // Envia o arquivo `index.html`
            } catch(error) {
                console.error('Erro ao enviar o arquivo index.html:', error.message);
                res.status(500).send('Erro interno no servidor');
            }
         
        });
        
        const connection = await initDatabase();// Certifique-se de que a conexão foi estabelecida antes de iniciar o servidor

        //rota para lidar com cadastro (usa o roteador, conecta ao banco de dados)
        console.log('Carregando roteador de cadastro...');
        app.use('/', cadastroRouter(connection))// Passando a conexão para o roteador
        
        https.createServer(certificadoAndKey, app).listen(port, ()=>{
            console.log(`Servidor HTTPS rodando na porta ${port}`)
        });
    } catch (error){
        
        console.error('Erro ao iniciar o servidor', error.message);
    }
}


// chama a função para iniciar o servidor
startServe(); 

//==========================================================================



