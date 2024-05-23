const CLIENTES_API = 'services/public/clientes.php';
const BTNMOSTRAR = document.getElementById('btnMostrar');
const BTNOCULTAR = document.getElementById('btnOcultar');
const TXTCONTRA = document.getElementById('contraRegistro');
const CONTENEDORC = document.getElementById('contenedor_contra');
const BTNMOSTRAR1 = document.getElementById('btnMostrar1');
const BTNOCULTAR1 = document.getElementById('btnOcultar1');
const TXTCONTRA1 = document.getElementById('confirmarContra'); 
const CONTENEDORC1 = document.getElementById('contenedor_contra_2');
const BTNCONTINUAR = document.getElementById('btnContinuar');

// Constante para establecer el formulario de registrar cliente.
const FORM_REGISTRO = document.getElementById('formRegistro');
// Llamada a la función para establecer la mascara del campo teléfono.
// vanillaTextMask.maskInput({
//     inputElement: document.getElementById('telefonoCliente'),
//     mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
// });
// Llamada a la función para establecer la mascara del campo DUI.
// vanillaTextMask.maskInput({
//     inputElement: document.getElementById('duiCliente'),
//     mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
// });

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla(2);
});

// Método del evento para cuando se envía el formulario de registrar cliente.
FORM_REGISTRO.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_REGISTRO);
    // Petición para registrar un cliente.
    const DATA = await fetchData(CLIENTES_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'inicio_sesion.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});


//Esto ya estaba
function MostrarContra(){
    BTNMOSTRAR.remove();
    CONTENEDORC.appendChild(BTNOCULTAR);
    TXTCONTRA.type = 'text';
}

function OcultarContra(){
    BTNOCULTAR.remove();
    CONTENEDORC.appendChild(BTNMOSTRAR);
    TXTCONTRA.type = 'password';
}

function MostrarContra1(){
    BTNMOSTRAR1.remove();
    CONTENEDORC1.appendChild(BTNOCULTAR1);
    TXTCONTRA1.type = 'text';
}

function OcultarContra1(){
    BTNOCULTAR1.remove();
    CONTENEDORC1.appendChild(BTNMOSTRAR1);
    TXTCONTRA1.type = 'password';
}

BTNOCULTAR.remove();
BTNOCULTAR1.remove();
