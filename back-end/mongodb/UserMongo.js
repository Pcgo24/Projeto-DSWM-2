// Configurando o Schema do usuário
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // Importando o bcrypt

const userSchema = new mongoose.Schema({
    uid: {  // User ID que será gerado automaticamente
        type: String,
        required: true,
        unique: true,
    },
    name: {  // Nome do usuário obrigatório
        type: String,
        required: true,
    },
    email: {  // Email do usuário obrigatório e único
        type: String,
        required: true,
        unique: true,
    },
    password: {  // Senha do usuário obrigatória
        type: String,
        required: true,
    }
});

// Middleware para criptografar a senha antes de salvar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();  // Verifica se a senha foi modificada

    // Esse aqui é só para criptografar a senha

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);  // Criptografa a senha
        this.password = hashedPassword;  // Armazena a senha criptografada
        next();
    } catch (error) {
        next(error);
    }
});

const UserMongo = mongoose.model('User', userSchema);
module.exports = UserMongo;
