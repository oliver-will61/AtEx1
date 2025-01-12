import express from 'express';
import cookieParse from 'cookie-parser';

const app = express();

app.use(cookieParse());  // Middleware para ler cookies

app.get('/verifica-login', (req, res) => {
    const token = req.cookies.auth_token;

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