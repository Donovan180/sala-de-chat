const http = require('./app');

const port = 3000;

http.listen(port,()=>{
    console.log('El servidor esta corriendo en el puerto: ' ,port)
});