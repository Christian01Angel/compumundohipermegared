document.addEventListener('DOMContentLoaded', ()=>{
    iniciarApp();
})

var contadorCarrito = 0;

var carrito = [];

function iniciarApp(){
    cargarMain();
    detectarPantalla();
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

    //Asociamos una funcion al boton del carrito
    const btnsCarrito = document.querySelectorAll('.carrito')
    btnsCarrito.forEach(btnCarrito => {
        btnCarrito.addEventListener('click', () => {
            mostrarCarrito();
        })
    });

    //Asociamos una funcion al boton de busqueda
    const btnsBuscar = document.querySelectorAll('.btn-buscar');
    btnsBuscar.forEach(btnBuscar => {
        btnBuscar.addEventListener('click', (e) =>{
            buscar(e);
        })
    })

    //Asociamos una funcion al input de busqueda
    const inputsBusqueda = document.querySelectorAll('.input-busqueda');

    inputsBusqueda.forEach(inputBusqueda => {
        inputBusqueda.addEventListener('input', (e) => {
            buscar(e);
        })
    })
    
}

function agregarCarrito(e){
    console.log(e.target);
    const boton = e.target;
    
    let spanContadorCarrito = document.querySelectorAll('.contadorCarrito')
    let cardActual = boton.parentElement.parentElement;
    let bodyCard = cardActual.firstChild.nextSibling;
    // console.log(cardActual)

    //Si la pantalla es mayor a 992, el span de contador carrito será el 1ero a tener en cuenta, y la pantalla es menor a 992px se tomará en cuenta el segundo span contador
    if (screen.width < 992) {
        spanContadorCarrito = spanContadorCarrito[1];
    }
    else if (screen.width > 992) {
        spanContadorCarrito = spanContadorCarrito[0];
    }

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

function detectarPantalla(){
    console.log(`El ancho de tu pantalla es de: ${screen.width}`);

    const navNormal = document.querySelector('.nav-normal');
    const navResponsivo = document.querySelector('.nav-responsivo');
    const buscador = document.querySelectorAll('.buscador');

    if (screen.width < 992){
        navNormal.classList.remove('ver');
        navNormal.classList.add('no-ver');
        navResponsivo.classList.remove('no-ver');
        navResponsivo.classList.add('ver');
        buscador[0].classList.remove('no-ver');
        buscador[0].classList.add('ver');
        buscador[1].classList.remove('ver');
        buscador[1].classList.add('no-ver');
    }
    else if (screen.width > 992){
        navNormal.classList.remove('no-ver');
        navNormal.classList.add('ver');
        navResponsivo.classList.remove('ver');
        navResponsivo.classList.add('no-ver');
        buscador[0].classList.add('no-ver');
        buscador[0].classList.remove('ver');
    }
    // console.log(buscador);
}

function mostrarCarrito(){

    let navBar;
    // console.log(document.querySelector('.mostrar-carrito'))

    //verificamos si ya existe el div que muestre los productos del carrito, si existe lo removemos, y sino lo creamos.

    if(document.querySelector('.mostrar-carrito') != null){
        document.querySelector('.mostrar-carrito').remove();
    }else{
        const divCarrito = document.createElement('DIV'); //Div que va a contener y mostrar toda la informacion del carrito
        divCarrito.classList.add('ver');
        divCarrito.classList.add('mostrar-carrito');
        
        const headerCarrito = document.createElement('DIV'); //Div que va a contener el titulo y un boton para cerrar el carrito
        headerCarrito.classList.add('offcanvas-header');
        
        const tituloCarrito = document.createElement('H2');
        tituloCarrito.textContent = 'Carrito de compras'.toUpperCase();
        tituloCarrito.classList.add('text-center');

        const btnCerrar = document.createElement('BUTTON');
        btnCerrar.type = 'buton';
        btnCerrar.classList.add('btn-close');
        btnCerrar.classList.add('bg-white');
        btnCerrar.addEventListener('click', () => {
            mostrarCarrito();
        })

        const divProductos = document.createElement('DIV'); //Aca se van a mostrar los productos a comprar

        const tituloDetalleCompra = document.createElement('H3');
        tituloDetalleCompra.textContent = 'Productos Agregados';
        tituloDetalleCompra.classList.add('text-center');

        //Los elementos hasta aca van a estar si o si sea que haya productos en el carrito o no, por lo tanto ya voy armando el esquema
        divProductos.appendChild(tituloDetalleCompra);
        headerCarrito.appendChild(tituloCarrito);
        headerCarrito.appendChild(btnCerrar);

        divCarrito.appendChild(headerCarrito);
        divCarrito.appendChild(divProductos);

        
        if (contadorCarrito == 0){
            //mostrar que no hay productos agregados
        }
        else if (contadorCarrito > 0){
            //Funcion para mostrar los productos
        }

        // Todo este contenido se va a agregar a una barra de navegacion, dependiendo del tamaño de la pantalla del dispositivo
        if(screen.width > 992){
            navBar = document.querySelector('.nav-normal')
        }else{
            navBar = document.querySelector('.nav-responsivo')
        }

        // console.log(navBar)
        navBar.appendChild(divCarrito);
    }
}

function buscar(evento){
    const {id, img, nombre, precio} = carrito;
    console.log(evento.targert);

    const main = document.querySelector('.productos')


}