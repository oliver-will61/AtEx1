import express from 'express';
import { connectionPromise } from '../config/db.js';
import multer from 'multer';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//configura o armazenamento do multer para salvar os arquivos em um diretório específico

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './image_data_base') // define o diretório onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Gera um nome único para o arquivo
    }
});

// Cria o middleware para o upload de arquivos
const upload = multer({
    storage,
    limits: {fileSize: 10 * 1024 * 1024},   // Limite de 10MB
    
});   

const app = express();
app.use(express.json()) // Usado para lidar com o JSON no corpo da requisição

// Adiciona o middleware para servir arquivos estáticos da pasta 'image_data_base'

const imageBasePath = path.resolve(__dirname, '..', 'image_data_base');
console.log('Caminho resolvido para a pasta de imagens:', imageBasePath);

app.use('/images', express.static(imageBasePath));



const router = express.Router() // Cria uma nova instância do roteador do Express para definir rotas separadas
router.post('/AddPontoDoacao', upload.single('imagem'), async (req, res) => {
    console.log('Requisição na rota de add ponto doalçao recebida');

    const usuarioIdReq = req.body.usuarioId; 
    const produtoReq = req. body.produto;
    const descricaoReq = req.body.descricao;
    const cepReq = req.body.cep;
    const cidadeReq = req.body.cidade;
    const  bairroReq = req.body.bairro
    const ruaReq = req.body.rua
    const numeroReq = req.body.numero
    const imagemPath = req.file ? `images/${req.file.filename}` : null;  // Verifica se uma imagem foi enviada e pega o caminho do arquivo
    
    try{
        const connection = await connectionPromise  // Obtem a conexão com o banco
        await connection.execute('INSERT INTO  pontos_de_doacao (idUsuario, produto, descricaoProduto, cep, cidade, bairro, rua, numero, imagemCaminho) VALUES (?,?,?,?,?,?,?,?,?)', 
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