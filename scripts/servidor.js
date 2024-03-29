const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize'); //facilita o processo de configuração da conexão com o banco de dados
const cors = require('cors'); // Importa o módulo cors para evitar erros de cors

const app = express()
const PORT = process.env.PORT || 3000;

app.use(cors()); // Usa o middleware cors para lidar com CORS

const sequelize = new Sequelize('atividadeExtensionista','root', '24082001', { // Configuração do banco de dados (nome do banco de dados, usuário, senha)
    host: "localhost", // Host do banco de dados
    dialect: "mysql"  // Tipo do banco de dados
});

sequelize.authenticate()
    .then(function(){
        console.log("Conectado com sucesso!")
    })
    .catch(function(erro){
        console.log("Falha ao se conectar com o banco de dados: " + erro)
    });

// Define um modelo para a tabela 'usuariosTeste' criando uma tabela caso a tabela não exista
const Usuarios = sequelize.define('doadores', {
       
    nome: {
        type: Sequelize.STRING(100)  //varchar (100)
    },
    sobrenome: {
        type: Sequelize.STRING(100)  //varchar (100)
    },

    email: {
        type: Sequelize.STRING(100)  //varchar (100)
    },
    senha: {
        type: Sequelize.STRING(100)  //varchar (100)
    }
})

sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((erro) => {
    console.error('Erro ao sincronizar tabelas:', erro);
  });


app.use(bodyParser.urlencoded({extended: true})) // Configura o middleware para análise de URL
app.use(bodyParser.json()); // Configura o middleware para análise de JSON

// Rota POST para receber dados do cliente e inserir no banco de dados
app.post('/enviar', (req, res) => {
    const {nome, sobrenome, email, senha} = req.body;

    // Cria uma nova entrada na tabela 'usuariosTeste'
    Usuarios.create({nome, sobrenome, email, senha})
    .then(() => {
        console.log('Dados inseridos com sucesso!')
        res.json({ mensagem: 'Dados enviados com sucesso!' })
    })
    .catch((erro) => {
        console.log('Erro ao enviar dados para o banco de dados:', erro);
        res.status(500).json({ erro: 'Erro ao enviar dados para o banco de dados.' })
    })
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});