const MODALCCATEGORIA = new bootstrap.Modal('#agregarModal_categoria');
const MODALECATEGORIA = new bootstrap.Modal('#editModal_categoria');
const MODALBCATEGORIA = new bootstrap.Modal('#borrarModal_categoria');

function abrirCrear(){
    MODALCCATEGORIA.show();
}

function abrirEditar(){
    MODALECATEGORIA.show();
}

function abrirEliminar(){
    MODALBCATEGORIA.show();
}