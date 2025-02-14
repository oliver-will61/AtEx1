import express from 'express';
import {connectionPromise} from '../config/db.js'

const app = express();
app.use(express.json())

const router = express.Router()
router.post('/puxaPontosDoacoes', async(req, res) => {
    console.log('Requisição recebida');

    try{
        const connection = await connectionPromise
        const [rows] = await connection.execute(`
            SELECT 
                pontos_de_doacao.*,
                usuarios.nome,
                usuarios.email
            FROM 
                pontos_de_doacao
            INNER JOIN 
            	usuarios
        	ON 
        	    pontos_de_doacao.idUsuario = usuarios.id;
        	    `)

    
        return res.status(200).json({
            success: true,
            message: 'Consulta bem sucedida',
            data: rows // os pontos de doações extraidos do banco
        });

    } catch (error) {
        console.error('Erro ao processar o login', error);
        res.status(500).json({
            sucess: false,
            message: 'Erro interno ao servidor'
        });
    }
});

export default router;