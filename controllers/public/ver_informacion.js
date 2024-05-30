
const PRODUCTOS_API = 'services/public/productos.php';

const DETALLES_PRODUCTOS_API = 'services/public/detalles_productos.php';

const VALORACIONES_API = 'services/public/valoracion.php';

const DETALLES_PEDIDOS_API = 'services/public/detalles_pedidos.php';

const FORM_ID_PRODUCTO = document.getElementById('formIdProducto');

const NOMBRE_PRODUCTO = document.getElementById('nombreProducto'), ESTADO_PRODUCTO = document.getElementById('estadoProducto'),
    EXISTENCIAS_PRODUCTO = document.getElementById('existenciasProducto'), CONTENEDOR_ESTRELLAS_GLOBAL = document.getElementById('contenedorEstrellasGlobal'),
    PRECIO_PRODUCTO = document.getElementById('precioProducto'), DESCRIPCION_PRODUCTO = document.getElementById('descripcionProducto');

const CONTENEDOR_TALLAS_DISPONIBLES = document.getElementById('contenedorTallas'),
    CONTENEDOR_COLORES_DISPONIBLES = document.getElementById('contenedorColores');

const CONTENEDOR_BOTON_COMPRAR = document.getElementById('contenedorBotonComprar');

const CARRUSEL_EXISTENCIAS = document.getElementById('carruselExistencias');

const CONTENEDOR_COMENTARIOS = document.getElementById('contenedorComentarios');

const TITULO_COLORES = document.getElementById('tituloColores'),
    TITULO_TALLAS = document.getElementById('tituloTallas');

const CANTIDAD_COMENTARIOS = document.getElementById('cantidadComentarios'),
    CALIFICACION_GLOBAL = document.getElementById('calificacionGlobal'),
    AGREGAR_COMENTARIO = document.getElementById('agregarComentario');

const MODAL_VALORACION = new bootstrap.Modal('#modalValoracion'),
    MODAL_CARRITO = new bootstrap.Modal('#modalProducto');

const FORM_VALORACION = document.getElementById('formValoracion'),
    ID_DETALLE_PEDIDO = document.getElementById('idDetallePedido'),
    CALIFICACION_PRODUCTO = document.getElementById('calificacionProducto');

const TEXTO_CALIFICACION = document.getElementById('calificacionEstrella');

const ABRIR_AGREGAR_CARRITO = document.getElementById('abrirAgregarCarrito');

const FORM_CARRITO = document.getElementById('formCarrito');

const NOMBRE_PRODUCTO_MODAL = document.getElementById('nombreProductoModal'),
    PRECIO_PRODUCTO_MODAL = document.getElementById('precioProductoModal'),
    CANTIDAD_PRODUCTO = document.getElementById('cantidadProducto'),
    SUB_TOTAL = document.getElementById('subTotal'),
    CONTENEDOR_IMAGEN_MODAL = document.getElementById('contenedorImagenModal');

let BOOLEANO_ESTRELLA = true, CANTIDAD_CARRITO = 1;

// Evento que carga los recursos de barra de navegación y función de rellenar tabla.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla(3);
    // Llamada a la función para cargar la información del producto.
    cargarProducto();
});

// Función que retorna el estado en base del resultado de la bd.
function validarEstado(estadoProducto) {
    if (estadoProducto == 1) {
        return "Disponible";
    } else {
        return "Agotado";
    }
}

// Función que permite cargar la informacion del producto.
const cargarProducto = async () => {
    // Se inicializa el form donde se almacenará el id del producto.
    const FORM = new FormData(FORM_ID_PRODUCTO);
    // Se realiza una petición para obtener información general del producto (Nombre, precio, descripción)
    const DATA = await fetchData(PRODUCTOS_API, 'readOne', FORM);
    // Se realiza una petición para buscar comentarios realizados del producto por el cliente.
    const DATA_VALIDAR_COMENTARIO = await fetchData(VALORACIONES_API, 'readOne', FORM);
    // Se realiza una petición para obtener las reseñas/comentarios del producto. 
    const DATA_COMENTARIOS = await fetchData(VALORACIONES_API, 'readComments', FORM);
    // Se realiza una petición para obtener las existencias disponibles del producto (Se utiliza para validar el estado del producto).
    const DATA_STOCK = await fetchData(DETALLES_PRODUCTOS_API, 'readStock', FORM);
    // Se realiza una petición para obtener los colores disponibles del producto.
    const DATA_COLORES = await fetchData(DETALLES_PRODUCTOS_API, 'readColors', FORM);
    // Se realiza una petición para obtener las tallas disponibles del producto.
    const DATA_TALLAS = await fetchData(DETALLES_PRODUCTOS_API, 'readSizes', FORM);
    // Se realiza una petición para obtener las imágenes de los detalles de producto.
    const DATA_IMAGES = await fetchData(DETALLES_PRODUCTOS_API, 'readImages', FORM);
    // Se realiza una petición para obtener los pedidos del cliente dónde se encuentra el producto 
    // (Permite validar si el cliente tiene permitido reseñar el producto).
    const DATA_PEDIDOS = await fetchData(DETALLES_PEDIDOS_API, 'readOrderWithProduct', FORM);

    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA_COMENTARIOS.status) {
        // Se inicializa el contenedor de comentarios.
        CONTENEDOR_COMENTARIOS.innerHTML = '';
        // Se muestra el mensaje con la cantidad de comentarios.
        CANTIDAD_COMENTARIOS.textContent = DATA_COMENTARIOS.message.match(/\d+/)[0] + ' comentarios';
        // Se inicializa la constante que mostrará el promedio de calificación del producto.
        const PROMEDIO_CALIFICACION = [];
        // Por cada objeto del resultado JSON se crea un bloque de comentario con el comentario, nombre del reseñador, fecha de la reseña y calificación.  
        DATA_COMENTARIOS.dataset.forEach((row, index) => {
            // Se agrega la calificación a la constante de promedio.
            PROMEDIO_CALIFICACION.push(row.calificacion_producto);
            // Se agrega la fecha en que se agregó el comentario, el nombre y el comentario del cliente. 
            CONTENEDOR_COMENTARIOS.innerHTML += `
            <div>
                <p>${row.comentario_producto}</p>
                <div class="d-flex">
                    <div class="pb-3" id="contenedorEstrellas${index}">
                    </div>
                </div>
                <p class="fw-bold">${row.fecha_valoracion} Por ${row.nombre_cliente} ${row.apellido_cliente}</p>
                <hr>
            </div>
            `;
            // Se almacena el contenedor de estrellas del comentario correspondiente.
            const CONTENEDOR_ESTRELLAS = document.getElementById('contenedorEstrellas' + index);
            // Se agrega una estrella rellena en base a la calificación del producto.
            for (let i = 0; i < row.calificacion_producto; i++) {
                CONTENEDOR_ESTRELLAS.innerHTML += `
                <i class="bi bi-star-fill star checked"></i>
                `;
            }
            // Se calculan la cantidad de estrellas vacías.
            // Ej: Si la calificacion_producto es de 3 estrellas sobran 2 estrellas vacías.
            const ESTRELLAS_VACIAS = 5 - row.calificacion_producto;
            // Se agregan las estrellas vacías en el contenedor de estrellas correspondiente.
            for (let i = 0; i < ESTRELLAS_VACIAS; i++) {
                CONTENEDOR_ESTRELLAS.innerHTML += `
                <i class="bi bi-star-fill star"></i>
                `;
            }
        });
        // Se suman todas las calificaciones de todos los comentarios.
        const SUMA = PROMEDIO_CALIFICACION.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
        // Se promedian las calificaciones y se redondean.
        const PROMEDIO = Math.round(SUMA / PROMEDIO_CALIFICACION.length);
        // Se agrega una estrella rellena en base a la calificación global del producto.
        for (let i = 0; i < PROMEDIO; i++) {
            CONTENEDOR_ESTRELLAS_GLOBAL.innerHTML += `
            <i class="bi bi-star-fill star checked"></i>
            `;
        }
        const PROMEDIO_ESTRELLAS_VACIAS = 5 - PROMEDIO;
        // Se agregan las estrellas vacías en el contenedor de estrellas correspondiente.
        for (let i = 0; i < PROMEDIO_ESTRELLAS_VACIAS; i++) {
            CONTENEDOR_ESTRELLAS_GLOBAL.innerHTML += `
            <i class="bi bi-star-fill star"></i>
            `;
        }
    } else if (DATA_COMENTARIOS.error == 'No existen comentarios del producto') {
        // Si no se han agregado comentarios del producto se ejecuta el código.
        // Se muestra el mensaje.
        CONTENEDOR_COMENTARIOS.innerHTML = '<p class="fw-bold fs-3">No se han agregado comentarios</p>'
        // Se configura la alineación del contenido del contenedor (Para centrar el mensaje).
        CONTENEDOR_COMENTARIOS.classList.add('d-flex', 'align-items-center', 'justify-content-center');
        // Se oculta el texto que muestra la cantidad de comentarios.
        CANTIDAD_COMENTARIOS.classList.add('d-none');
        // Se oculta el contenedor con la calificación global 
        // (Debido a que no hay comentarios no se puede calcular la calificación global).
        CALIFICACION_GLOBAL.classList.add('d-none');
    } else {
        sweetAlert(2, DATA.error, false);
    }

    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA_IMAGES.status) {
        // Por cada registro se carga la imágen dentro del carrusel.
        DATA_IMAGES.dataset.forEach((row, index) => {
            // Se agrega la imágen dentro del carrusel.
            CARRUSEL_EXISTENCIAS.innerHTML += `  
                    <div class="carousel-item" id="imagen${index}">
                        <div class="d-flex justify-content-center">
                        <img src="${SERVER_URL}images/detalles_productos/${row.imagen_producto}" class="imagen-carrusel">
                        </div>
                    </div>
                    `;
        });
        // Se establece la primera imágen agregada al carrusel como la imágen activa del carrusel.
        document.getElementById('imagen0').classList.add('active');
    } else if (DATA_IMAGES.error == 'No hay existencias registradas') {
        // Se agrega la imágen dentro del carrusel.
        CARRUSEL_EXISTENCIAS.innerHTML = `  
                    <div class="carousel-item active" id="imagen0">
                        <img src="${SERVER_URL}images/detalles_productos/imageholder.png" class="d-block imagen-carrusel">
                    </div>
                `;
    } else {
        sweetAlert(2, DATA.error, false);
    }

    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA_PEDIDOS.status && DATA_VALIDAR_COMENTARIO.status) {
        // Se muestra el botón para reseñar el producto.
        AGREGAR_COMENTARIO.classList.remove('d-none');
    } else if (DATA_PEDIDOS.error == 'No hay compras registradas con el producto') {
        // Si no existen compras registradas con el producto se oculta el botón para reseñar el producto.
        AGREGAR_COMENTARIO.classList.add('d-none');
    } else if (DATA_VALIDAR_COMENTARIO.error == 'No se puede agregar más de 1 reseña por producto') {

    } else {
        if (DATA_PEDIDOS.status) {
            sweetAlert(2, DATA_VALIDAR_COMENTARIO.error, false);
        } else {
            sweetAlert(2, DATA_PEDIDOS.error, false)
        }
    }

    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Se almacenan los registros en la constante ROW.
        const ROW = DATA.dataset;
        // Se establece y se muestra el nombre del producto.
        NOMBRE_PRODUCTO.textContent = ROW.nombre_producto;
        // Se establece y se muestra el precio del producto.
        PRECIO_PRODUCTO.textContent = '$' + ROW.precio_producto;
        // Se establece y se muestra la descripción del producto.
        DESCRIPCION_PRODUCTO.textContent = ROW.descripcion_producto;
        // Si la respuesta es satisfactoria se ejecuta el código.
        if (DATA_STOCK.status) {
            // Se muestra el botón para comprar el producto.
            CONTENEDOR_BOTON_COMPRAR.classList.remove('d-none');
            // Se establece y se muestra el estado del producto.
            ESTADO_PRODUCTO.textContent = 'Disponible';
            // Si la respuesta es satisfactoria se ejecuta el código.
            if (DATA_COLORES.status) {
                // Se muestra el texto "Colores disponibles".
                TITULO_COLORES.classList.remove('d-none');
                // Se cargan los colores en el contenedor de colores.
                DATA_COLORES.dataset.forEach(row => {
                    CONTENEDOR_COLORES_DISPONIBLES.innerHTML += `
                    <button type="button" class="btn btn-outline"">${row.color_producto}</button>
                    `;
                });
            } else {
                // Si no existen colores para el producto se ocultan los elementos relacionados con colores.
                // Se oculta el texto "Colores disponibles"
                TITULO_COLORES.classList.add('d-none');
                // Se vacía el contenido del contenedor de colores.
                CONTENEDOR_COLORES_DISPONIBLES.innerHTML = "";
            }
            // Si la respuesta es satisfactoria se ejecuta el código.
            if (DATA_TALLAS.status) {
                // Se muestra el texto "Tallas disponibles".
                TITULO_TALLAS.classList.remove('d-none');
                // Se cargan las tallas en el contenedor de tallas.
                DATA_TALLAS.dataset.forEach(row => {
                    CONTENEDOR_TALLAS_DISPONIBLES.innerHTML += `
                    <button type="button" class="btn btn-outline">${row.talla}</button>
                    `;
                });
            } else {
                // Si no existen tallas para el producto se ocultan los elementos relacionados con tallas.
                // Se oculta el texto "Tallas disponibles"
                TITULO_TALLAS.classList.add('d-none');
                // Se vacía el contenido del contenedor de tallas.
                CONTENEDOR_TALLAS_DISPONIBLES.innerHTML = "";
            }
        } else if (DATA_STOCK.error == "No hay existencias disponibles") {
            // Si no hay existencias disponibles del producto se ejecuta el código.
            // Se muestra el mensaje.
            sweetAlert(3, "No hay existencias disponibles para este producto", false);
            // Se vacían los títulos de colores y tallas correspondientes, se vacían los contenedores de colores y tallas correspondientes,
            // se oculta el botón de comprar (No está disponible por lo que el cliente no puede comprar el producto), se establece el estado del producto.
            TITULO_COLORES.textContent = "";
            TITULO_TALLAS.textContent = "";
            CONTENEDOR_COLORES_DISPONIBLES.innerHTML = "";
            CONTENEDOR_TALLAS_DISPONIBLES.innerHTML = "";
            CONTENEDOR_BOTON_COMPRAR.classList.add('d-none');
            ESTADO_PRODUCTO.textContent = 'No disponible';
        } else {
            sweetAlert(2, DATA.error, false);
        }
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

// Función que permite abrir el modal de valoración.
const abrirModalValoracion = async () => {
    // Se inicializa el form donde se almacenará el id del producto.
    const FORM = new FormData(FORM_ID_PRODUCTO);
    // Se realiza una petición para obtener los pedidos del cliente dónde se encuentra el producto 
    // (Permite validar si el cliente tiene permitido reseñar el producto).
    const DATA_PEDIDOS = await fetchData(DETALLES_PEDIDOS_API, 'readOrderWithProduct', FORM);
    // Se realiza una petición para buscar comentarios realizados del producto por el cliente.
    const DATA_VALIDAR_COMENTARIO = await fetchData(VALORACIONES_API, 'readOne', FORM);
    // Se realiza una petición para obtener los colores disponibles del producto.
    const DATA_COLORES = await fetchData(DETALLES_PRODUCTOS_API, 'readColors', FORM);
    // Se realiza una petición para obtener las tallas disponibles del producto.
    const DATA_TALLAS = await fetchData(DETALLES_PRODUCTOS_API, 'readSizes', FORM);
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA_PEDIDOS.status && DATA_VALIDAR_COMENTARIO.status) {
        // Se carga el valor del id de un detalle de pedido (Se toma el id_detalle_pedido del primer registro).
        ID_DETALLE_PEDIDO.value = DATA_PEDIDOS.dataset[0].id_detalle_pedido;
        // Si la respuesta es satisfactoria se ejecuta el código.
        if(DATA_COLORES.status){

            await fillSelect(CATEGORIA_API, 'readAll1', 'categoriaSelect', ROW.id_categoria);
        } else{

        }

        // Se muestra el modal para agregar reseña.
        MODAL_VALORACION.show();
    } else if (DATA_PEDIDOS.error == 'No hay compras registradas con el producto') {
        // Si no existen compras registradas con el producto se oculta el botón para reseñar el producto.
        AGREGAR_COMENTARIO.classList.add('d-none');
        // Se muestra el mensaje.
        sweetAlert(2, 'No se pueden agregar comentarios a un producto que no ha sido comprado', false);
    } else if (DATA_VALIDAR_COMENTARIO.error == 'No se puede agregar más de 1 reseña por producto') {
        sweetAlert(3, DATA_VALIDAR_COMENTARIO.error, false);
    } else {
        if (DATA_PEDIDOS.status) {
            sweetAlert(2, DATA_VALIDAR_COMENTARIO.error, false);
        } else {
            sweetAlert(2, DATA_PEDIDOS.error, false)
        }
    }
}

// Función que se encarga de rellenar y vaciar las estrellas en los eventos: onmouseover, onmouseleave.
function renderizarEstrellas(numeroEstrella) {
    // Se valida que la variable global BOOLEANO_ESTRELLA tenga el valor true 
    // (Para rellenar las estrellas solo cuando no se ha seleccionado una calificación).
    if (numeroEstrella == 0 && BOOLEANO_ESTRELLA) {
        // Se remueve la clase 'checked' para vaciar las estrellas.
        for (let i = 1; i < 5 + 1; i++) {
            document.getElementById('estrella' + i).classList.remove('checked');
        }
        // Se vacía el texto que contiene la calificación.
        TEXTO_CALIFICACION.textContent = '';
    } else if (BOOLEANO_ESTRELLA) {
        // Se agrega la clase 'checked' para rellenar las estrellas.
        for (let i = 1; i < numeroEstrella + 1; i++) {
            document.getElementById('estrella' + i).classList.add('checked');
        }
        // Se vacía el texto que contiene la calificación.
        TEXTO_CALIFICACION.textContent = '';
    }
}

// Función que se encarga de cambiar el valor de la variable global BOOLEANO_ESTRELLA
// y rellenar las estrellas en el evento "onmousedown".
function cambiarBooleano(numeroEstrella) {
    // Se declara la variable que permitirá mostrar la calificación del cliente.
    let Estrellas = 0;
    // Si el valor de la variable global BOOLEANO_ESTRELLA es true se ejecuta el código.
    if (BOOLEANO_ESTRELLA) {
        // Se invierte el valor de la variable global.
        BOOLEANO_ESTRELLA = false;
    } else {
        // Se invierte el valor de la variable global.
        BOOLEANO_ESTRELLA = true;
        // Se restablece el valor de la calificación seleccionada.
        CALIFICACION_PRODUCTO.value = 0;
    }
    // Si el valor de la variable global es falso se ejecuta el código.
    if (BOOLEANO_ESTRELLA == false) {
        // Se rellenan las estrellas para dejarlas rellenas (Hasta que se clickee alguna estrella otra vez).
        for (let i = 1; i < numeroEstrella + 1; i++) {
            document.getElementById('estrella' + i).classList.add('checked');
            Estrellas = i;
        }
        // Se muestra la calificación seleccionada.
        TEXTO_CALIFICACION.textContent = Estrellas + ' estrellas';
        // Se establece la calificación seleccionada.
        CALIFICACION_PRODUCTO.value = Estrellas;
    }
}

// Método del evento para cuando se envía el formulario de buscar.
FORM_VALORACION.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();

    if (CALIFICACION_PRODUCTO.value > 0) {
        // Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(FORM_VALORACION);
        // Se envía la petición a la API para agregar el comentario.
        const DATA = await fetchData(VALORACIONES_API, 'makeComment', FORM);
        // Si la respuesta es satisfactoria se ejecuta el código.
        if (DATA.status) {
            // Se muestra el mensaje con el éxito de la acción.
            sweetAlert(1, DATA.message, false);
            // Se oculta el modal.
            MODAL_VALORACION.hide();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    } else {
        sweetAlert(3, 'Asegúrese de seleccionar la calificación del producto', false);
    }
});


// Función que permite abrir el modal de agregar el producto al carrito.
const abrirModalAgregarCarrito = async () => {
    // Se inicializa el form donde se almacenará el id del producto.
    const FORM = new FormData(FORM_ID_PRODUCTO);
    // Se realiza una petición para buscar el producto en el carrito del cliente
    // (Permite validar si el cliente ya ha agregado el producto al carrito).
    const DATA_CARRITO = await fetchData(DETALLES_PEDIDOS_API, 'readCartWithProduct', FORM);
    // Se realiza una petición para obtener información general del producto (Nombre, precio, descripción)
    const DATA = await fetchData(PRODUCTOS_API, 'readOne', FORM);
    // Se realiza una petición para obtener 1 imagen del producto.
    const DATA_DETALLE_PRODUCTO = await fetchData(DETALLES_PRODUCTOS_API, 'readImages', FORM);
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA_CARRITO.status && DATA.status) {
        // Se almacena el objeto con la información del producto en la constante.
        const ROW = DATA.dataset;
        // Se establece y muestra el nombre del producto.
        NOMBRE_PRODUCTO_MODAL.textContent = ROW.nombre_producto;
        // Se establece y muestra el precio del producto.
        PRECIO_PRODUCTO_MODAL.textContent = "$" + ROW.precio_producto;
        // Si la respuesta es satisfactoria se ejecuta el código.
        if (DATA_DETALLE_PRODUCTO.status) {

            CONTENEDOR_IMAGEN_MODAL.innerHTML = `
            <img src="${SERVER_URL}images/detalles_productos/${DATA_DETALLE_PRODUCTO.dataset[0].imagen_producto}" width="225px" height="225px">
            `;
        } else {
            // Si no se hayan imágenes se carga la imagen por defecto.
            CONTENEDOR_IMAGEN_MODAL.innerHTML = `
            <img src="../../api/images/detalles_productos/imageholder.png">
            `;
        }
        // Se muestra la cantidad inicial del producto.
        mostrarCantidad();
        // Se muestra el modal.
        MODAL_CARRITO.show();
    } else if (DATA_CARRITO.error == 'El producto ya se encuentra agregado al carrito') {
        // Se muestra la advertencia.
        sweetAlert(3, DATA_CARRITO.error);
        // Si el producto se encuentra agregado en el carrito no permite volver a agregarlo.
        ABRIR_AGREGAR_CARRITO.classList.add('d-none');
    } else {
        if (DATA.status) {
            sweetAlert(2, DATA_CARRITO.error, false);
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

// La función mostrarCantidad muestra la cantidad seleccionada del producto.
function mostrarCantidad() {
    // Se establece la cantidad del producto.
    CANTIDAD_PRODUCTO.textContent = CANTIDAD_CARRITO;
    // Se calcula el subtotal;
    calcularSubTotal();
}

// La función aumentarCantidad aumenta la cantidad del producto al agregar el producto al carrito.
function aumentarCantidad() {
    // Se aumenta la cantidad seleccionada del producto.
    CANTIDAD_CARRITO++;
    // Se muestra la cantidad seleccionada del producto
    mostrarCantidad();
}

// La función disminuirCantidad disminuye la cantidad del producto al agregar el producto al carrito.
function disminuirCantidad() {
    if (CANTIDAD_CARRITO == 1) {

    } else {
        // Se disminuye la cantidad seleccionada del producto.
        CANTIDAD_CARRITO--;
        // Se muestra la cantidad seleccionada del producto
        mostrarCantidad();
    }
}

// La función calcularSubTotal calcula el subtotal de la compra en base al precio del producto y la cantidad seleccionada.
function calcularSubTotal() {
    // Se almacena el texto con el precio del producto en la variable.
    let PRECIO_PRODUCTO = PRECIO_PRODUCTO_MODAL.textContent;
    // Se calcula y se muestra el subtotal.
    SUB_TOTAL.textContent = 'Subtotal: $' + (CANTIDAD_CARRITO * PRECIO_PRODUCTO.replace(/^\D+/g, ""));
} 