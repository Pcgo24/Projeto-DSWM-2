const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./db/firebase.json'); 
const sessionMiddleware = require('./middleware/sessionMiddleware');
const cookieParser = require('cookie-parser');

const app = express();

// Inicializa o Firebase Admin SDK, caso ainda não tenha sido feito
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

// Configura o CORS para permitir comunicação com o frontend específico e com credenciais
app.use(cors({
    origin: 'http://localhost:3000',  // Apenas o frontend especificado pode acessar
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true  // Permite o envio de cookies/cabeçalhos de sessão
}));

// Middleware para analisar o corpo da requisição como JSON e parsear cookies
app.use(express.json());  
app.use(cookieParser());

// Middleware de sessão
app.use(sessionMiddleware);

// Configuração de Content Security Policy (CSP) para restringir carregamento de recursos
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' http://fonts.gstatic.com;");
    next();
});

// Definição da rota de usuários (alterando de '/user' para '/usuario' para melhor legibilidade)
app.use('/usuario', require('./controladores/UserRoutes'));

// Define a porta do servidor, usando a variável de ambiente ou 8000 como padrão
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
