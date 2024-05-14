// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/admin/productos.php';
// Constante para completar la ruta de la API de administrador.
const CATEGORIA_API = 'services/admin/categorias.php';
// Constante para completar la ruta de la API de administrador.
const SUBCATEGORIA_API = 'services/admin/subcategorias.php';
// Constantes para cargar los elementos de la tabla.
const FILAS_ENCONTRADAS = document.getElementById('filasEncontradas'),
    CUERPO_TABLA = document.getElementById('cuerpoTabla');
// Se almacena el modal con la información del producto.
const MODALIPRODUCTO = new bootstrap.Modal('#infoModalProducto');
const SEPARADORV = document.getElementById('separadorV');
const SEPARADORH = document.getElementById('separadorH');
// Constante que almacena el form de búsqueda.
const FORM_BUSCAR = document.getElementById('formBuscar');
// Constante para definir el título del modal y botón.
const TITULO_MODAL = document.getElementById('tituloModal'),
    BOTON_ACCION = document.getElementById('btnAccion');
// Constantes para establecer los elementos del formulario.
const FORM_PRODUCTO = document.getElementById('formProducto'),
    ID_PRODUCTO = document.getElementById('idProducto'),
    NOMBRE_PRODUCTO = document.getElementById('nombreProducto'),
    DESCRIPCION_PRODUCTO = document.getElementById('descripcionProducto');
// Constante que almacena el modal para agregar o editar producto.
const MODAL_PRODUCTO = new bootstrap.Modal('#modalProducto');
// Contante que almacena los selecet de categorías y subcategorías que se encuentran en el modal.
const SELECT_CATEGORIA = document.getElementById('selectCategoria'),
    SELECT_SUBCATEGORIA = document.getElementById('selectSubcategoria');

function abrirCrear() {
    MODALCPRODUCTO.show();
}

function abrirInfoProducto(idProducto) {
    MODALIPRODUCTO.show();
}

if (window.screen.width <= 430) {
    SEPARADORV.remove();
    // separacion de los botones de abajo
}
else if (window.screen.width < 992) {
    SEPARADORV.remove();
}
else {
    SEPARADORH.remove();
}

// Evento que carga los recursos de barra de navegación y función de rellenar tabla.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla();
    // Llamada a la función para cargar los registros de la tabla.
    cargarTabla();
});

// Función para cargar los registros de la tabla.
const cargarTabla = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    FILAS_ENCONTRADAS.textContent = '';
    CUERPO_TABLA.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PRODUCTO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            //Se valida el estado del cliente para cargarlo en la columna.
            var estado_producto = validarEstado(row.estado_producto);
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CUERPO_TABLA.innerHTML += `
                <tr onclick="abrirInfoProducto(${row.id_producto})">
                    <td>${row.nombre_producto}</td>
                    <td>${row.descripcion_producto}</td>
                    <td>${row.nombre_sub_categoria}</td>
                    <td>${estado_producto}</td>
                    <td>${row.nombre_administrador}</td>
                    <td class="celda-agregar-eliminar">
                        <button type="button" class="btn btn-success" onclick="abrirModal('Editar producto',${row.id_producto})">
                            <img src="../../resources/img/lapiz.png" alt="lapizEditar" width="30px">
                        </button>
                        <button type="button" class="btn btn-danger" onclick="abrirEliminar(${row.id_producto})">
                            <img src="../../resources/img/eliminar.png" alt="lapizEliminar" width="30px">
                        </button>
                    </td>
                </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        FILAS_ENCONTRADAS.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}

// Función que retorna el estado en base del resultado de la bd.
function validarEstado(estadoProducto) {
    if (estadoProducto == 1) {
        return "Activo";
    } else {
        return "Dado de baja";
    }
}

// Método del evento para cuando se envía el formulario de buscar.
FORM_BUSCAR.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_BUSCAR);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    cargarTabla(FORM);
});

// Función que verifica cuando el input de búsqueda
// se encuentra vacío para recargar los registros de la tabla.
function verificarReset() {
    // Se valida que el input esté vacío.
    if (document.getElementById('buscarProducto').value == "") {
        // Se llama a la función para cargar los registros.
        cargarTabla();
    }
}

// Función para abrir el modal crear o editar producto.
const abrirModal = async (tituloModal, idProducto) => {
    // Se configura el título del modal.
    TITULO_MODAL.textContent = tituloModal;

    // Si el valor del parámetro es nulo la acción es agregar administrador
    if (idProducto == null) {
        // Se remueve el antiguo color del botón.
        BOTON_ACCION.classList.remove('btn-success');
        // Se configura el nuevo color del botón.
        BOTON_ACCION.classList.add('btn-primary');
        // Se configura el título del botón.
        BOTON_ACCION.innerHTML = 'Agregar producto';
        // Se limpian los input para dejarlos vacíos.
        FORM_PRODUCTO.reset();
        // Petición para obtener los registros de la tabla categorías.
        const DATA = await fetchData(CATEGORIA_API, 'readAll');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se recorre el conjunto de registros fila por fila.
            DATA.dataset.forEach(row => {
                // Se crean y concatenan las etiquetas option con los datos de cada registro.
                SELECT_CATEGORIA.innerHTML += `
                <option id="${row.id_categoria}">${row.nombre_categoria}</option>
            `;
            });
        } else {
            sweetAlert(2, DATA.error, false);
        }
        //Se manda a llamar la función para cargar las subcategorías en el combobox.
        cargarSubCategorias();
        // Se abre el modal agregar producto.
        MODAL_PRODUCTO.show();
    }
    else {
        // Se define una constante tipo objeto que almacenará el idProducto.
        const FORM = new FormData();
        // Se almacena el nombre del campo y el valor (idProducto) en el formulario.
        FORM.append('idProducto', idProducto);
        // Petición para obtener los datos del registro solicitado.
        const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se remueve el antiguo color del botón.
            BOTON_ACCION.classList.remove('btn-primary');
            // Se configura el nuevo color del botón.
            BOTON_ACCION.classList.add('btn-success');
            // Se configura el título del botón.
            BOTON_ACCION.innerHTML = 'Editar producto';
            // Se prepara el formulario para cargar los input de la producto.
            FORM_PRODUCTO.reset();
            // Se cargan los campos de la base en una variable.
            const ROW = DATA.dataset;
            // Se carga el id de producto en el input idProducto.
            ID_PRODUCTO.value = ROW.id_producto;
            // Se carga el nombre del producto en el input nombreProducto.
            NOMBRE_PRODUCTO.value = ROW.nombre_producto;
            // Se carga la descripción del producto en el input descripcionProducto.
            DESCRIPCION_PRODUCTO.value = ROW.descripcion_producto;
            // Se abre el modal editar categoría.
            MODAL_PRODUCTO.show();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const cargarSubCategorias = async () => {
    // Petición para obtener los registros de la tabla subcategorías.
    const DATA = await fetchData(SUBCATEGORIA_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las etiquetas option con los datos de cada registro.
            SELECT_SUBCATEGORIA.innerHTML += `
            <option id="${row.id_sub_categoria}">${row.nombre_sub_categoria}</option>
        `;
        });
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

// Método del evento para cuando se envía el formulario de agregar o editar.
FORM_PRODUCTO.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_PRODUCTO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_PRODUCTO);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PRODUCTO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        MODAL_PRODUCTO.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        cargarTabla();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});