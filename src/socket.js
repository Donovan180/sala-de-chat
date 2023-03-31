const { Socket } = require('socket.io');
const Chat = require('../src/models/mensajes');
module.exports = (http) => {
    const io = require('socket.io')(http);

    io.on('connection', async (socket) => {
        console.log('User connected.');

        //let mensajes = await Chat.find({});
         // Obtener los mensajes de la base de datos y emitirlos al cliente
        await Chat.find().then((msg) => {
            io.emit('chat-message-db', msg);
        });
        
        socket.on('chat-message', async (msg) => {
            let datos = new Chat({
                nombre: msg.nombre,
                message: msg.message,
                date: msg.date
            });
            await datos.save();
            io.emit('chat-message', msg);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected.');
        });

        // Manejar la búsqueda de mensajes
        socket.on('search', async (query) => {
            
                await Chat.find({ message: { $regex: query } }).then((msg) => {
                    socket.emit('searchResults', msg);
                    //console.log(msg);
                });
           
        });

    });
}