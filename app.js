const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const puerto = 9013;

app.use(express.static('./public'));

app.get('/',(req,res)=>{
    res.send('index.html');
    
})

const allProducts = []
app.get("/productos", (req,res)=>{
  res.json(allProducts)
})
//websocket
io.on("connection", (socket)=>{
    console.log("cliente conectado", socket.id)
   socket.on('cargaProductos', (data)=>{ //escucha del evento 2
       io.sockets.emit('cargaProductos', data) // emite datos 3
       allProducts.push({product: data.value, id: socket.id})
   })

   socket.on ("typingProducts", ()=>{
     socket.broadcast.emit("typingProducts", socket.id)  //lo ven todos menos el cliente que está cargando 
     
   })

})
console.log(allProducts)

http.listen(puerto, ()=>{
    console.log('Init WS');
})
