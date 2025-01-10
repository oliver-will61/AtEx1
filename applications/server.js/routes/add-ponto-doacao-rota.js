import express from 'express';
import { connectionPromise } from '../config/db.js';

const app = express();
app.use(express.json())

const router = express.Router() // Cria uma nova instância do roteador do Express para definir rotas separadas
router.post('/AddPontoDoacao', async (req, res) => {
    console.log('Requisição na rota de add ponto doalçao recebida');

    const usuarioIdReq = req.body.usuarioId; 
    const produtoReq = req. body.produto;
    const descricaoReq = req.body.descricao;
    const cepReq = req.body.cep;
    const cidadeReq = req.body.cidade;
    const  bairroReq = req.body.bairro
    const ruaReq = req.body.rua
    const numeroReq = req.body.numero
    
    try{
        const connetion = await connectionPromise  // Obtem a conexão com o banco
        await connetion.execute('INSERT INTO  pontos_de_doacao (idUsuario, produto, descricaoProduto, cep, cidade, bairro, rua, numero) VALUES (?,?,?,?,?,?,?,?)', 
            [usuarioIdReq, produtoReq, descricaoReq, cepReq, cidadeReq, bairroReq, ruaReq, numeroReq]
        ); 

        console.log('Dados inseridos com sucesso no banco de dados');

        res.json({ success: true, message:'Dados inseridos com sucesso no banco de dados'})  

    } catch (error) {
        console.error('ERRO AO INSERIR DADOS', error); // Caso ocorra um erro, loga o erro e responde ao cliente com um erro 500
        res.status(500).send('ERRO AO INSERIR DADOS NO BANCO DE DADOS');

    }
})

export default router;