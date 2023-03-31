const express = require('express');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/chat-database')
.then(db=>console.log('db conect'))
.catch(err=>console.log('Error: '+err));

// app.get('/',(req, res)=>{
//     res.send('Hi dono');
// });
app.use(express.static(__dirname + '/../public'));

const http = require('http').createServer(app);

const socket = require('./socket');
socket(http);

module.exports = http;