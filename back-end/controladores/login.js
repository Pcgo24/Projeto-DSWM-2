const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// Importa as credenciais do Firebase
const serviceAccount = require("../db/firebase.json");

// Inicializa o Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

// Conexão com o Firestore
const db = admin.firestore();
const userCollection = db.collection("users"); // Referência à coleção de usuários

// Rota de Login
router.post("/", async (req, res) => {
    const { token } = req.body;

    // Retorna erro se o token não for enviado pelo cliente
    if (!token) {
        return res.status(400).json({ message: "Token não fornecido" });
    }

    try {
        // Decodifica e valida o token enviado pelo cliente
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        // Busca o usuário no Firestore com base no UID decodificado
        const userSnapshot = await userCollection.where("uid", "==", uid).get();

        // Retorna erro se o usuário não existir no banco
        if (userSnapshot.empty) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        // Extrai os dados do usuário
        const user = userSnapshot.docs[0].data();

        // Salva informações essenciais do usuário na sessão
        req.session.user = {
            userId: userSnapshot.docs[0].id,
            email: user.email,
        };

        // Retorna sucesso com o ID do usuário
        res.status(200).json({
            message: "Login bem-sucedido!",
            userId: userSnapshot.docs[0].id,
        });
    } catch (error) {
        // Trata erros relacionados ao token
        res.status(401).json({ message: "Token inválido ou expirado", error: error.message });
    }
});

module.exports = router;
