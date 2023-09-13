// servidor HTTP

const http = require('http');
const port = 3000;
const host = "localhost";

// Definir la lista de tareas
const tasks = [
    { id: 1, descripcion: 'Organizar menu de la semana', estado: "pendiente" },
    { id: 2, descripcion: 'Revisar los compromisos de la semana', estado: "completado" },
    { id: 3, descripcion: 'Estudiar Node.js', estado: "pendiente" }
  ];


const server = http.createServer((req, res)=>{
    if(req.method === 'GET' && req.url === '/tareas'){
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks));
    }else{
        res.statusCode = 404;
        res.end('Recurso no encontrado');
    } 
}) 

server.listen(port, host, ()=>{
    console.log("Servidor encendido");
})

