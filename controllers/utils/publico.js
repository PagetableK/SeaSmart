const MAIN = document.querySelector('main');
const titulo = document.title;

// if(titulo == "SeaSmart"){
//     MAIN.insertAdjacentHTML('beforebegin', `
//     <header>
//         <nav class="navbar navbar-expand-lg" style="background-color: #BCE7FD;">
//             <div class="container-fluid">
//                 <div class="col d-flex" id="seasmart-container">
//                     <div class="row d-flex justify-content-start">
//                         <div class="col-12 d-flex align-items-center justify-content-center">
//                             <img src="../../resources/img/Logo1.png" width="75px" height="75px">
//                         </div>
//                         <div class="col-12 d-flex align-items-center justify-content-center">
//                             <p style="font-weight: 500; font-size: x-large;">S<span
//                                     style="color: #3E88DE;">ea</span>S<span style="color: #3E88DE;">mart</span></p>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col">
//                     <form class="d-flex" role="busqueda" id="form-buscarCategoria">
//                         <input class="form-control" type="buscar" placeholder="Buscar una categoría.." aria-label="Buscar"
//                             id="buscarCategoria">
//                         <button class="btn" type="enviar"><img src="../../resources/img/lupa.png" class="img-fluid"
//                                 width="35px" height="35px" alt="buscarimg"></button>
//                     </form>
//                 </div>
//                 <div class="col d-flex justify-content-end" id="btnCollapse">
//                     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
//                         aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                         <span class="navbar-toggler-icon"></span></button>
//                 </div>
//                 <div class="collapse navbar-collapse" id="navbarNav">
//                     <div class="container-fluid d-flex justify-content-end">
//                         <div class="col-12 d-flex justify-content-center">
//                             <ul class="navbar-nav grid gap-3 text-center" id="barra-elementos">
//                                 <li id="cerrar-sesion">
//                                     Cerrar sesión
//                                 </li>
//                                 <li id="mi-carrito">
//                                     Mi carrito
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="dropdown" id="cuenta">
//                     <img src="../../resources/img/user.png" class="dropdown-toggle" type="button"
//                         width="50px" height="50px" data-bs-toggle="dropdown" aria-expanded="false">
//                     <ul class="dropdown-menu dropdown-menu-end">
//                         <li><a class="dropdown-item me-5" href="index.html" id="cerrarS">Cerrar
//                                 sesión</a></li>
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     </header>
//     `);
// }

let btnCollapse = document.getElementById('btnCollapse');
let listaCollapse = document.getElementById('listaCollapse');
let imagenUsuario = document.getElementById('cuenta');
let imagenCarrito = document.getElementById('carrito');
let estiloBotonCerrar = document.getElementById('cerrar-sesion');
let estiloBotonCarrito = document.getElementById('mi-carrito');

if(window.screen.width >= 992)
{
  btnCollapse.remove();
  listaCollapse.remove();
  estiloBotonCerrar.setAttribute('style', 'display:none;');
  estiloBotonCarrito.setAttribute('style', 'display:none;');
}
else
{
  imagenUsuario.setAttribute('style', 'display:none;');
  imagenCarrito.setAttribute('style', 'display:none');
  estiloBotonCerrar.setAttribute('style', 'display:block;');
  estiloBotonCarrito.setAttribute('style', 'display:block;');
}