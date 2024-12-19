import express from 'express' // importa o express
import cors from 'cors' // importa o cors
import bodyParser from 'body-parser'

const app = express()

const port = process.env.PORT || 3000 // define a porta do servidor 

//habilita o cors para todas as requisições
app.use(cors());

//Para interpretar JSON no corpo da requisição 
app.use(bodyParser.json());

// //registra a rota
// app.use('/', cadastroRoute);

// inicia o servidor, ouvindo a porta definida 
app.listen(port, ()=> {
    console.log(`Servidor iniciado na porta: ${port}`);
})
