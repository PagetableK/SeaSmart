const MODALCOLOR = new bootstrap.Modal('#agregarModal_color');
const MODALECOLOR = new bootstrap.Modal('#editModal_color');
const MODALBCOLOR = new bootstrap.Modal('#borrarModal_color');

function abrirCrear(){
    MODALCOLOR.show();
}

function abrirEditar(){
    MODALECOLOR.show();
}

function abrirEliminar(){
    MODALBCOLOR.show();
}

document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla();
}); 