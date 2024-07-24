// Se declara la constante que almacena la ruta de la API de direcciones.
const DIRECCION_API = 'services/public/direcciones.php'
// Se almacena el contendor que contiene las direcciones del cliente.
const CONTENEDOR_DIRECCIONES = document.getElementById('contenedorDirecciones');
// Constantes para definir el titulo del modal y el texto del botón.
const TITULO_MODAL_DIRECCION = document.getElementById('tituloModalDireccion'),
    BOTON_ACCION = document.getElementById('btnAccion');
// Se almacena el elemento donde se cargará el título del modal.
const TITULO_MODAL_ELIMINAR_DIRECCION = document.getElementById('tituloModalEliminar');
// Constante para almacenar el modal de agregar o editar dirección y el modal para editar la información del cliente.
const MODAL_DIRECCION = new bootstrap.Modal('#modalDireccion'),
    MODAL_EDITAR = new bootstrap.Modal('#editarModal');
// Constante para almacenar el modal que elimina una dirección.
const MODAL_ELIMINAR_DIRECCION = new bootstrap.Modal('#modalBorrarDireccion');
// Constantes para almacenar campo de dirección el form para agregar y editar dirección.
const FORM_DIRECCION = document.getElementById('formDireccion'),
    INPUT_DIRECCION = document.getElementById('inputDireccion'),
    ID_DIRECCION = document.getElementById('idDireccion');
// Constantes para almacenar los elementos que permiten eliminar una dirección.
const FORM_ELIMINAR = document.getElementById('formEliminar'),
    ID_DIRECCION_ELIMINAR = document.getElementById('idDireccionEliminar');
// Constantes para almacenar los elementos que permiten mostrar la información del cliente.
const TXT_NOMBRE = document.getElementById('txtNombres'),
    TXT_APELLIDO = document.getElementById('txtApellidos'),
    TXT_CORREO = document.getElementById('txtDUI'),
    TXT_DUI = document.getElementById('txtCorreo'),
    TXT_MOVIL = document.getElementById('txtMovil'),
    TXT_FIJO = document.getElementById('txtFijo');
// Constantes que permiten almacenar los elementos dentro del modal para editar la información del cliente.
const FORM_EDITAR = document.getElementById('formInfoCliente'),
    NOMBRES = document.getElementById('nombres'),
    APELLIDOS = document.getElementById('apellidos'),
    CORREO = document.getElementById('dui'),
    DUI = document.getElementById('correo'),
    MOVIL = document.getElementById('movil'),
    FIJO = document.getElementById('fijo');


// Evento que carga los recursos de barra de navegación y función de rellenar tabla.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla(3);
    //Llamar la función para cargar los datos de la tabla.
    cargarDirecciones();
    //Llamar la función para cargar los datos del cliente en los campos.
    cargarInfo();
});

// Función que permite cargar la información del cliente.
const cargarInfo = async () => {
    // Se realiza una petición a la API para obtener la información del cliente.
    const DATA = await fetchData(USER_API, 'readProfile');
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Se carga la información del cliente en los campos.
        TXT_NOMBRE.value = DATA.dataset.nombre_cliente;
        TXT_APELLIDO.value = DATA.dataset.apellido_cliente;
        TXT_CORREO.value = DATA.dataset.correo_cliente;
        TXT_DUI.value = DATA.dataset.dui_cliente;
        TXT_MOVIL.value = DATA.dataset.telefono_movil;
        TXT_FIJO.value = DATA.dataset.telefono_fijo;
    } else {
        // Se muestra el mensaje con el error.
        sweetAlert(2, DATA.error, false);
    }
}

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
            <div class="col-9 col-md-5">
                <div class="row d-flex">
                    <div class="col-10 mb-3 d-flex align-items-start">
                        <label for="${row.id_direccion}" class="form-label"></label>
                        <input type="text" class="form-control" placeholder="${row.direccion}" id="${row.id_direccion}" disabled>
                    </div>
                    <div class="col-2 mb-3 d-flex align-items-start">
                        <div class="btn btn-success" onclick="abrirModalDireccion('Editar dirección', ${row.id_direccion})">
                            <img src="../../resources/img/lapiz.png" height="20px" width="20px" alt="editar">
                        </div>
                        <div class="btn btn-danger" onclick="abrirModalEliminarDireccion(${row.id_direccion})">
                            <img src="../../resources/img/eliminar.png" height="20px" width="20px" alt="eliminar">
                        </div>
                    </div>
                </div>
            </div>
            `;
        });
    } else {
        if (DATA.error == 'No se han agregado direcciones') {
            // Se muestra el mensaje con el error.
            sweetAlert(4, DATA.error, false);
            // Se vacía el contenido del contenedorDirecciones.
            CONTENEDOR_DIRECCIONES.innerHTML = '';
        } else {
            // Se muestra el mensaje con el error.
            sweetAlert(2, DATA.error, false);
        }
    }
    // Se agrega el botón para abrir el modal que permite agregar una dirección.
    CONTENEDOR_DIRECCIONES.innerHTML += `
    <div class="col-11 col-sm-5 d-flex align-items-center justify-content-center fw-medium align-self-start" id="contenedor-agregar-direccion" onclick="abrirModalDireccion('Agregar dirección')">
        <p class="text-center agregar-direccion">Agregar dirección</p>
        <p class="agregar-direccion fs-5 ms-2">+</p>
    </div>`;
}

// La función abrirModalDireccion abre el modal para agregar o editar una dirección.
const abrirModalDireccion = async (tituloModal, idDireccion = null) => {
    // Se vacía el campo de dirección.
    FORM_DIRECCION.reset();
    // Se define el título del modal.
    TITULO_MODAL_DIRECCION.textContent = tituloModal;
    // Se define el texto del botón.
    BOTON_ACCION.textContent = tituloModal;
    // Se verifica que se haya enviado el idDireccion para editar la dirección.
    if (idDireccion) {
        // Se elimina el antiguo color del botón.
        BOTON_ACCION.classList.remove('btn-primary');
        // Se agrega el nuevo color del botón.
        BOTON_ACCION.classList.add('btn-success');
        // Se crea un form donde se almacenará el id de la dirección.
        const FORM = new FormData();
        // Se almacena la variable idDireccion en el form.
        FORM.append('idDireccion', idDireccion);
        // Se envía una petición a la API para conseguir la información del registro.
        const DATA = await fetchData(DIRECCION_API, 'readOne', FORM);
        // Se verifica que la respuesta de la API sea satisfactoria.
        if (DATA.status) {
            // Se asigna el valor del campo idDireccion.
            ID_DIRECCION.value = DATA.dataset.id_direccion;
            // Se asigna el valor del campo inputDireccion.
            INPUT_DIRECCION.value = DATA.dataset.direccion;
            // Se muestra el modal.
            MODAL_DIRECCION.show();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    } else {
        // Se elimina el antiguo color del botón.
        BOTON_ACCION.classList.remove('btn-success');
        // Se agrega el nuevo color del botón.
        BOTON_ACCION.classList.add('btn-primary');
        // Se muestra el modal.
        MODAL_DIRECCION.show();
    }
}

// La función abrirModalEliminarDireccion abre el modal para eliminar una dirección.
const abrirModalEliminarDireccion = async (idDireccion) => {
    // Se asigna el id de dirección al valor del input.
    ID_DIRECCION_ELIMINAR.value = idDireccion;
    // Se crea un form donde se almacenará el id de la dirección.
    const FORM = new FormData(FORM_ELIMINAR);
    // Se envía una petición a la API para conseguir la información del registro.
    const DATA = await fetchData(DIRECCION_API, 'readOne', FORM);
    // Se verifica que la respuesta de la API sea satisfactoria.
    if (DATA.status) {
        // Se asigna el valor del campo idDireccionEliminar.
        ID_DIRECCION_ELIMINAR.value = DATA.dataset.id_direccion;
        // Se asigna el título del modal.
        TITULO_MODAL_ELIMINAR_DIRECCION.textContent = '¿Desea eliminar la dirección ' + DATA.dataset.direccion + "?";
        // Se muestra el modal.
        MODAL_ELIMINAR_DIRECCION.show();
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

// La función abrirModalInfo abre el modal para editar la información del cliente.
const abrirModalInfo = async () => {
    // Se realiza una petición a la API para obtener la información del cliente.
    const DATA = await fetchData(USER_API, 'readProfile');
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        // Se cargan los datos del usuario en los campos.
        NOMBRES.value = DATA.dataset.nombre_cliente;
        APELLIDOS.value = DATA.dataset.apellido_cliente;
        CORREO.value = DATA.dataset.correo_cliente;
        DUI.value = DATA.dataset.dui_cliente;
        MOVIL.value = DATA.dataset.telefono_movil;
        FIJO.value = DATA.dataset.telefono_fijo;
        // Se muestra el modal.
        MODAL_EDITAR.show();
    } else {
        // Se muestra el mensaje con el error.
        sweetAlert(2, DATA.error, false);
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
        // Se carga nuevamente el contenedor de direcciones para visualizar los cambios.
        cargarDirecciones();
        // Se vacía el campo de dirección.
        FORM_DIRECCION.reset();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

FORM_ELIMINAR.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_ELIMINAR);
    // Petición para eliminar la dirección.
    const DATA = await fetchData(DIRECCION_API, 'deleteRow', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        MODAL_ELIMINAR_DIRECCION.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente el contenedor de direcciones para visualizar los cambios.
        cargarDirecciones();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

async function generarInfo() {
    // Se realiza una petición a la API para obtener la información del cliente.
    const DATA = await fetchData(USER_API, 'readProfile');
    // Si la respuesta es satisfactoria se ejecuta el código.
    if (DATA.status) {
        
        
    } else {
        // Se muestra el mensaje con el error.
        sweetAlert(2, DATA.error, false);
    }
}

// Función que permite descargar el pdf en el equipo del cliente.
function descargarPdf(pdf){
    // Se crea la etiqueta a para abrir el documento en una nueva pestaña.
    let link = document.createElement('a');
    // Se indica que el documento se abrirá en una nueva pestaña.
    link.target = '_blank';
    // Se almacena el pdf en la etiqueta.
    link.href = pdf.output('bloburl');
    // Se configura el nombre del documento.
    link.download = 'Informacion Personal.pdf';
    // Se abre el link para comenzar la descarga y se quita el link posteriormente.
    link.click();
    link.remove();
}