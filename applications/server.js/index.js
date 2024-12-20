//libs ========================================================================

const express = require('express');
const app = express();
const mysql = require("mysql2/promise");


// Database config ============================================================
const userdb = process.env.USERDB
const passwdb = process.env.PASSWDB
const database = process.env.DATABASE
const port = process.env.PORT
const host = process.env.HOST

async function connectdb(){
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


// Server ===================================================================

app.get('/', (req, res) => {
    res.json('Hello World!')
  })

app.get('/users', function (req, res) {

    const conn = connectdb()
    conn.query('SELECT * FROM users', (err, u) => {
        if(err) return  res.json(err);

        res.json(u)
    })

})


var server = app.listen(port, function () {
   console.log(`Servidor iniciado na porta: ${port}`)
})