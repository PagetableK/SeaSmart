const MODALTALLA= new bootstrap.Modal('#crearModal_talla');
const MODALETALLA = new bootstrap.Modal('#editModal_talla');
const MODALBTALLA = new bootstrap.Modal('#borrarModal_talla');

function abrirCrear(){
    MODALTALLA.show();
}

function abrirEditar(){
    MODALETALLA.show();
}

function abrirEliminar(){
    MODALBTALLA.show();
}

document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla();
});