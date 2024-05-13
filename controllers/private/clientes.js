// Ruta donde se encuentra el servicio de clientes.
const CLIENTE_API = 'services/admin/clientes.php';
// Se almacena el formCliente para agregar o editar un cliente
const FORM_CLIENTE = document.getElementById('formCliente');
// Se almacenan dentro de constantes los campos del form formCliente.
const ID_CLIENTE = document.getElementById('idCliente'),
    NOMBRE_CLIENTE = document.getElementById('nombreCliente'),
    APELLIDO_CLIENTE = document.getElementById('apellidoCliente'),
    CORREO_CLIENTE = document.getElementById('correoCliente'),
    CONTRA_CLIENTE = document.getElementById('contraCliente'),
    CONFIRMAR_CONTRA_CLIENTE = document.getElementById('confirmarContraCliente'),
    DUI_CLIENTE = document.getElementById('duiCliente'),
    TELEFONO_CLIENTE = document.getElementById('telefonoCliente'),
    TELEFONO_FIJO = document.getElementById('telefonoFijoCliente'),
    ESTADO_CLIENTE = document.getElementById('estadoCliente');

// Función que retorna el estado en base del resultado de la bd
function validarEstado(estadoCliente){
    if(estadoCliente == 1){
        return "Activo";
    } else{
        return "Dado de baja";
    }
}

// Función para mostrar el modal que agrega o edita clientes.
const abrirModalCliente = async (tituloModal, idCliente) => {
    // Se configura el título del modal.
    TITULO_CLIENTE.textContent = tituloModal;
    if (idCliente == null) {
        // Se remueve el antiguo color del botón.
        BOTON_ACCION_CLIENTE.classList.remove('btn-success');
        // Se configura el nuevo color del botón.
        BOTON_ACCION_CLIENTE.classList.add('btn-primary');
        // Se configura el título del botón.
        BOTON_ACCION_CLIENTE.innerHTML = tituloModal;
        // Se limpian los input para dejarlos vacíos.
        FORM_CLIENTE.reset();
        // Se cambia el estado del checkbox a checked.
        ESTADO_CLIENTE.checked = true;
        // Se esconde el checkbox.
        ESTADO_CLIENTE.classList.add('d-none');
        // Se muestra el modal para agregar clientes.
        MODAL_CLIENTE.show();
    } else {
        // Se define una constante tipo objeto que almacenará el idCliente.
        const FORM = new FormData();
        // Se almacena el nombre del campo y el valor (idCliente) en el formulario.
        FORM.append('idCliente', idCliente);
        // Petición para obtener los datos del registro solicitado.
        const DATA = await fetchData(CLIENTE_API, 'readOne', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se remueve el antiguo color del botón.
            BOTON_ACCION_CLIENTE.classList.remove('btn-primary');
            // Se configura el nuevo color del botón.
            BOTON_ACCION_CLIENTE.classList.add('btn-success');
            // Se configura el título del botón.
            BOTON_ACCION_CLIENTE.innerHTML = tituloModal;
            // Se prepara el formulario para cargar los input del idCliente.
            FORM_CLIENTE.reset();
            // Se cargan los campos de la base en una variable.
            const ROW = DATA.dataset;
            // Se carga el id de cliente en el input idCliente.
            ID_CLIENTE.value = ROW.idCliente;
            // Se carga el nombre del cliente en el input nombreCliente.
            NOMBRE_CLIENTE.value = ROW.nombre_cliente;
            // Se carga el apellido del cliente en el input apellidoCliente.
            APELLIDO_CLIENTE.value = ROW.apellido_cliente;
            // Se carga el correo del cliente en el input correoCliente.
            CORREO_CLIENTE.value = ROW.correo_cliente;
            // Se carga el DUI del cliente en el input duiCliente.
            DUI_CLIENTE.value = ROW.dui_cliente
            // Se valida el estado del cliente.
            if(ROW.estadoCliente = 0){
                // Se carga el estado del cliente en el checkbox estadoCliente.
                ESTADO_CLIENTE.unchecked = true;
            } else{
                ESTADO_CLIENTE.checked = true;
            }
            // Se muestra el checkbox.
            ESTADO_CLIENTE.classList.remove('d-none');
            // Se carga el teléfono del cliente.
            TELEFONO_CLIENTE.value = ROW.telefono_movil;
            // Se carga el teléfono fijo del cliente.
            TELEFONO_FIJO.value = ROW.telefono_fijo;
            // Se deshabilitan los campos de contraseña y confirmar contraseña.
            CONTRA_CLIENTE.disabled = true;
            CONFIRMAR_CONTRA_CLIENTE.disabled = true;
            // Se abre el modal editar cliente.
            MODAL_CLIENTE.show();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

// Método del evento para cuando se envía el formulario de agregar o editar cliente.
FORM_CLIENTE.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_CLIENTE.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_CLIENTE);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(CLIENTE_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        MODAL_CLIENTE.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        cargarTabla();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});