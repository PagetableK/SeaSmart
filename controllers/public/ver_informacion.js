
const PRODUCTOS_API = 'services/public/productos.php';

const DETALLES_PRODUCTOS_API = 'services/public/detalles_productos.php';

const VALORACIONES_API = 'services/public/valoracion.php';

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
    const FORM = new FormData();
    // Se agrega el id del producto en el form.
    FORM.append('idProducto', 1);
    // Se realiza una petición para obtener información general del producto (Nombre, precio, descripción)
    const DATA = await fetchData(PRODUCTOS_API, 'readOne', FORM);
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
                        <img src="${SERVER_URL}images/detalles_productos/${row.imagen_producto}" class="d-block w-50">
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
                        <img src="${SERVER_URL}images/detalles_productos/imageholder.png" class="d-block w-50">
                    </div>
                `;
    } else {
        sweetAlert(2, DATA.error, false);
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