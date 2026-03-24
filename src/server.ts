import express from 'express';
//import { router } from './routes';
import { usuarioRoutes } from './routes/usuario.routes';


const app = express();

// Middlewares globais
app.use(express.json());

// Injetando as rotas
app.use(usuarioRoutes);


const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`🚀 Servidor rodando na porta ${PORTA}`);
});


