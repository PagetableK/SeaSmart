// Constante para establecer el formulario de registro del primer usuario.
const SIGNUP_FORM = document.getElementById('formRegistro');
// Constante para establecer el formulario de inicio de sesión.
const LOGIN_FORM = document.getElementById('formLogin');
// Constante para establecer el elemento del título principal.
const LB_TITULO = document.getElementById('lbIniciarSesion');
// Constante para establecer el contenedor de ambos form.
const CONTENEDOR_FORMS = document.getElementById('contenedorForms');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Llamada a la función para mostrar el encabezado del documento.
    loadTemplate();
    // Petición para consultar los usuarios registrados.
    const DATA = await fetchData(USER_API, 'readUsers');
    // Se comprueba si existe una sesión, de lo contrario se ejecuta el código de forma normal.
    if (DATA.session) {
        // Se direcciona a la página web de bienvenida.
        location.href = 'dashboard.html';
    } else if (DATA.status) {
        // Se establece el título del contenido principal.
        LB_TITULO.textContent = 'Iniciar sesión';
        // Se muestra el formulario para iniciar sesión.
        LOGIN_FORM.classList.remove('d-none');
        //Cambia el tamaño de la columna del contenedor del form
        CONTENEDOR_FORMS.classList.add('col-md-6');
        //Muestra la alerta que informa el estado de la cuenta
        sweetAlert(4, DATA.message, true);
    } else {
        // Se establece el título del contenido principal.
        LB_TITULO.textContent = 'Registrarse';
        // Se muestra el formulario para registrar el primer usuario.
        SIGNUP_FORM.classList.remove('d-none');
        //Cambia el tamaño de la columna del contenedor del form
        CONTENEDOR_FORMS.classList.add('col-12', 'px-md-5');
        //Muestra la alerta que informa el estado de la cuenta
        sweetAlert(4, DATA.error, true);   
    }

    console.log(DATA);
});

// Método del evento para cuando se envía el formulario de registro del primer usuario.
SIGNUP_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SIGNUP_FORM);
    // Petición para registrar el primer usuario del sitio privado.
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

// Método del evento para cuando se envía el formulario de inicio de sesión.
LOGIN_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(LOGIN_FORM);
    // Petición para iniciar sesión.
    const DATA = await fetchData(USER_API, 'logIn', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'dashboard.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});