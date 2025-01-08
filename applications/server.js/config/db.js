/*

// Database config ============================================================
import mysql from 'mysql2/promise';  


const userdb = process.env.userdb
const passwdb = process.env.passwdb
const database = process.env.database
const port = 3306 // Porta padrão do MySQL
const host = process.env.host

async function initDatabase(){
    try{
        const connection = await mysql.createConnection({
            host: host,
            user: userdb,
            database: database,
            password: passwdb,
            port: port
        });
    
        console.log('Conexão com o banco de dados estabelecida com sucesso!'); // Confirma a conexão bem-sucedida
        return connection;
        
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados: ", error.message); // Captura e exibe erros na inicialização da conexão
        throw error; // lança o erro para ser tratado em outro lugar, caso necessário
    }
}

const connectionPromise = initDatabase();

export {connectionPromise}

*/

// configuração do banco de dados =====================================================
import mysql from 'mysql2/promise';  


const userdb = process.env.userdb // Usuário do banco de dados, definido nas variáveis de ambiente
const passwdb = process.env.passwdb // senha do banco de dados, definido nas variáveis de ambiente
const database = process.env.database // nome do banco de dados, definido nas variáveis de ambiente
const portDB = 3306 // Porta padrão do MySQL
const host = process.env.host // host do banco de dados, definido nas variáveis de ambiente

// função para iniciar a conexão com o banco de dados
async function initDatabase(){
    try{
        const connection = await mysql.createPool({
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

const connectionPromise = initDatabase();

export {connectionPromise};




