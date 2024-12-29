document.addEventListener('DOMContentLoaded', ()=>{
    iniciarApp();
})

var carrito = [];

var contador = 0;

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
    
    let cardActual = boton.parentElement.parentElement;
    let bodyCard = cardActual.firstChild.nextSibling;
    // console.log(cardActual)

        // console.log(cardActual.firstChild.nextSibling);
    if(carrito[parseInt(cardActual.dataset.id)] == null){

        carrito[parseInt(cardActual.dataset.id)]= {
            id: parseInt(cardActual.dataset.id),
            img: cardActual.firstChild.src,
            nombre : bodyCard.firstChild.textContent,
            precio: bodyCard.firstChild.nextSibling.textContent,
            cantidad: 1, 
        }
    }
    else{
        
        carrito[parseInt(cardActual.dataset.id)].cantidad += 1;
    }
    console.log(carrito)
    contadorParaCarrito();
}

function contadorParaCarrito(){
    contador = 0;
    carrito.forEach(producto =>{
        const {cantidad} = producto;
        contador += cantidad;
    })
    let spanContadorCarrito = document.querySelectorAll('.contadorCarrito');

    //Si la pantalla es mayor a 992, el span de contador carrito será el 1ero a tener en cuenta, y la pantalla es menor a 992px se tomará en cuenta el segundo span contador
    if (screen.width < 992) {
        spanContadorCarrito = spanContadorCarrito[1];
    }
    else if (screen.width > 992) {
        spanContadorCarrito = spanContadorCarrito[0];
    }

    if (contador == 0) {
        spanContadorCarrito.textContent = '';
    }
    else{
        spanContadorCarrito.textContent = `${contador}`;
    }
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
    
        const divCarrito = document.createElement('DIV'); //Div que va a contener y mostrar toda la informacion del carrito
        divCarrito.classList.add('ver');
        divCarrito.classList.add('mostrar-carrito');
        
        const headerCarrito = document.createElement('DIV'); //Div que va a contener el titulo y un boton para cerrar el carrito
        headerCarrito.classList.add('carrito-header');
        headerCarrito.classList.add('text-center');
        
        const tituloCarrito = document.createElement('H2');
        tituloCarrito.textContent = 'Carrito de compras'.toUpperCase();
        tituloCarrito.classList.add('titulo-carrito');

        const btnCerrar = document.createElement('BUTTON');
        btnCerrar.type = 'button';
        btnCerrar.classList.add('btn-close');
        btnCerrar.classList.add('bg-white');
        btnCerrar.addEventListener('click', () => {
            quitarCarrito();
        })

        const divProductos = document.createElement('DIV'); //Aca se van a mostrar los productos a comprar
        divProductos.classList.add('carrito-productos');

        // const tituloDetalleCompra = document.createElement('H3');
        // tituloDetalleCompra.textContent = 'Productos en el carrito'.toUpperCase();
        // tituloDetalleCompra.classList.add('text-center');

        //Los elementos hasta aca van a estar si o si sea que haya productos en el carrito o no, por lo tanto ya voy armando el esquema
        // divProductos.appendChild(tituloDetalleCompra);
        headerCarrito.appendChild(tituloCarrito);
        headerCarrito.appendChild(btnCerrar);

        divCarrito.appendChild(headerCarrito);
        divCarrito.appendChild(divProductos);

        
        if (contador == 0){
            //mostrar que no hay productos agregados
            const sinProductos = document.createElement('P');
            sinProductos.textContent = 'Todavia no tenes productos agregados al carrito';
            sinProductos.classList.add('sin-productos');
            sinProductos.classList.add('text-center')
            divProductos.appendChild(sinProductos);

        }
        else if (contador > 0){
            //En esta parte se agregan los productos al detalle del carrito
            carrito.forEach(producto =>{
                const {id, img, nombre, precio, cantidad} = producto;

                //div general card
                const contenedorProducto = document.createElement('DIV');
                contenedorProducto.classList.add('card-carrito');
                //img
                const imgProducto = document.createElement('IMG');
                imgProducto.classList.add('carrito-img');
                imgProducto.src = `${img}`;
                //div con nombre y precio
                const divDetalles = document.createElement('DIV');
                divDetalles.classList.add('carrito-detalles')
                //nombre
                const nombreP = document.createElement('P');
                nombreP.textContent = `${nombre}`;
                //precio
                const precioP = document.createElement('P');
                precioP.textContent = `Precio Unitario: ${precio}`;
                //Div para el input de cantidad
                const contenedorInput = document.createElement('DIV');
                contenedorInput.classList.add('carrito-input');
                //Cantidad de productos parrafo
                const cantidadP = document.createElement('P');
                cantidadP.textContent = 'Cantidad de productos: ';
                //cantidad de productos input
                const cantidadInp = document.createElement('INPUT');
                cantidadInp.type = 'number';
                cantidadInp.value = cantidad;
                cantidadInp.addEventListener('input', (e) =>{
                    cantidadProductos(e, id);
                })

                //Agregamos un enlace para eliminar el producto del carrito
                const eliminarProducto = document.createElement('A');
                eliminarProducto.textContent = 'Eliminar Producto';
                eliminarProducto.classList.add('carrito-eliminar');
                eliminarProducto.addEventListener('click', (e) =>{
                    delete(carrito[id]);
                    console.log(e.target.previousSibling.firstChild.nextSibling.value);

                    contadorParaCarrito();

                    calcularTotal();
                    mostrarCarrito();
                    mostrarCarrito();
                })

                //Parrafo que contendrá el total.
                const totalPagar = document.createElement('P');
                totalPagar.classList.add('text-center');
                totalPagar.classList.add('precio-total');

                //Armamos la "card";
                divDetalles.appendChild(nombreP);
                divDetalles.appendChild(precioP);
                contenedorInput.appendChild(cantidadP);
                contenedorInput.appendChild(cantidadInp);
                contenedorProducto.appendChild(imgProducto);
                contenedorProducto.appendChild(divDetalles);
                contenedorProducto.appendChild(contenedorInput);
                contenedorProducto.appendChild(eliminarProducto);

                //Agregamos el producto al div de productos
                divProductos.appendChild(contenedorProducto);
                divCarrito.appendChild(totalPagar);
            })
        }
        
        
        // Todo este contenido se va a agregar a una barra de navegacion, dependiendo del tamaño de la pantalla del dispositivo
        if(screen.width > 992){
            navBar = document.querySelector('.nav-normal')
        }else{
            navBar = document.querySelector('.nav-responsivo')
        }
        
        // console.log(navBar)
        navBar.appendChild(divCarrito);
        //Agregar el total de los productos
        calcularTotal();
    
}

function quitarCarrito(){
    if(document.querySelector('.mostrar-carrito') != null){
        document.querySelector('.mostrar-carrito').remove();
    }
}

function cantidadProductos(e, id){
    // console.log(e.target.value);
    // console.log(carrito[e.target.parentElement.previousSibling.firstChild]);
    // console.log(id);
    carrito[id].cantidad = parseInt(e.target.value);
    calcularTotal();
    contadorParaCarrito();
}

function calcularTotal(){
    //Variable que acumulará el total a pagar
    let precioTotal = 0;
    //Parrafo donde se mostrara el total a pagar
    const totalPagar = document.querySelector('.precio-total');

    carrito.forEach(producto => {
        //recuperamos los datos del carrito
        const {precio, cantidad} = producto;
        precioTotal += (parseInt(precio.split('$')[1]) * cantidad);
    })
    totalPagar.textContent = `Total a Pagar: $${precioTotal}`;
}

function buscar(evento){
    const {id, img, nombre, precio} = carrito;
    console.log(evento.targert);

    const main = document.querySelector('.productos')


}