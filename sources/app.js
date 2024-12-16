document.addEventListener('DOMContentLoaded', ()=>{
    iniciarApp();
})

function iniciarApp(){
    cargarMain();
}

async function cargarMain(){

    try{
        const resultado = await fetch('https://fakestoreapi.com/products/category/electronics');
        const productos = await resultado.json();
        console.log(productos);

        const contenedorProductos = document.querySelector('#contenedor-productos')

        productos.forEach(producto => {
            //creo el div card

            //imagen

            //div cuerpo de la card

            //titulo h5

            //p-precio producto

            //p-detalle prpoducto

            //boton de compra (agregar al carrito) con una funcion para agregar el producto al carrito

            //reseña


        });

    }catch (error){
        console.log(`Ah ocurrido un error: ${error}`)
    }
    
}