const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const handlebars = require("express-handlebars");

const puerto = 9013;

const mensajes=[]
app.engine(
    "hbs",
    handlebars({
      layoutsDir: __dirname + "/views/layouts",
      extname: "hbs",
      defaultLayout: "index.hbs",
    })
  );
  
app.set("view engine", "hbs");

app.use(express.static('./public'));

app.get('/',(req,res)=>{
    res.send('index.html');
    
})


//websocket
io.on("connection", (socket)=>{
    console.log("cliente conectado", socket.id)
   socket.on('cargaProductos', (data)=>{ //escucha del evento 2
       io.sockets.emit('cargaProductos', data) // emite datos 3
   })

   socket.on ("typingProducts", ()=>{
     socket.broadcast.emit("typingProducts", socket.id)  //lo ven todos menos el cliente que está cargando 
     
   })

})


http.listen(puerto, ()=>{
    console.log('Init WS');
})
