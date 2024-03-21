const MODALESUBCATEGORIA = new bootstrap.Modal('#editModal_subCategoria');
const MODALCSUBCATEGORIA = new bootstrap.Modal('#crearModal_subcategoria');
const MODALBSUBCATEGORIA = new bootstrap.Modal('#borrarModal_subcategoria');

function abrirCrear(){
    MODALCSUBCATEGORIA.show();
}

function abrirEditar(){
    MODALESUBCATEGORIA.show();
}

function abrirEliminar(){
    MODALBSUBCATEGORIA.show();
}