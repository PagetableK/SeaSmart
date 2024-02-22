/*
    Controlador que se utilizará en sitio privado de administrador
*/

//Declarar constante para asignar el contenido de la etiqueta main
const MAIN = document.querySelector('main');
var AnchoP = document.querySelector('html');
let colorBotones;
let estiloIconoC;
let estiloBotonC;


if(window.screen.width < 992)
{
  estiloIconoC = 'style="display: none;"';
  estiloBotonC = 'style="display: block;"';
  colorBotones = '';
}
else
{
  estiloIconoC = 'style="display: block;"';
  estiloBotonC = 'style="display: none;"';
  colorBotones = 'bg-light';
}

MAIN.insertAdjacentHTML('beforebegin', `
<header>
      <nav class="navbar navbar-expand-lg" style="background-color: #BCE7FD;">
        <div class="container-fluid">
          <div class="col col-lg-2">
            <div class="row">
              <div class="col-12 d-flex align-items-center justify-content-center">
                <img src="../../resources/img/Logo1.png" width="75px" height="75px">
              </div>
              <div class="col-12 d-flex align-items-center justify-content-center">
                <p style="font-weight: 500; font-size: x-large;">S<span style="color: #3E88DE;">ea</span>S<span style="color: #3E88DE;">mart</span></p>
              </div>
            </div>
          </div>
          <div class="col-0 d-flex align-items-end justify-content-end">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span></button>
          </div>
          <div class="col col-lg-1 collapse navbar-collapse d-flex align-items-center justify-content-center" id="navbarNav">
            <ul class="navbar-nav grid gap-3">
              <li class="nav-item rounded-pill ${colorBotones} mx-auto px-auto" id="">
                  <a class="nav-link" aria-current="page" href="#"><span style="font-weight: 600;">Calificaciones</span></a>
              </li>
              <li class="nav-item rounded-pill ${colorBotones} mx-auto px-auto" id="" >
                <a class="nav-link" href="#"><span style="font-weight: 600;">Pedidos</span></a>
              </li>
              <li class="nav-item rounded-pill ${colorBotones} mx-auto px-auto" id="">
                <a class="nav-link" href="#"><span style="font-weight: 600;">Productos</span></a>
              </li>
              <li class="nav-item rounded-pill ${colorBotones} mx-auto px-auto" id="">
                <a class="nav-link" href="#"><span style="font-weight: 600;">Sub-categorías</span></a>
              </li>
              <li class="nav-item rounded-pill ${colorBotones} mx-auto px-auto" id="">
                <a class="nav-link" href="#"><span style="font-weight: 600;">Categorías</span></a>
              </li>
              <li class="nav-item rounded-pill ${colorBotones} mx-auto px-auto" id="">
                <a class="nav-link" href="#"><span style="font-weight: 600;">Colores</span></a>
              </li>
              <li class="nav-item rounded-pill ${colorBotones} mx-auto px-auto" id="">
                <a class="nav-link" href="#"><span style="font-weight: 600;">Tallas</span></a>
              </li>
              <li class="nav-item mx-auto px-auto" id="cerrar-sesion" ${estiloBotonC}>
                <a class="nav-link" href="#"><span style="font-weight: 600;">Cerrar sesión</span></a>
              </li>
            </ul>
          </div>
          <nav class="col col-lg-1 d-flex align-items-center justify-content-center">
            <div class="dropdown" id="cuenta" ${estiloIconoC}>
              <img src="../../resources/img/user.png" class="dropdown-toggle" type="button" width="50px"
                height="50px" data-bs-toggle="dropdown" aria-expanded="false">
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item me-5" href="#" id="cerrarS">Cerrar sesión</a></li>
              </ul>
            </div>
          </nav>
        </div>
      </nav>
    </header>
`);