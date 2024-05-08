// Constante para completar la ruta de la API.
const CATEGORIA_API = 'services/admin/categorias.php';
//Constante para almacenar el modal de editar categoría
const MODALCATEGORIA = new bootstrap.Modal('#Modal_categoria');
//Constante para almacenar el modal de eliminar categoría
const MODALBCATEGORIA = new bootstrap.Modal('#borrarModal_categoria');
//Constantes para cargar los elementos de la tabla
const FILAS_ENCONTRADAS = document.getElementById('filasEncontradas'),
    CUERPO_TABLA = document.getElementById('cuerpoTabla');
//Constante para definir el título del modal
const TITULO_MODAL = document.getElementById('tituloModal');
// Constantes para establecer los elementos del formulario de guardar.
const FORM_CATEGORIA = document.getElementById('formCategoria'),
    ID_CATEGORIA = document.getElementById('idCategoria'),
    NOMBRE_CATEGORIA = document.getElementById('nombreCategoria'),
    DESCRIPCION_CATEGORIA = document.getElementById('descripcionCategoria'),
    IMAGEN_CATEGORIA = document.getElementById('imagenCategoria');

//Función para abrir el modal crear categoría
function abrirModal(tituloModal) {
    MODALCATEGORIA.show();
    TITULO_MODAL.textContent = tituloModal;
}

//Función para abrir el modal eliminar categoría
function abrirEliminar() {
    MODALBCATEGORIA.show();
}

function cargarImagen(event){
    var archivoSeleccionado = event.target.files[0];
    var reader = new FileReader();

    var imgtag = document.getElementById('imgCategoria');
    imgtag.title = archivoSeleccionado.name;

    reader.onload = function(event){
        imgtag.src = event.target.result;
    };

    reader.readAsDataURL(archivoSeleccionado);
}

//Evento que carga los recursos de barra de navegación y función de rellenar tabla
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla();
    //Llamar la función para cargar los datos de la tabla
    cargarTabla();
});

function agregarBotones() {
    document.querySelectorAll('.celda-agregar-eliminar').forEach(node => node.innerHTML = `
    <button type="button" class="btn btn-success" onclick="abrirModal('Editar categoría')"">
        <img src="../../resources/img/lapiz.png" alt="lapizEditar" width="30px">
    </button>
    <button type="button" class="btn btn-danger" onclick="abrirEliminar()">
        <img src="../../resources/img/eliminar.png" alt="lapizEditar" width="30px">
    </button>
    `);
}

// Método del evento para cuando se envía el formulario de guardar.
FORM_CATEGORIA.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_CATEGORIA.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_CATEGORIA);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CATEGORIA_API, action, FORM);
    console.log(DATA);
    console.log(action);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        MODALCATEGORIA.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

const cargarTabla = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    FILAS_ENCONTRADAS.textContent = '';
    CUERPO_TABLA.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(CATEGORIA_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            CUERPO_TABLA.innerHTML += `
                <tr>
                    <td><img src="${SERVER_URL}images/categorias/${row.imagen_categoria}" height="50"></td>
                    <td>${row.nombre_categoria}</td>
                    <td>${row.descripcion_categoria}</td>
                    <td class="celda-agregar-eliminar">
                    </td>
                </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        FILAS_ENCONTRADAS.textContent = DATA.message;
        agregarBotones();
    } else {
        sweetAlert(4, DATA.error, true);
    }
}