
const PRODUCTOS_API = 'services/public/productos.php';

const DETALLES_PRODUCTOS_API = 'services/public/detalles_productos.php';

const NOMBRE_PRODUCTO = document.getElementById('nombreProducto'), ESTADO_PRODUCTO = document.getElementById('estadoProducto'),
    EXISTENCIAS_PRODUCTO = document.getElementById('existenciasProducto'), CONTENEDOR_ESTRELLAS_PRODUCTO = document.getElementById('contenedorEstrellasCalificacion'),
    PRECIO_PRODUCTO = document.getElementById('precioProducto'), DESCRIPCION_PRODUCTO = document.getElementById('descripcionProducto'),
    CONTENEDOR_TALLAS_DISPONIBLES = document.getElementById('contenedorTallas'), CONTENEDOR_COLORES_DISPONIBLES = document.getElementById('contenedorColores'),
    CONTENEDOR_BOTON_COMPRAR = document.getElementById('contenedorBotonComprar');

const TITULO_COLORES = document.getElementById('tituloColores'), TITULO_TALLAS = document.getElementById('tituloTallas');

// const stars = document.querySelectorAll('.star'); 

// stars.forEach(function(star, ver_informacion) {
//     star.addEventListener('click', function() {
//         for (let i=0; i<=ver_informacion; i++) {
//             stars[i].classList.add('checked');
//         }
//         for (let i=ver_informacion+1; i<stars.length; i++){
//             stars[i].classList.remove('checked');
//         }
//     })
// })

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
const cargarProducto = async () =>{

    const FORM = new FormData();

    FORM.append('idProducto', 1);

    const DATA = await fetchData(PRODUCTOS_API, 'readOne', FORM);

    if(DATA.status){
        
        const ROW = DATA.dataset; 
        
        NOMBRE_PRODUCTO.textContent = ROW.nombre_producto;

        PRECIO_PRODUCTO.textContent = '$'+ ROW.precio_producto;

        DESCRIPCION_PRODUCTO.textContent = ROW.descripcion_producto;

        const DATA_STOCK = await fetchData(DETALLES_PRODUCTOS_API, 'readStock', FORM);

        if(DATA_STOCK.status){
            
            CONTENEDOR_BOTON_COMPRAR.classList.remove('d-none');

            ESTADO_PRODUCTO.textContent = 'Disponible'; 

            const DATA_COLORES = await fetchData(DETALLES_PRODUCTOS_API, 'readColors', FORM);

            console.log(DATA_COLORES);
            if(DATA_COLORES.status){

                TITULO_COLORES.classList.remove('d-none');

                DATA_COLORES.dataset.forEach(row => {
                    CONTENEDOR_COLORES_DISPONIBLES.innerHTML += `
                    <button type="button" class="btn btn-outline"">${row.color_producto}</button>
                    `;
                });
            } else{

                TITULO_COLORES.classList.add('d-none');

                CONTENEDOR_COLORES_DISPONIBLES.innerHTML = "";
            }

            const DATA_TALLAS = await fetchData(DETALLES_PRODUCTOS_API, 'readSizes', FORM);

            if(DATA_TALLAS.status){

                TITULO_TALLAS.classList.remove('d-none');

                DATA_TALLAS.dataset.forEach(row => {
                    CONTENEDOR_TALLAS_DISPONIBLES.innerHTML += `
                    <button type="button" class="btn btn-outline">${row.talla}</button>
                    `;
                });
            } else{

                TITULO_TALLAS.classList.add('d-none');

                CONTENEDOR_TALLAS_DISPONIBLES.innerHTML = "";
            }

        } else if(DATA_STOCK.error == "No hay existencias disponibles"){

            sweetAlert(3, "No hay existencias disponibles para este producto", false);

            TITULO_COLORES.textContent = "";
            TITULO_TALLAS.textContent = "";
            CONTENEDOR_COLORES_DISPONIBLES.innerHTML = "";
            CONTENEDOR_TALLAS_DISPONIBLES.innerHTML = "";
            CONTENEDOR_BOTON_COMPRAR.classList.add('d-none');

            ESTADO_PRODUCTO.textContent = 'No disponible';
        } else{
            sweetAlert(2, DATA.error, false);
        }
    } else{
        sweetAlert(2, DATA.error, false);
    }
}