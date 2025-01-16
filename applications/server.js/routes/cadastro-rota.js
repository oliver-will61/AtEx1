import express from 'express'; // importa o framework Express para criar e gerenciar rotas
import bcrypt from 'bcrypt';  //biblioteca responsável por criptografar as senhas

// Cria uma nova instância do roteador do Express para definir rotas específicas
const router = express.Router(); 

// função que define as rotas de cadastro e recebe uma conexão com o banco de dados como argumentos
export default function cadastroRoute(connection){
    // Define uma rota POST para "/submit" para tratar o  envio de dados de cadastro
    router.post('/submit', async(req, res) => {
        console.log('Requisição recebida');  // Loga no console que a requisição foi recebida
    
        // obtém os dados do corpo da requisição (JSON enviado pelo cliente)
        const emailReq = req.body.email
        const senhaReq = await bcrypt.hash(req.body.senha, 10) ; // obtém a senha enviada pelo cliente e gera a criptografia
        const nomeReq = req.body.nome; // obtém o nome enviada pelo cliente
    
        
        try {
            
            //verifica se o usuário já tem uma conta
        
            const [rows] = await connection.execute(`
                SELECT * FROM usuarios WHERE email = ?`,
                [emailReq]
            );
            
            if(rows.length > 0){
                return res.status(400).json({
                    success: false,
                    message: 'E-mail já registrado!'
                })
            }
            
            // Caso o e-mail não exista, insere os dados no banco
            const resultado = await connection.execute(
                'INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?)', [nomeReq, emailReq, senhaReq] // parâmetros a serem inseridos no banco
            );
    
            console.log('Dados inseridos com sucesso no banco de dados', resultado.insertId);
    
            return res.json({
                success: true,
                message: 'Cadastro realizado com sucesso!'
            }) // Responde ao cliente indicando sucesso
        }catch (error) {
            console.error('ERRO AO ISERIR DADOS', error);  // Caso ocorra um erro, loga o erro e responde ao cliente com um erro 500
            res.status(500).send('ERRO AO INSERIR DADOS NO BANCO DE DADOS')
        }
    });
    // Retorna o roteador configurado para ser usado em outras partes da aplicação
    return router;
}
