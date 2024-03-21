/*
    Controlador que se utilizará en sitio privado de administrador
*/

//Declarar constante para asignar el contenido de la etiqueta main
const MAIN = document.querySelector('main');
var AnchoP = document.querySelector('html');
let colorBotones;
let [colorBoton1, colorBoton2, colorBoton3, colorBoton4, colorBoton5, colorBoton6,
    colorBoton7] = Array(7).fill('bg-light');
let [colorTexto1, colorTexto2, colorTexto3, colorTexto4, colorTexto5, colorTexto6,
    colorTexto7] = Array(7).fill('text-dark');
let titulo = document.title;


if (window.screen.width < 992) {
    [colorBoton1, colorBoton2, colorBoton3, colorBoton4, colorBoton5, colorBoton6,
        colorBoton7] = '';
}
else {

    if (titulo == 'Tallas') {
        colorBoton7 = 'bg-info';
        colorTexto7 = 'text-light';
    }
    else if (titulo == 'Colores') {
        colorBoton6 = 'bg-info';
        colorTexto6 = 'text-light';
    }
    else if (titulo == 'Categorías') {
        colorBoton5 = 'bg-info';
        colorTexto5 = 'text-light';
    }
    else if (titulo == 'Sub-categorías') {
        colorBoton4 = 'bg-info';
        colorTexto4 = 'text-light';
    }
    else if (titulo == 'Productos') {
        colorBoton3 = 'bg-info';
        colorTexto3 = 'text-light';
    }
    else if (titulo == 'Calificaciones') {
        colorBoton1 = 'bg-info';
        colorTexto1 = 'text-light';
    }
    else if (titulo == 'Pedidos') {
        colorBoton2 = 'bg-info';
        colorTexto2 = 'text-light';
    }
}

MAIN.insertAdjacentHTML('beforebegin', `
<header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                    <div class="col" id="seasmart-container">
                        <div class="row d-flex justify-content-start">
                            <div class="col-12 d-flex align-items-center justify-content-center">
                                <img src="../../resources/img/Logo1.png" width="75px" height="75px">
                            </div>
                            <div class="col-12 d-flex align-items-center justify-content-center">
                                <p id="texto-ss">S<span>ea</span>S<span>mart</span></p>
                            </div>
                        </div>
                    </div>
                    <div class="col d-flex justify-content-end" id="btnCollapse">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span></button>
                    </div>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <div class="container-fluid d-flex justify-content-center">
                        <ul class="navbar-nav grid gap-3">
                            <li class="nav-item rounded-pill ${colorBoton1}" id="">
                                <a class="nav-link fs-6 text-center" href="calificaciones.html"><span
                                        class="${colorTexto1}">Calificaciones</span></a>
                            </li>
                            <li class="nav-item rounded-pill ${colorBoton2}" id="">
                                <a class="nav-link fs-6 text-center" href="pedidos.html"><span class="${colorTexto2}">Pedidos</span></a>
                            </li>
                            <li class="nav-item rounded-pill ${colorBoton3}" id="">
                                <a class="nav-link fs-6 text-center" href="productos.html"><span class="${colorTexto3}">Productos</span></a>
                            </li>
                            <li class="nav-item rounded-pill ${colorBoton4}" id="">
                                <a class="nav-link fs-6 text-center" href="subcategorias.html"><span class="${colorTexto4}">Sub-categorías</span></a>
                            </li>
                            <li class="nav-item rounded-pill ${colorBoton5}" id="">
                                <a class="nav-link fs-6 text-center" href="categorias.html"><span class="${colorTexto5}">Categorías</span></a>
                            </li>
                            <li class="nav-item rounded-pill ${colorBoton6}" id="">
                                <a class="nav-link fs-6 text-center" href="colores.html"><span class="${colorTexto6}">Colores</span></a>
                            </li>
                            <li class="nav-item rounded-pill ${colorBoton7}" id="">
                                <a class="nav-link fs-6 text-center" href="tallas.html"><span class="${colorTexto7}">Tallas</span></a>
                            </li>
                            <li class="nav-item mx-auto px-auto" id="cerrar-sesion">
                                <a class="nav-link fs-6 text-center" href="index.html"><span>Cerrar sesión</span></a>
                            </li>
                        </ul>
                    </div>
                    </div>
                    <div class="col d-flex align-items-center justify-content-center" id="imagen-usuario">
                        <div class="dropdown" id="cuenta">
                            <img src="../../resources/img/user.png" class="dropdown-toggle" type="button" width="50px"
                                height="50px" data-bs-toggle="dropdown" aria-expanded="false">
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item me-5" href="index.html" id="cerrarS">Cerrar sesión</a></li>
                            </ul>
                        </div>
                    </div>
            </div>
        </nav>
    </header>
`);

let btnCollapse = document.getElementById('btnCollapse');
let imagenUsuario = document.getElementById('cuenta');
let SeaContainer = document.getElementById('seasmart-container');
let estiloIconoC = document.getElementById('imagen-usuario');;
let estiloBotonC = document.getElementById('cerrar-sesion');;




if (window.screen.width >= 992) {
    btnCollapse.remove();
    estiloBotonC.remove();
}
else {
    imagenUsuario.remove();
    estiloIconoC.remove();
    SeaContainer.classList.add("d-flex");
    SeaContainer.classList.add("justify-content-start");
}