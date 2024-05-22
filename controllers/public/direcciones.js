// Se declara la constante que almacena la ruta de la API de direcciones.
const DIRECCION_API = 'services/public/direcciones.php'
// Se almacena el contendor que contiene las direcciones del cliente.
const CONTENEDOR_DIRECCIONES = document.getElementById('contenedorDirecciones');
// Constantes para definir el titulo del modal y el texto del botón.
const TITULO_MODAL_DIRECCION = document.getElementById('tituloModalDireccion'),
    BOTON_ACCION = document.getElementById('btnAccion');
// Constante para almacenar el modal de agregar o editar dirección.
const MODAL_DIRECCION = new bootstrap.Modal('#modalDireccion');
// Constantes para almacenar campo de dirección el form para agregar y editar dirección.
const FORM_DIRECCION = document.getElementById('formDireccion'),
    INPUT_DIRECCION = document.getElementById('inputDireccion'),
    ID_DIRECCION = document.getElementById('idDireccion');


// Evento que carga los recursos de barra de navegación y función de rellenar tabla.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    // cargarPlantilla();
    //Llamar la función para cargar los datos de la tabla.
    cargarDirecciones();
});

// La función cargarDirecciones muestra las descripciones agregadas por el cliente.
const cargarDirecciones = async () => {
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(DIRECCION_API, 'readAll');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se vacía el contenido del contenedorDirecciones.
        CONTENEDOR_DIRECCIONES.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crea un campo de dirección por cada dirección encontrada.
            CONTENEDOR_DIRECCIONES.innerHTML += `
            <div class="col-10 col-sm-5 mb-3">
                <label for="${row.id_direccion}" class="form-label"></label>
                <input type="text" class="form-control" placeholder="${row.direccion}" id="${row.id_direccion}" disabled>
            </div>
            <div class="col-1 mb-3 d-flex align-items-end">
                <div class="btn btn-success" onclick="editarDireccion(${row.id_direccion})">
                    <img src="../../resources/img/lapiz.png" height="20px" width="20px" alt="editar">
                </div>
            </div>
            `;
        });

        // Se agrega el botón para abrir el modal que permite agregar una dirección.
        CONTENEDOR_DIRECCIONES.innerHTML += `
        <div class="col-12 col-sm-6 d-flex align-items-center justify-content-center fw-medium mt-4" id="contenedor-agregar-direccion" onclick="abrirModalDireccion('Agregar dirección')">
            <p class="text-center agregar-direccion">Agregar dirección</p>
            <p class="agregar-direccion fs-5 ms-2">+</p>
        </div>
        `;
    } else {
        if (DATA.error == 'No se han agregado direcciones') {
            sweetAlert(3, DATA.error, false);
        } else {
            sweetAlert(2, DATA.error, false);
        }

        // Se agrega el botón para abrir el modal que permite agregar una dirección.
        CONTENEDOR_DIRECCIONES.innerHTML += `
                <div class="col-12 col-sm-6 d-flex align-items-center justify-content-center fw-medium mt-4" id="contenedor-agregar-direccion" onclick="abrirModalDireccion('Agregar dirección')">
                    <p class="text-center agregar-direccion">Agregar dirección</p>
                    <p class="agregar-direccion fs-5 ms-2">+</p>
                </div>
        `;
    }
}

// La función abrirModalDireccion abre el modal para agregar o editar una dirección.
const abrirModalDireccion = async (tituloModal, idDireccion = null) => {
    // Se verifica que se haya enviado el idDireccion para editar la dirección.
    if (idDireccion) {

    } else {
        // Se define el título del modal.
        TITULO_MODAL_DIRECCION.textContent = tituloModal;
        // Se define el texto del botón.
        BOTON_ACCION.textContent = tituloModal;
        // Se elimina el antiguo color del botón.
        BOTON_ACCION.classList.remove('btn-success');
        // Se agrega el nuevo color del botón.
        BOTON_ACCION.classList.add('btn-primary');
        // Se muestra el modal.
        MODAL_DIRECCION.show();
    }
}

// Evento que se desencadena al hacer click en el botón Agregar/Editar dirección.
FORM_DIRECCION.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_DIRECCION);
    // Se valida el valor del input idDireccion para definir la acción a realizar.
    (ID_DIRECCION.value) ? action = 'updateRow' : action = 'createRow';
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(DIRECCION_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        MODAL_DIRECCION.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        cargarDirecciones();
    } else {
        if (DATA.exception == 'Violación de restricción de integridad') {
            sweetAlert(3, 'La dirección ya ha sido ingresada', false);
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
    // Se vacía el campo de dirección.
    FORM_DIRECCION.reset();
});