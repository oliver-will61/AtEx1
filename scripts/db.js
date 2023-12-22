const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3306;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2408',
    database: 'atividadeExt'
})

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar o banco de dados:', err);
        process.exit(1); // Saia do aplicativo em caso de erro de conexão
    } else {
        console.log('Conectado ao banco de dados');
        // Iniciar o servidor express somente após conectar ao banco de dados
        app.listen(port, (listenErr) => {
            if (listenErr) {
                console.error('Erro ao iniciar o servidor express:', listenErr);
                process.exit(1); // Saia do aplicativo em caso de erro ao iniciar o servidor
            }
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    }
});

process.on('uncaughtException', (err) => {
    console.error('Erro não capturado:', err);
    process.exit(1);
});

app.use(bodyParser.urlencoded({extended: true}));

// Rota para exibir o formulário
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/cadastro.html');
  });

// Rota para lidar com o envio do formulário
app.post('/enviar', (req, res) => {
    const { nome, cpf, email, senha } = req.body;
  
    // Inserir dados no banco de dados
    const sql = 'INSERT INTO usuarios (nome, cpf, email, senha) VALUES (?, ?, ?, ?)';
    db.query(sql, [nome, cpf, email, senha], (err, result) => {
      if (err) {
        console.error('Erro ao inserir no banco de dados:', err);
        res.send('Erro ao enviar o formulário.');
      } else {
        console.log('Dados inseridos com sucesso no banco de dados');
        res.send('Formulário enviado com sucesso!');
      }
    });
  });

app.listen(port, () => {
console.log(`Servidor rodando em http://localhost:${port}`);
});