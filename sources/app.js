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
            //Hago destructuring de los atributos:
            var {title, price, description, image} = producto;
            
            //creo el div card
            const card = document.createElement('DIV');
            card.classList.add('card');
            card.style= 'width: 26rem;';
            
            //imagen del producto
            const imagen = document.createElement('IMG');
            imagen.src = `${image}`;
            imagen.classList.add('card-img-top');
            imagen.name= `${title}`;
            imagen.alt = `${title}`;

            //div cuerpo de la card
            const bodyCard = document.createElement('DIV');
            bodyCard.classList.add('card-body');

            //titulo h5
            const nombre = document.createElement('H5');
            nombre.textContent = `${title}`;
            nombre.classList.add('card-title');

            //p-precio producto
            const precio = document.createElement('P');
            precio.classList.add('card-text');
            //Suponinendo que el precio esta en dolares, lo multiplico por 1030 para pasarlo a un valor aproximado en pesos
            precio.textContent = `$${price*1030}`;

            //p-detalle producto
            const detalle = document.createElement('P');
            detalle.classList.add('card-text');
            detalle.textContent = `${description}`;

            //boton de compra (agregar al carrito) con una funcion para agregar el producto al carrito
            const botonComprar = document.createElement('A');
            botonComprar.classList.add('btn');
            botonComprar.classList.add('btn-primary')
            botonComprar.text = 'Agregar al Carrito'.toUpperCase();
            
            //Agrego los elementos por orden al card
            bodyCard.appendChild(nombre);
            bodyCard.appendChild(precio);
            bodyCard.appendChild(detalle);
            bodyCard.appendChild(botonComprar);
            
            card.appendChild(imagen);
            card.appendChild(bodyCard);
            
            //Agrego la card al contenedor de productos.
            contenedorProductos.appendChild(card);
        });

    }catch (error){
        console.log(`Ah ocurrido un error: ${error}`)
    }
    
}