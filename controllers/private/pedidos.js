const IMGFILTRO = document.getElementById('contenedor-img-filtro');

if(window.screen.width<995){
    IMGFILTRO.remove();
}

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla();
});