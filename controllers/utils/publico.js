const MAIN = document.querySelector('main');
const titulo = document.title;

if (titulo == "SeaSmart") {
    MAIN.insertAdjacentHTML('beforebegin', `

    `);
}

let btnCollapse = document.getElementById('btnCollapse');
let listaCollapse = document.getElementById('listaCollapse');
let imagenUsuario = document.getElementById('cuenta');
let imagenCarrito = document.getElementById('carrito');
let estiloBotonCerrar = document.getElementById('cerrar-sesion');
let estiloBotonCarrito = document.getElementById('mi-carrito');

if (window.screen.width >= 992) {
    btnCollapse.remove();
    estiloBotonCerrar.setAttribute('style', 'display:none;');
    estiloBotonCarrito.setAttribute('style', 'display:none;');
}
else {
    imagenUsuario.setAttribute('style', 'display:none');
    imagenCarrito.setAttribute('style', 'display:none');
    estiloBotonCerrar.setAttribute('style', 'display:block;');
    estiloBotonCarrito.setAttribute('style', 'display:block;');
}