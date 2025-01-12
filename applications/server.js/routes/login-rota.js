import express from 'express';
import bcrypt from 'bcrypt';
import {connectionPromise} from '../config/db.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json()) // Middleware para analisar JSON
app.use(cookieParser()) // Middleware para ler cookies

const router = express.Router() // Cria uma nova instância do roteador do Express para definir rotas separadas

router.post('/login', async (req, res) => {

    console.log('Requisição de login recebida');

    // Dados do login recebidos no body da requisição
    const emailLogin = req.body.email
    const senhaLogin = req.body.senha

    try {
        const connetion = await connectionPromise  // Obtem a conexão com o banco

        //Executa uma consulta SQL para selecionar o email e a senha da tabela 'usuarios'
        const [rows] = await connetion.execute('SELECT email, senha, id, nome FROM usuarios WHERE email = ?', [emailLogin])

        // Usuario não encontrado =========================================================================================

        if (rows.length === 0){
            //email não encontrado no banco, o que significa que não foi cadastrado
            return res.status(401).json({success: false, message: 'Usuário não encontrado'})
        }

        const usuario = rows[0] // obtém o primeiro e único resultado
        const senhaValida = await bcrypt.compare(senhaLogin, usuario.senha) // Compara a senha inserida com o hash armazenado

        if(!senhaValida) {
            // se a senha estiver errada ou seja diferente de vardadeiro
            return res.status(401).json({success: false, message: 'Senha incorreta'})
        }

        //Usuario encontrado ===========================================================================================

        const token = 'token_temporario' // Este seria o token JWT ou outro identificador, criptografar dps

        res.cookie('auth_token', token, { // Envia o token de autenticação como cookie
                httpOnly: false, // Não acessível via JavaScript (mais seguro)
                secure: process.env.NODE_ENV === 'production', //Garantir que só seja enviado via HTTPS em produção
                maxAge: 3600000 // tempo de expiração em milissegundos (1 hora)
        });
        

        return res.status(200).json({
            success: true, 
            message: 'Login bem-sucedido',
            userInfo: { // coleta informações de login do usaurio 
                id: usuario.id,
                email: usuario.email,
                nome: usuario.nome
            }
        })
        
        
    } catch (error) {
        console.error('Erro ao processar o login', error);
        res.status(500).json({success: false, message: 'Erro interno ao servidor'})
    }

})

// Exporta o objeto 'router' como o valor padrão deste módulo
export default router 

