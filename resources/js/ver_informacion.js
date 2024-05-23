
PRODUCTOS_API = 'services/public/productos.php';

const NOMBRE_PRODUCTO = document.getElementById('nombreProducto'), ESTADO_PRODUCTO = document.getElementById('estadoProducto'),
    EXISTENCIAS_PRODUCTO = document.getElementById('existenciasProducto'), CONTENEDOR_ESTRELLAS_PRODUCTO = document.getElementById('contenedorEstrellasCalificacion'),
    PRECIO_PRODUCTO = document.getElementById('precioProducto'), DESCRIPCION_PRODUCTO = document.getElementById('descripcionProducto'),
    CONTENEDOR_TALLAS_DISPONIBLES = document.getElementById('contenedorTallas'), CONTENEDOR_COLORES_DISPONIBLES = document.getElementById('contenedorColores');

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
        
        ESTADO_PRODUCTO.textContent = validarEstado(ROW.estado_producto);

        PRECIO_PRODUCTO.textContent = '$'+ ROW.precio_producto;

        DESCRIPCION_PRODUCTO.textContent = ROW.descripcion_producto;
    } else{

    }
}