// Importando o Mongoose
const mongoose = require('mongoose');

// Configurando o Schema do Feedback
const feedbackSchema = new mongoose.Schema({
    feedbackText: { 
        type: String,
        required: true,
    },
    createdAt: {  // Data de criação do feedback
        type: Date,
        default: Date.now,  // Data atual será o valor padrão
    }
});

// Criando o modelo do Feedback
const FeedbackMongo = mongoose.model('Feedback', feedbackSchema);

module.exports = FeedbackMongo;
