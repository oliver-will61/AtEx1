import express from 'express';

import {connectionPromise} from '../config/db.js'

const router = express.Router(); // Cria uma nova instância do roteador do Express para definir rotas separadas


router.post('/submit', async(req, res) => {
    console.log('Requisição recebida');

    const emailReq = req.body.email.toUpperCase(); // toUpperCase metodo para padronizar todas as letras em maiusculas
    const senhaReq = req.body.senha;
    const nomeReq = req.body.nome;
    const sobrenomeReq = req.body.sobrenome;

    try {
        const connection = await connectionPromise; //Obtem a conexão com o banco

        const resultado = await connection.execute(
            'INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?,?,?,?)', [nomeReq, sobrenomeReq, emailReq, senhaReq]
        );

        console.log('Dados inseridos com sucesso no banco de dados', resultado.insertId);

        res.send('Dados inseridos com sucesso!')
    }catch (error) {
        console.error('ERRO AO ISERIR DADOS', error);
        res.status(500).send('ERRO AO INSERIR DADOS NO BANCO DE DADOS');
    }
});

export default router  // Exporta o objeto 'router' como o valor padrão deste módulo