const mongoose = require('mongoose');

const { Schema } = mongoose;

const ChatSchea = new Schema({
    nombre: String,
    message: String,
    date: Date
    // fecha: {
    //     type: Date,
    //     default: Date.now
    // }
});

module.exports= mongoose.model('Chat', ChatSchea);