const MODALCPRODUCTO = new bootstrap.Modal('#crearModal_producto');
const MODALIPRODUCTO = new bootstrap.Modal('#infoModal_producto');
const SEPARADORV = document.getElementById('separadorV');
const SEPARADORH = document.getElementById('separadorH');

function abrirCrear(){
    MODALCPRODUCTO.show();
}

function abrirInfoProducto(){
    MODALIPRODUCTO.show();
}

if(window.screen.width <= 430){
    SEPARADORV.remove();
    // separacion de los botones de abajo
}
else if(window.screen.width < 992){
    SEPARADORV.remove();
}
else{
    SEPARADORH.remove();
}