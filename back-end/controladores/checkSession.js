const express = require('express');
const router = express.Router();

// Verifica se o usuário está logado verificando a sessão
router.get('/', (req, res) => {
    // Se a sessão do usuário existir, significa que ele está logado
    if (req.session.user) {
        return res.status(200).json({ message: "Usuário está logado" });
    } else {
        // Se não existir, retorna um erro 401 (não autorizado)
        return res.status(401).json({ message: "Usuário não está logado" });
    }
});

module.exports = router;
