// Importando o módulo do Firebase Admin
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const mongoose = require('mongoose');
const FeedbackMongo = require('../mongodb/FeedBackMongo');

const serviceAccount = require("../db/firebase.json");

// Inicialização do Firebase Admin SDK (não é um padrão diretamente, mas uma configuração inicial)
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

// Usar a inicialização do Firebase que já foi feita no server.js
const db = admin.firestore();
const feedbackCollection = db.collection('feedbacks');

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

/*Padrão de Projeto: Factory Method
A classe `FeedbackFactory` implementa um padrão de projeto de criação, 
o Factory Method, que cria feedbacks tanto no Firestore quanto no MongoDB*/

class FeedbackFactory {
    static async createFeedback(feedbackText) {
        // Adicionar feedback no Firestore
        const feedbackDoc = await feedbackCollection.add({
            feedbackText,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Adicionar feedback no MongoDB
        const feedbackMongo = new FeedbackMongo({
            feedbackText,
        });
        await feedbackMongo.save();

        return {
            firestoreId: feedbackDoc.id,
            mongoId: feedbackMongo._id,
        };
    }
}

// Rota para criar um novo feedback
router.post('/create', async (req, res) => {
    const { feedbackText } = req.body;

    if (!feedbackText) {
        return res.status(400).json({ message: 'O texto do feedback é obrigatório' });
    }

    try {
        // Usando o padrão Factory Method para criar feedback
        const feedbackIds = await FeedbackFactory.createFeedback(feedbackText); // Usar a fábrica
        res.status(201).json({
            message: 'Feedback enviado com sucesso!',
            feedbackFirestoreId: feedbackIds.firestoreId,
            feedbackMongoId: feedbackIds.mongoId,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao salvar feedback', error: error.message });
    }
});

// Rota para obter todos os feedbacks
router.get('/all', async (req, res) => {
    try {
        // Obter feedbacks do Firestore
        const feedbacksSnapshot = await feedbackCollection.orderBy('createdAt', 'desc').get();
        const feedbacks = feedbacksSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                feedbackText: data.feedbackText,
                createdAt: data.createdAt ? data.createdAt.toDate().toLocaleString() : "Data não disponível"
            };
        });

        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar feedbacks', error: error.message });
    }
});

module.exports = router;

/* */
