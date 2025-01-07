import express from 'express';
import bcrypt from 'bcrypt';
import {connetionPromise} from '../config/db';

const app = express();
app.use(express.json()) // Middleware para analisar JSON

const router = express.Router() // Cria uma nova instância do roteador do Express para definir rotas separadas
router.post('/login', async (req, res) => {
    console.log('Requisição de login recebida');


    // Dados do login recebidos no body da requisição
    const emailLogin = req.body.email
    const senhaLogin = req.body.senha

    try {
        const connetion = await connetionPromise  // Obtem a conexão com o banco

        //Executa uma consulta SQL para selecionar o email e a senha da tabela 'usuarios'
        const [rows] = await connetion.execute('SELECT email, senha FROM usuarios WHERE email = ?', [emailLogin])

        if (rows.length === 0){
            //email não encontrado no banco, o que significa que não foi cadastrado
            return res.status(401).json({success: false, message: 'Usuário não encontrado'})
        }

        const usuario = rows[0] // obtém o primeiro e único resultado
        const senhaValida = await bcrypt.compare(senhaLogin, usuario.senha) // Compara a senha inserida com o hash armazenado

        if(!senhaValida) {
            // se a senha estiver errada ou seja diferente de vardadeiro
            return res.status(401).json({sucess: false, message: 'Senha incorreta'})
        }

        // se o login for bem-sucedido 
        res.json({sucess: true, message: 'Login bem-sucedido'})

    } catch (error) {
        console.error('Erro ao processar o login', error);
        res.status(500).json({sucess: false, menssage: 'Erro interno ao servidor'})
    }

})

// Exporta o objeto 'router' como o valor padrão deste módulo
export default router 

