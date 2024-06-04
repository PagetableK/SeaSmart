// URL de la API para manejar clientes.
const CLIENTES_API = 'services/public/clientes.php';

// Referencias a los elementos del DOM.
const BTNMOSTRAR = document.getElementById('btnMostrar');
const BTNOCULTAR = document.getElementById('btnOcultar');
const TXTCONTRA = document.getElementById('contraLogin');
const CONTENEDORC = document.getElementById('contenedor_contra');
const BTNENVIAR = document.getElementById('btnEnviar');
// Constante para establecer el formulario de login cliente.
const FORM_LOGIN = document.getElementById('formLogin');
 
// Función para mostrar la contraseña.
function Mostrar(){
    BTNMOSTRAR.remove();
    CONTENEDORC.appendChild(BTNOCULTAR);
    TXTCONTRA.type = 'text';
}

// Función para ocultar la contraseña.
function Ocultar(){
    BTNOCULTAR.remove();
    CONTENEDORC.appendChild(BTNMOSTRAR);
    TXTCONTRA.type = 'password';
}
/*
function ValidarCampos(){
    location.href='index.html';
}
*/

// Evento que se dispara cuando se envía el formulario de login.
FORM_LOGIN.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_LOGIN);
    // Petición para registrar un cliente.
    const DATA = await fetchData(CLIENTES_API, 'logIn', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        console.log('Exito, si  accedi');
        console.log(DATA.username);
        console.log(DATA.debug);
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        console.log('Caí en error');
        sweetAlert(2, DATA.error, false);
    }
});
 
 
// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla(2);
});
 
//Remueve el botón ocultar.
BTNOCULTAR.remove();