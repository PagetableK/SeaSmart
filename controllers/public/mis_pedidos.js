// Se declara la constante que almacena la ruta de la API de pedidos.
const PEDIDOS_API = 'services/public/pedido.php';
// Se declara la constante que almacena la ruta de la API de detalles de pedidos.
const DETALLES_PEDIDOS_API = 'services/public/detalles_pedidos.php';
// Se almacena el contenedor donde se mostrarán los pedidos realizados por el cliente.
const CONTENEDOR_PEDIDOS = document.getElementById('contenedorPedidos');
// Se almacena el modal que muestra los detalles del pedido.
const MODAL_DETALLES = new bootstrap.Modal('#modalDetalles');
// Se almacena el contenedor donde se cargarán los productos del pedido.
const CONTENEDOR_PRODUCTOS = document.getElementById('contenedorProductos');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla(3);
    // Llamada a la función para cargar los pedidos del cliente.
    cargarPedidos();
});

// La función cargarPedidos permite cargar dinámicamente los pedidos realizados por el cliente.
const cargarPedidos = async () => {
    // Se realiza una petición para obtener los pedidos realizados por el cliente.
    const DATA = await fetchData(PEDIDOS_API, "readOrders");
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Variable que se utiliza para agregar la numeración de los pedidos.
        let nPedido = 1;
        // Se agregan dinámicamente los pedidos por cada resultado.
        DATA.dataset.forEach(row => {
            CONTENEDOR_PEDIDOS.innerHTML += `
            <div class="row mt-5">
                <h3>Pedido ${nPedido}</h3>
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-sm-3 col-md-2 col-lg-2">
                            <img src="../../resources/img/camion-envio.png" alt="camion" class="img-fluid">
                        </div>
                        <div class="col-12 col-sm-2 d-flex align-items-center justify-content-center flex-column">
                            <p class="fw-bold fs-6">${row.estado_pedido}</p>
                            <p class="fw-bold fs-6">${row.fecha_pedido}</p>
                            <p class="fw-bold fs-6">${row.direccion}</p>
                        </div>
                        <div class="col-12 col-sm-7 d-flex align-items-center justify-content-center">
                            <div class="row d-flex flex-column">
                                <div class="col">
                                    <p class="text-center"><a href="#" onclick="verDetalles(${row.id_pedido})">Ver detalles</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            `;
        });
    } else {
        // Se muestra el mensaje.
        sweetAlert(4, "No se han realizado pedidos", false);
        // Se muestra el texto.
        CONTENEDOR_PEDIDOS.innerHTML = '<p class="fs-3 fw-bold text-center">No se han realizado pedidos</p>';
    }
}

// La función verDetalles muestra el modal con la información del pedido.
const verDetalles = async (idPedido) => {
    // Se declara la constante donde se cargará el idPedido.
    const FORM = new FormData();
    // Se carga el idPedido al form.
    FORM.append("idPedido", idPedido);
    // Se realiza una petición para obtener los productos del pedido.
    const DATA = await fetchData(DETALLES_PEDIDOS_API, 'readDetails', FORM);
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Se inicializa el contenido del contenedor.
        CONTENEDOR_PRODUCTOS.innerHTML = '';
        // Se agregan los productos del pedido al contenedor dinámicamente.
        DATA.dataset.forEach(row => {
            CONTENEDOR_PRODUCTOS.innerHTML += `
            <div class="row">
                <div class="col-12">
                    <p class="fs-5 fw-semibold">${row.nombre_producto}</p>
                </div>
                <div class="col-12 col-md-6">
                    <img src="${SERVER_URL}images/detalles_productos/${row.imagen_producto}" width="100px" height="100px">
                </div>
                <div class="col-12 col-md-6">
                    <p>Precio: $${row.precio_producto}</p>
                    <p>Cantidad: ${row.cantidad_producto}</p>
                    <p>Subtotal: $${row.precio_producto * row.cantidad_producto}</p>
                </div>
                <hr>
            </div>
            `;
        });

        MODAL_DETALLES.show();
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const mostrarPdf = async () =>{

    
}