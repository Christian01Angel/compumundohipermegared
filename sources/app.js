document.addEventListener('DOMContentLoaded', ()=>{
    iniciarApp();
})

function iniciarApp(){
    cargarMain();
}

function cargarMain(){
    var productos = document.querySelectorAll('.contenedor-productos');
    console.log(productos);
    productos[0].remove();
    productos[1].remove();
}