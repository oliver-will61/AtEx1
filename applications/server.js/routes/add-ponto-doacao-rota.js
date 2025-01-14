import express from 'express';
import { connectionPromise } from '../config/db.js';
import multer from 'multer';

//configura o armazenamento do multer para salvar os arquivos em um diretório específico

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../image_data_base') // define o diretório onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        cb(null, Data.now() + '-' + file.originalname);  // Gera um nome único para o arquivo
    }
});

const upload = multer({storage: storage});   // Cria o middleware para o upload de arquivos

const app = express();
app.use(express.json()) // Usado para lidar com o JSON no corpo da requisição

const router = express.Router() // Cria uma nova instância do roteador do Express para definir rotas separadas
router.post('/AddPontoDoacao', upload.single('image'), async (req, res) => {
    console.log('Requisição na rota de add ponto doalçao recebida');

    const usuarioIdReq = req.body.usuarioId; 
    const produtoReq = req. body.produto;
    const descricaoReq = req.body.descricao;
    const cepReq = req.body.cep;
    const cidadeReq = req.body.cidade;
    const  bairroReq = req.body.bairro
    const ruaReq = req.body.rua
    const numeroReq = req.body.numero
    const imagemPath = req.file ? req.file.path : null; // // Verifica se uma imagem foi enviada e pega o caminho do arquivo
    
    try{
        const connection = await connectionPromise  // Obtem a conexão com o banco
        await connection.execute('INSERT INTO  pontos_de_doacao (idUsuario, produto, descricaoProduto, cep, cidade, bairro, rua, numero, imagem) VALUES (?,?,?,?,?,?,?,?,?)', 
            [usuarioIdReq, produtoReq, descricaoReq, cepReq, cidadeReq, bairroReq, ruaReq, numeroReq, imagemPath]
        ); 

        console.log('Dados inseridos com sucesso no banco de dados');

        res.json({ success: true, message:'Dados inseridos com sucesso no banco de dados'})  

    } catch (error) {
        console.error('ERRO AO INSERIR DADOS', error); // Caso ocorra um erro, loga o erro e responde ao cliente com um erro 500
        res.status(500).send('ERRO AO INSERIR DADOS NO BANCO DE DADOS');

    }
})

export default router;