
let carritoDeCompras =  []
const tablaDeCompras = document.querySelector(" #lista-carrito tbody");
const carritoBtn = document.querySelector("#carrito")
const vaciarCarrito= document.querySelector("#vaciar-carrito")
const carritoVacio = document.querySelector(".carrito-vacio")




document.addEventListener('DOMContentLoaded', () => {
    // mostrarProductosDOM(datos)
    vaciarCarroDeCompras()
    traerDatos()
    
    
});

document.addEventListener('DOMContentLoaded', () => {
    carritoDeCompras = JSON.parse(localStorage.getItem("carrito")) || [] 
    pintarCarritoHTML()

});

       
       
carritoBtn.addEventListener("click",function  (e){

    if(e.target.classList.contains("button-add")){
        const productoSeleccionado =  e.target.parentElement.parentElement;
        capturarDatosProductos(productoSeleccionado)
           
        efectoCarrito()    
        }
})

function traerDatos(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","prod.json",true)

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if (this.readyState ==4 && this.status == 200){
            let datos = JSON.parse(this.responseText);
            console.log(datos)

        let remeras = "";

        for( let producto of datos){

            remeras+=`
            <div class="col-lg-3 col-md-6 col-sm-6 mt-2 ">

                <div class="card m-3">
                    <img loading="lazy"   src="img/${producto.imagen}" class="card-img-top" alt=${producto.nombre}>
                    <div class="card-body text-center">
                        <h5 class="card-title ">${producto.nombre}</h5>
                        <button id="botonCarrito" class="btn-danger button-add" data-id=${producto.id}>Agregar al Carrito</button>
                    </div>
                    <h5 class="alert-talle"></h5>
                    <form class="formulario text-center m-3 ">
                     
                        <div class="precio">
                        
                        <p>${producto.precio}</p>
                        </div>
                    </form>
                </div>
                        
            </div>  `


        }
    
        document.getElementById("carrito").innerHTML = remeras; 



            }

        }

}

    
   
function efectoCarrito(){
    $("#img-carrito").css({"transform": "rotate(360deg)", "transition": "1s"  })  
     $("#img-carrito").animate({"width":"130px", },1000)
    
    
}


// funcion que crea el objeto con los productos y aumenta la cantidad del mismo cuando tienen el mismo id  
function capturarDatosProductos (producto){
    
     // Objetos con la info del producto
    const cadaProducto = {
        img: producto.querySelector("img").src,
        nombre: producto.querySelector(".card-title").textContent,
        precio: producto.querySelector(".precio").textContent, 
        cantidad: 1,
        id: producto.querySelector("button").getAttribute("data-id")
    }
    //Aumentar la cantidad en 1
    const existe = carritoDeCompras.some(remeras => remeras.id === cadaProducto.id) // revisar si el producto existe en el carrito
    if(existe){ // Si da true y existe actualizo la cantidad
        const remeras = carritoDeCompras.map(remera =>{ // tengo que iterar sobre cada remera en el carrito
            if (remera.id === cadaProducto.id){ // si coinciden los cursos (el que esta en el carrito y el que quiero agregar)
                remera.cantidad += 1 // aumento la cantidad en 1
                return remera // devuelve el objeto actualizando cantidad
            }else{ 
                return remera // devuelve el objeto 
            }
        })
      
    }
    else{
        carritoDeCompras= [...carritoDeCompras, cadaProducto];
    }

    
    // Finalizado todo pinto en el html en carrito actualizado
 
    pintarCarritoHTML()
}
 
// Funcion que pinta en el submenu los productos 
function pintarCarritoHTML () {
    //HTML Vacio
    tablaDeCompras.innerHTML=""
    // HTML con productos de a 1
    carritoDeCompras.forEach(remeras =>{
        // precioTotal.innerHTML=""
        
        const filaCarrito = document.createElement("tr")
        // 
        filaCarrito.innerHTML = 
        `
        <td class="text-center"> <img src=${remeras.img} width="50"> </td>
        <td class="text-center"> ${remeras.nombre} </td>
        <td class="text-center">${remeras.precio}</td>
        <td class="text-center">${remeras.cantidad}</td>  
        
        <td>
            <a href="#" class="borrar-remera" data-id="${remeras.id}">X</a>
        </td>

            `
    tablaDeCompras.appendChild(filaCarrito)
   
   })

   // agregar carrito al storage
   
    actualizarStorage()
}

function actualizarStorage(){
    localStorage.setItem("carrito",JSON.stringify(carritoDeCompras))
    let carritoStorage = JSON.parse(localStorage.getItem("carrito")) 
}

// Evento de Borrar individualmente los productos
const borrarProducto = document.getElementById("lista-carrito").addEventListener("click", (e)=>{
   if(e.target.classList.contains("borrar-remera")){
     const  productoAEliminar = e.target.getAttribute("data-id")
     carritoDeCompras = carritoDeCompras.filter(remeras => remeras.id !== productoAEliminar) 
     $("#img-carrito").animate({"width":"65px", },1000)
     pintarCarritoHTML()
      
   }
 
})

// Funcion vaciar carrito
function vaciarCarroDeCompras(){
    vaciarCarrito.addEventListener("click", ()=>{
        tablaDeCompras.innerHTML=""
       carritoDeCompras= []
        localStorage.clear()
        $("#img-carrito").animate({"width":"40px", },1000)
        
    })
    

}















