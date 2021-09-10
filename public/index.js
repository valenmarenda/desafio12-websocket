//usuario - cliente
// thumbnail
//let multer = require("multer");

/*let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    callback(null, `${file.fieldname}-${Date.now()}`);
  },
});*/




//guardar elementos
//let upload = multer({ storage });
let container = {};
let productos = [];
class Producto {
    constructor(title, precio) {
      this.id = productos.length + 1;
      this.title = title;
      this.precio = precio;
     // this.thumbnail = thumbnail;
    }
  }
  
  productos.push(new Producto("Chocolate", 450, "/chocolate.jpg"));
  productos.push(new Producto("Avena", 280, "/avena.jpg"));
  


//elementos WS
const socket=io()

let message = document.getElementById('message')
let price = document.getElementById('price')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')
//let img = document.getElementById('img')

btn.addEventListener("click", function(){ // tomamos la información desde el cliente
    socket.emit('cargaProductos', {      // emite datos 1 
        message:message.value, 
        price:price.value, 
       // img:img.value

    });

    productos.push(new Producto(message.value, price.value))
    console.log(productos)

    socket.on('cargaProductos', function(data){  // escucha datos 4 e imprime los datos 
        actions.innerHTML = ""
        output.innerHTML +=  `<p> 
        <strong> ${data.message} </strong> - ${data.price}
    
        </p>`
    
    })
});

    message.addEventListener('keypress', function(){  //ver de poner keyup 
        socket.emit('typingProducts', message.value);
    })


socket.on('typingProducts', function (data){
    actions.innerHTML = `<p> ${data} está cargando productos</p>` //variable.innerhtml para colocarlo en el div que quiero
})
    



//console.log(productos)