

// Evento que carga los recursos de barra de navegación y función de rellenar tabla.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla(3);
    //Llamar la función para cargar los datos de la tabla.
    cargarDirecciones();
});

// Constante para establecer el formulario de registrar cliente.
const FORM_MODAL = document.getElementById('formInfoCliente');

// Método del evento para cuando se envía el formulario de registrar cliente.
FORM_MODAL.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(FORM_MODAL);    
    alert('asd  ');
});



