import express from 'express'; // importa o framework Express para criar e gerenciar rotas

// Cria uma nova instância do roteador do Express para definir rotas específicas
const router = express.Router(); 

// função que define as rotas de cadastro e recebe uma conexão com o banco de dados como argumentos
export default function cadastroRoute(connection){
    // Define uma rota POST para "/submit" para tratar o  envio de dados de cadastro
    router.post('/submit', async(req, res) => {
        console.log('Requisição recebida');  // Loga no console que a requisição foi recebida
    
        // obtém os dados do corpo da requisição (JSON enviado pelo cliente)
        const emailReq = req.body.email.toUpperCase(); // Converte o email para letras maiúsculos para padronização
        const senhaReq = req.body.senha; // obtém a senha enviada pelo cliente
        const nomeReq = req.body.nome; // obtém o nome enviada pelo cliente
        const sobrenomeReq = req.body.sobrenome; // obtém o sobrenome enviado pelo cliente
    
        try {
            
            // insere os dados recebidos no banco de dados
            const resultado = await connection.execute(
                'INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?,?,?,?)', [nomeReq, sobrenomeReq, emailReq, senhaReq] // parâmetros a serem inseridos no banco
            );
    
            console.log('Dados inseridos com sucesso no banco de dados', resultado.insertId);
    
            res.send('Dados inseridos com sucesso!') // Responde ao cliente indicando sucesso
        }catch (error) {
            console.error('ERRO AO ISERIR DADOS', error);  // Caso ocorra um erro, loga o erro e responde ao cliente com um erro 500
            res.status(500).send('ERRO AO INSERIR DADOS NO BANCO DE DADOS');
        }
    });
    // Retorna o roteador configurado para ser usado em outras partes da aplicação
    return router;
}
