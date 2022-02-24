$(document).ready(function(){
    $(".contacto_btn").click(function(e){
       
            let nombre_cliente = $("#nombreApellido")
            let email_cliente = $("#email").val()
            let telefono_cliente = $("#telefono").val()
            let mensaje_cliente = $("#mensaje").val()
        
           e.preventDefault()
    
            if ((nombre_cliente.val()=== "") || (nombre_cliente.val().length <= 3 ) || (!isNaN (nombre_cliente.val()) )) {
                mostrarError(true,"Ingresá un nombre correcto")
                console.log("algo anda mal")
                return false;
                } else {
                
                    mostrarError(false,"")
                }
                
        
             if ((email_cliente=== "") || (!emailValido(email_cliente)) ){
                 mostrarError(true,"Ingresá un Email correcto")
                 return false
             } else {
                 mostrarError(false,"")
             }
    
             if ((telefono_cliente == "") || (telefono_cliente.length <= 6) || (isNaN (telefono_cliente))){
                 mostrarError(true, "Debes Ingresar un telefono correcto !")
                 return false;
             }else{
                 mostrarError(false,"")
             }
        
        
             if((mensaje_cliente == "") || (mensaje_cliente.length <= 3 )){
                 mostrarError(true, "Debes Ingresar un mensaje correcto !")
                 return false;
             }else{
                 mostrarError(false,"")
             }
        
        
             function emailValido (email){
                 return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        
             }  
            
            
             swal({
                title: "El formulario ha sido cargado satisfactoriamente." ,
                text: "Nuestro equipo se comunicará con usted a la brevedad",
                icon: "success",
                button: "Salir",
              });
             
             
             guardarDatos()
    }) 
    
     //Funcion Mostrar el error
     function mostrarError(estado, mensaje) { 
         if(estado) {
           $(".resultado").html(`<p class="bg-danger text-center text-white"> ${mensaje} </p>`)
           
           }
          else {
             $("#resultado").html("")}
         
        
        }

        function mostrarMensaje(mensaje) { 
            
              $(".resultado").html(`<p class="bg-success text-center text-white"> ${mensaje} </p>`)
        
           
           }


     class Contacto {
        constructor(datos_formulario){
            this.nombre = datos_formulario.nombre;
            this.email = datos_formulario.email;
             this.telefono = datos_formulario.telefono;
            this.mensaje = datos_formulario.mensaje;
         }
    
     }
    
     function guardarDatos(){
         let nombre_cliente = document.getElementById("nombreApellido").value
         let email_cliente = document.getElementById("email").value
         let telefono_cliente = document.getElementById("telefono").value
         let mensaje_cliente = document.getElementById("mensaje").value
         let cont = new Contacto ({ nombre:nombre_cliente, email:email_cliente, telefono:telefono_cliente, mensaje:mensaje_cliente});
         const datosContacto = JSON.stringify(cont)
         localStorage.setItem("datos_formularios", datosContacto)
     }
    
     
    
})

   
        

            
       
          
           
           
           
        
        
          
          
        
       
       
       
   
          

  
  
    
   


 
   


  

     

    
    
    
    
    
    


