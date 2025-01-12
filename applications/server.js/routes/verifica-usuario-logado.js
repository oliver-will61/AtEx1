import express from 'express';
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json())
app.use(cookieParser());  // Middleware para ler cookies

const router = express.Router()// Cria uma nova instância do roteador do Express para definir rotas separadas


router.get('/verifica-login', (req, res) => {
    console.log('Cookies recebidos:', req.cookies); // para depurar
    const token = req.cookies?.auth_token;  // operador de encadeamento opcional (?)
/*
req.cookies seja undefined, o código não causará erro porque a validação com ?. garante que não tentaremos acessar auth_token em algo que não existe.
*/
    if (!token) {
        return res.json({
            success: false, 
            message: 'Usuario não logado'
        })
    }

    return res.json({
        success: true,
        message: 'Usuario está logado'
    });
});


export default router;