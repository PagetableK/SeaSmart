const ADMINISTRADOR_API = 'services/admin/administrador.php';
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
vanillaTextMask.maskInput({
    inputElement: document.getElementById('telefonoCliente'),
    mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
});
// Llamada a la función para establecer la mascara del campo DUI.
vanillaTextMask.maskInput({
    inputElement: document.getElementById('duiCliente'),
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/]
});

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se asigna como título la categoría de los productos.
    MAIN_TITLE.textContent = 'Crear cuenta';
    // LLamada a la función para asignar el token del reCAPTCHA al formulario.
    reCAPTCHA();
});

// Método del evento para cuando se envía el formulario de registrar cliente.
FORM_REGISTRO.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_REGISTRO);
    // Petición para registrar un cliente.
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'inicio_sesion.html');
    } else if (DATA.recaptcha) {
        sweetAlert(2, DATA.error, false, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
        // Se genera un nuevo token cuando ocurre un problema.
        reCAPTCHA();
    }
});

/*
*   Función para obtener un token del reCAPTCHA y asignarlo al formulario.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
function reCAPTCHA() {
    // Método para generar el token del reCAPTCHA.
    grecaptcha.ready(() => {
        // Constante para establecer la llave pública del reCAPTCHA.
        const PUBLIC_KEY = '6LdBzLQUAAAAAJvH-aCUUJgliLOjLcmrHN06RFXT';
        // Se obtiene un token para la página web mediante la llave pública.
        grecaptcha.execute(PUBLIC_KEY, { action: 'homepage' }).then((token) => {
            // Se asigna el valor del token al campo oculto del formulario
            document.getElementById('gRecaptchaResponse').value = token;
        });
    });
}


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

function ValidarCampos(asyn){
    location.href='registro_finalizar.html';
}

BTNCONTINUAR.addEventListener('submit', async(event) => {
    event.preventDefault();
    const FORM = new FormData(SAVE_FORM);
    const DATA = await fetchData(ADMINISTRADOR_API, FORM);
    if(DATA.status)
    {
        alert('a');
    }
});