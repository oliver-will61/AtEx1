// Database config ============================================================
import mysql from 'mysql2/promise';  // Importa a biblioteca mysql2, permitindo o uso de promessas com o MySQL


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

