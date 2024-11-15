const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const mongoose = require("mongoose");
const UserMongo = require("../mongodb/UserMongo");
const bcrypt = require("bcrypt");

const serviceAccount = require("../db/firebase.json");

// Inicializa o Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();
const userCollection = db.collection("users");

// Conecta ao MongoDB usando a URL do ambiente
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Conectado ao MongoDB"))
.catch(err => console.error("Erro ao conectar ao MongoDB:", err));

/*Padrão de Projeto: Factory Method
A criação do usuário é feita em três etapas, criar o usuário no Firebase Authentication, no Firestore e no MongoDB.
As operações de criação para Firebase e MongoDB são tratadas separadamente, e a lógica de criação do usuário é organizada para 
que cada operação seja facilmente modificada ou substituída sem afetar outras partes do código.*/

router.post("/", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verifica se já existe um usuário com o mesmo email
        const userExistent = await userCollection.where('email', '==', email).get();
        if (!userExistent.empty) {
            return res.status(409).json({ message: "Já existe alguém com esse email" });
        }

        // Cria o usuário no Firebase Authentication
        const newUser = await admin.auth().createUser({
            email,
            password,
            displayName: name,
        });

        const userId = newUser.uid;

        /*Padrão de Projeto: Singleton
        O Firebase Admin SDK é usado aqui para criar um usuário no Firebase Authentication. O padrão Singleton é aplicado na inicialização 
        do Firebase*/


        const userMongo = new UserMongo({
            uid: userId,
            name,
            email,
            password,
        });

        // Criptografa a senha antes de salvar no Firestore e MongoDB
        const hashedPassword = await bcrypt.hash(password, 10);

        // Salva o usuário no Firestore
        await userCollection.doc(userId).set({
            uid: userId,
            name,
            email,
            password: hashedPassword
        });

        // Salva o usuário no MongoDB
        await userMongo.save();

        res.status(201).json({
            message: "Cadastro realizado com sucesso!",
            userId: newUser.uid, // Retorna o UID do novo usuário no Firebase
        });
    } catch (error) {
        // Trata erros durante o processo de cadastro
        console.log('Erro ao cadastrar usuário:', error);
        res.status(400).json({ message: "Erro ao cadastrar usuário", error: error.message });
    }
});

module.exports = router;
