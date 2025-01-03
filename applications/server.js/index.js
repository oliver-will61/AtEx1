//libs ========================================================================

import https from 'https' // biblioteca para criar servidores HTTPS
import fs from 'fs'; //biblioteca para manipulação de arquivos
import express from 'express'; // framework para criação de servidores web
import mysql from 'mysql2/promise'; // bibliotecas MySQL com suporte a promessas
import path from 'path'  // biblioteca para manipular caminhos de arquivos e diretorios 
import {fileURLToPath} from 'url' // Para converter URL em caminho de arquivo
import cors from 'cors'; // bliblioteca para configurar políticas de CORS (Cross-Origin Resesource Sharing)
import bcrypt from 'bcrypt';  //biblioteca responsável por criptografar as senhas

// Rotas =======================================================================

import cadastroRouter from './routes/cadastro-rota.js' // importa o roteador de rotas de cadastro

// Caminho do arquivo e diretório =====================================================================

const __filename = fileURLToPath(import.meta.url); // 1. Obtém a URL do módulo atual (o script que está sendo executado)
const __dirname = path.dirname(__filename); // 2. Converte a URL para o caminho local (o diretório onde o arquivo está)
console.log(__dirname);  // Exibe o diretório atual onde o arquivo está localizado


// Configuração do HTTPS (Certificado SSL) ==================================

const keyPath = path.join(__dirname, '../../ssl/keys/c3346_c4321_5cd879379917dde79c79f4d61a8e766f.key');
const certPath = path.join(__dirname, '../../ssl/certs/certificado_completo.crt');

let key, cert;  // variáveis para ar,azemar a chave e o certificado


try {
    key = fs.readFileSync(keyPath); // lê o arquivo da chave privada
    console.log('Chave privada carregada com sucesso');
} catch (error){
     console.error('Erro ao carregar chave privada:', error.message);
}


try {
    cert = fs.readFileSync(certPath); // lê o arquivo do certificado SSL
    console.log('Certificado carregada com sucesso');
} catch (error){
     console.error('Erro ao carregar o certificado:', error.message);
}


const certificadoAndKey = {
     key: key,
     cert: cert
}

// configuração do banco de dados =====================================================

const userdb = process.env.userdb // Usuário do banco de dados, definido nas variáveis de ambiente
const passwdb = process.env.passwdb // senha do banco de dados, definido nas variáveis de ambiente
const database = process.env.database // nome do banco de dados, definido nas variáveis de ambiente
const portDB = 3306 // Porta padrão do MySQL
const host = process.env.host // host do banco de dados, definido nas variáveis de ambiente

// função para iniciar a conexão com o banco de dados
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
        return connection; // retorna a conexão estabelecida
        
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados: ", error.message); // Captura e exibe erros na inicialização da conexão
        throw error; // lança o erro para ser tratado onde necessário
    }
}

// configuração do servidor ======================================================================

async function startServe(){
    try{
        const app = express(); // cria uma nova aplicação express
        const port = process.env.PORT || 58873 // define a porta do servidor, usando uma variável de ambiente ou valor padrão 
        
        app.use(express.json()); //habbilita o suporte a JSON no corpo das requisições
        
        app.use(cors({
            origin: '*', // ou 'https://*' para permitir todos os domínios
            methods: ['GET', 'POST', 'PUT', 'DELETE'], // métodos HTPP permitidos
            allowedHeaders: ['Content-type', 'Authorization'], // cabeçalhos permitidos
            preflightContinue: false,
            optionsSuccessStatus: 204
        }));
        
        app.options('*', cors()); // Permite a requisições OPTIONS para todas as rotas
        
        app.set('trust proxy', true); // Configura o Express para reconhecer proxies
        
        
        // Configuração do Diretório Público ==========================================
    
        // define o diretório público onde está o 'index.html'
        const publicDir = path.join(__dirname,'../../public_html') // Caminho para o diretório público
        app.use(express.static(publicDir)); // Serve arquivos estáticos do diretórios público 
        
        // Define a rota principal que serve o arquivo index.html
        app.get('/', (req, res) => {
            try {
                res.sendFile(path.join(publicDir, 'index.html')); // Envia o arquivo `index.html`
            } catch(error) {
                console.error('Erro ao enviar o arquivo index.html:', error.message);
                res.status(500).send('Erro interno no servidor');
            }
         
        });
        
        const connection = await initDatabase();// estabelece a conexão com o banco de dados

        // configura o roteador de cadastro, passando a conexão do banco
        console.log('Carregando roteador de cadastro...');
        app.use('/', cadastroRouter(connection))// Passando a conexão para o roteador
        
        //cria o servidor HTTPS e inicia-o
        https.createServer(certificadoAndKey, app).listen(port, ()=>{
            console.log(`Servidor HTTPS rodando na porta ${port}`)
        });
    } catch (error){
        
        console.error('Erro ao iniciar o servidor', error.message);
    }
}


// chama a função para iniciar o servidor
startServe(); 


