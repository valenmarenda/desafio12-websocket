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
    constructor(title, precio, img) {
      this.id = productos.length + 1;
      this.title = title;
      this.precio = precio;
      this.img = img
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
let img = document.getElementById('img')
let myTemplate= document.querySelector("#myTemplate")
let toRender = document.querySelector("#toRender")

btn.addEventListener("click", function(){ // tomamos la información desde el cliente
    socket.emit('cargaProductos', {      // emite datos 1 
        message:message.value, 
        price:price.value, 
        img:img.value

    });

    productos.push(new Producto(message.value, price.value, img.value))
    console.log(productos)
    
    let template = ejs.compile(myTemplate.innerHTML)
    toRender.innerHTML = template({items:["hola"]})



    socket.on('cargaProductos', function(data){  // escucha datos 4 e imprime los datos 

        actions.innerHTML = "";
        output.innerHTML +=  `
        <ul id="table" >
        <li>
        producto - precio - imagen
        </li>
        <li>
        <p> 
        <strong> ${data.message} </strong> - $ ${data.price} 
        <img id="imgProduct" src="${data.img}"> 
        </p>
        </li>
        <ul>`
    
    });

});

    message.addEventListener('keypress', function(){  
        socket.emit('typingProducts', message.value);
    })


socket.on('typingProducts', function (data){
    actions.innerHTML = `<p> ${data} está cargando productos</p>` //variable.innerhtml para colocarlo en el div que quiero
})
    



//console.log(productos)