document.addEventListener('DOMContentLoaded', ()=>{
    iniciarApp();
})

var contadorCarrito = 0;

var carrito = [];

function iniciarApp(){
    cargarMain();
}

async function cargarMain(){

    try{
        const resultado = await fetch('https://fakestoreapi.com/products/category/electronics');
        const productos = await resultado.json();
        // console.log(productos);

        const contenedorProductos = document.querySelector('#contenedor-productos')

        productos.forEach(producto => {
            //Hago destructuring de los atributos:
            var {title, price, description, image, id} = producto;
            console.log(id);
            
            //creo el div card
            const card = document.createElement('DIV');
            card.classList.add('card');
            card.style= 'width: 26rem;';
            card.dataset.id = `${id}`;
            
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
            botonComprar.addEventListener('click', e => agregarCarrito(e))
            
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

function agregarCarrito(e){
    console.log(e.target);
    const boton = e.target;
    
    const spanContadorCarrito = document.querySelector('.contadorCarrito')
    let cardActual = boton.parentElement.parentElement;
    let bodyCard = cardActual.firstChild.nextSibling;
    // console.log(cardActual)
    
    if (boton.text == 'agregar al carrito'.toUpperCase()) {
        boton.text = 'Quitar el carrito'.toUpperCase();
        contadorCarrito +=1;

        // console.log(cardActual.firstChild.nextSibling);

        carrito[parseInt(cardActual.dataset.id)]= {
            id: parseInt(cardActual.dataset.id),
            img: cardActual.firstChild.src,
            nombre : bodyCard.firstChild.textContent,
            precio: bodyCard.firstChild.nextSibling.textContent,
        }
    }
    else{
        boton.text = 'agregar al carrito'.toUpperCase();
        contadorCarrito -=1;
        delete(carrito[parseInt(cardActual.dataset.id)]);
    }

    if (contadorCarrito == 0) {
        spanContadorCarrito.textContent = '';
    }
    else{
        spanContadorCarrito.textContent = `${contadorCarrito}`;
    }
    console.log(contadorCarrito)
    console.log(carrito)
}