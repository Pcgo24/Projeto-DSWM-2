const expressSession = require('express-session');

// Configuração do middleware de sessão
const sessionMiddleware = expressSession({
    secret: 'dondokasKeySuperSecreta', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }  
});

module.exports = sessionMiddleware;
