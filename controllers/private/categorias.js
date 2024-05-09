// Constante para completar la ruta de la API.
const CATEGORIA_API = 'services/admin/categorias.php';
// Constante para almacenar el modal de editar categoría.
const MODALCATEGORIA = new bootstrap.Modal('#modalCategoria');
// Constante que almacena el form de búsqueda.
const FORM_BUSCAR = document.getElementById('formBuscar');
// Constante para almacenar el modal de eliminar categoría.
const MODALBCATEGORIA = new bootstrap.Modal('#borrarModalCategoria');
// Constantes para cargar los elementos de la tabla.
const FILAS_ENCONTRADAS = document.getElementById('filasEncontradas'),
    CUERPO_TABLA = document.getElementById('cuerpoTabla');
// Constante para definir el título del modal y botón.
const TITULO_MODAL = document.getElementById('tituloModal'),
    BOTON_ACCION = document.getElementById('btnAccion'),
    IMG_CATEGORIA = document.getElementById('imgCategoria');
// Constantes para establecer los elementos del formulario.
const FORM_CATEGORIA = document.getElementById('formCategoria'),
    ID_CATEGORIA = document.getElementById('idCategoria'),
    NOMBRE_CATEGORIA = document.getElementById('nombreCategoria'),
    DESCRIPCION_CATEGORIA = document.getElementById('descripcionCategoria'),
    IMAGEN_CATEGORIA = document.getElementById('imagenCategoria');

// Función para abrir el modal crear o editar categoría.
const abrirModal = async (tituloModal, idCategoria) => {
    // Se configura el título del modal.
    TITULO_MODAL.textContent = tituloModal;

    if (idCategoria == null) {
        // Se remueve el antiguo color del botón.
        BOTON_ACCION.classList.remove('btn-success');
        // Se configura el nuevo color del botón.
        BOTON_ACCION.classList.add('btn-primary');
        // Se configura el título del botón.
        BOTON_ACCION.innerHTML = 'Agregar categoría';
        // Se limpian los input para dejarlos vacíos.
        FORM_CATEGORIA.reset();
        // Se cambia la imagen por defecto.
        IMG_CATEGORIA.src = "../../api/images/categorias/categoria_imageholder.png";
        // Se abre el modal agregar categoría.
        MODALCATEGORIA.show();
    }
    else {
        // Se define una constante tipo objeto que almacenará el idCategoria.
        const FORM = new FormData();
        // Se almacena el nombre del campo y el valor (idCategoria) en el formulario.
        FORM.append('idCategoria', idCategoria);
        // Petición para obtener los datos del registro solicitado.
        const DATA = await fetchData(CATEGORIA_API, 'readOne', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se configura el título del modal.
            TITULO_MODAL.textContent = 'Actualizar categoría';
            // Se remueve el antiguo color del botón.
            BOTON_ACCION.classList.remove('btn-primary');
            // Se configura el nuevo color del botón.
            BOTON_ACCION.classList.add('btn-success');
            // Se configura el título del botón.
            BOTON_ACCION.innerHTML = 'Editar categoría';
            // Se prepara el formulario para cargar los input de la categoría.
            FORM_CATEGORIA.reset();
            // Se cargan los campos de la base en una variable.
            const ROW = DATA.dataset;
            // Se carga el id de categoría en el input idCategoria.
            ID_CATEGORIA.value = ROW.id_categoria;
            // Se carga el nombre de categoría en el input nombreCategoria.
            NOMBRE_CATEGORIA.value = ROW.nombre_categoria;
            // Se carga la descripción de la categoría en el input descripcionCategoria.
            DESCRIPCION_CATEGORIA.value = ROW.descripcion_categoria;
            // Se define la ruta de la imagen almacenada en la API.
            IMG_CATEGORIA.src = "../../api/images/categorias/" + ROW.imagen_categoria;
            // Se abre el modal editar categoría.
            MODALCATEGORIA.show();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

function verificarReset(){
    if(document.getElementById('buscarCategoria').value==""){
        cargarTabla();
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

// Función para abrir el modal eliminar categoría.
const abrirEliminar = async (idCategoria) => {
    // Se define una constante tipo objeto que almacenará el idCategoria.
    const FORM = new FormData();
    // Se almacena el nombre del campo y el valor (idCategoria) en el formulario.
    FORM.append('idCategoria', idCategoria);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(CATEGORIA_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cargan los campos de la base en una variable.
        const ROW = DATA.dataset;
        // Se define el título del modal.
        document.getElementById('tituloModalEliminar').innerHTML = "¿Desea eliminar la categoría " + ROW.nombre_categoria + "?";
        // Se carga el id categoría en el input inputIdCategoria.
        document.getElementById('inputIdCategoria').value = ROW.id_categoria;
        // Se abre el modal borrar categoría.
        MODALBCATEGORIA.show();
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const eliminarCategoria = async () => {

    // Se define una variable con el valor del input inputIdCategoria.
    var idCategoria = document.getElementById('inputIdCategoria').value;
    // Se define una constante tipo objeto donde se almacenará el idCategoria.
    const FORM = new FormData();
    // Se almacena el nombre del campo y el valor (idCategoria).
    FORM.append('idCategoria', idCategoria);
    // Petición para eliminar el registro seleccionado.
    const DATA = await fetchData(CATEGORIA_API, 'deleteRow', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        //Se oculta el modal.
        MODALBCATEGORIA.hide();
        // Se muestra un mensaje de éxito.
        await sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        cargarTabla();
    } else {
        sweetAlert(2, DATA.error, false);
    }
}


// Función para cargar la imagen al cargar un archivo en input file.
function cargarImagen(event) {
    // Se almacena el archivo cargado.
    var archivoSeleccionado = event.target.files[0];
    // Se crea una variable tipo objeto.
    var reader = new FileReader();
    // Se define una variable con el mismo valor que la constante IMG_CATEGORIA.
    var imgtag = IMG_CATEGORIA;
    // Se codifica la cadena de caracteres con la imagen.
    reader.readAsDataURL(archivoSeleccionado);
    // Al cargar una imagen en el campo se dispara el evento
    // que configura la imagen en la etiqueta imgCategoria.
    reader.onload = function (event) {
        imgtag.src = event.target.result;
    };
}

// Evento que carga los recursos de barra de navegación y función de rellenar tabla.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla();
    //Llamar la función para cargar los datos de la tabla.
    cargarTabla();
});

// Método del evento para cuando se envía el formulario de guardar.
FORM_CATEGORIA.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_CATEGORIA.value) ? action = 'updateRow' : action = 'createRow';
    console.log(ID_CATEGORIA.value);
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_CATEGORIA);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CATEGORIA_API, action, FORM);
    console.log(DATA);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        MODALCATEGORIA.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        cargarTabla();
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
                        <button type="button" class="btn btn-success" onclick="abrirModal('Editar categoría',${row.id_categoria})">
                            <img src="../../resources/img/lapiz.png" alt="lapizEditar" width="30px">
                        </button>
                        <button type="button" class="btn btn-danger" onclick="abrirEliminar(${row.id_categoria})">
                            <img src="../../resources/img/eliminar.png" alt="lapizEditar" width="30px">
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