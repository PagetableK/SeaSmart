// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/admin/calificaciones.php';
const IMGFILTRO = document.getElementById('contenedor-img-filtro');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Constante para obtener el número de horas.
    const HOUR = new Date().getHours();
    // Se define una variable para guardar un saludo.
    let greeting = '';
    // Dependiendo del número de horas transcurridas en el día, se asigna un saludo para el usuario.
    if (HOUR < 12) {
        greeting = 'Buenos días';
    } else if (HOUR < 19) {
        greeting = 'Buenas tardes';
    } else if (HOUR <= 23) {
        greeting = 'Buenas noches';
    }

    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    LB_TITULO.textContent = `${greeting}, bienvenido`;
});


// if (window.screen.width < 995) {
//     IMGFILTRO.remove();
// }