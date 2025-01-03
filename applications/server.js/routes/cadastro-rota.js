import express from 'express';


const router = express.Router(); // Cria uma nova instância do roteador do Express para definir rotas separadas

export default function cadastroRoute(connection){
    router.post('/submit', async(req, res) => {
        console.log('Requisição recebida');
    
        const emailReq = req.body.email.toUpperCase(); // toUpperCase metodo para padronizar todas as letras em maiusculas
        const senhaReq = req.body.senha;
        const nomeReq = req.body.nome;
        const sobrenomeReq = req.body.sobrenome;
    
        try {
        
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
    return router;
}
