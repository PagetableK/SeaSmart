const MAIN = document.querySelector('main');
const titulo = document.title;

if (titulo == "SeaSmart") {
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg" style="background-color: #BCE7FD;">
            <div class="container-fluid">
                <div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2" id="seasmart-container">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <img src="../../resources/img/Logo1.png" width="55px" height="55px">
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <p style="font-weight: 500; font-size: x-large;">S<span
                                    style="color: #3E88DE;">ea</span>S<span style="color: #3E88DE;">mart</span></p>
                        </div>
                    </div>
                </div>
                <div class="col-8 d-flex justify-content-center" id="divBuscador">
                    <form class="d-flex w-75" role="busqueda" id="form-buscarCategoria">
                        <input class="form-control" type="buscar" placeholder="Buscar una categoría.."
                            aria-label="Buscar" id="buscarCategoria">
                        <div class="btn input-group-addon d-flex align-items-center justify-content-center"
                            id="btnBuscarCategoria">
                            <img src="../../resources/img/lupaa.png" class="img-fluid" width="18px" height="18px"
                                alt="buscarimg">
                        </div>
                    </form>
                </div>
                <div class="col-4 col-xs-2 col-sm-2 col-md-2 d-flex justify-content-end" id="btnCollapse">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#listaCollapse" aria-controls="listaCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span></button>
                </div>
                <div class="collapse navbar-collapse" id="listaCollapse">
                    <div class="container-fluid d-flex justify-content-end">
                        <div class="col-12 d-flex justify-content-center">
                            <ul class="navbar-nav grid gap-3 text-center" id="barra-elementos">
                                <li id="cerrar-sesion">
                                    Cerrar sesión
                                </li>
                                <li id="mi-carrito">
                                    Mi carrito
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-2 d-flex justify-content-center" id="opcionesUsuario">
                    <div class="dropdown mt-2" id="cuenta">
                        <img src="../../resources/img/user.png" class="dropdown-toggle" type="button" width="25px"
                            height="25px" data-bs-toggle="dropdown" aria-expanded="false" alt="user">
                        <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item pe-5 ps-5 text-center" href="index.html" id="btnLogin">Iniciar sesión</a></li>
                        <li><a class="dropdown-item pe-5 ps-5 text-center botonAbajo" href="index.html" id="btnRegistro">Registrarse</a></li>
                        </ul>
                    </div>
                    <div class="btn" type="button" id="carrito">
                        <img src="../../resources/img/carrito-de-compras.png" alt="carrito" height="25px" width="25px">
                    </div>
                </div>
            </div>
        </nav>
    </header>
    `);
}
else if(titulo == "Mi cuenta")
{
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg" style="background-color: #BCE7FD;">
            <div class="container-fluid">
                <div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2" id="seasmart-container">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <img src="../../resources/img/Logo1.png" width="55px" height="55px">
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <p style="font-weight: 500; font-size: x-large;">S<span
                                    style="color: #3E88DE;">ea</span>S<span style="color: #3E88DE;">mart</span></p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xs-10 col-sm-10 col-md-10 d-flex justify-content-end" id="btnCollapse">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#listaCollapse" aria-controls="listaCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span></button>
                </div>
                <div class="collapse navbar-collapse" id="listaCollapse">
                    <div class="container-fluid d-flex justify-content-end">
                        <div class="col-12 d-flex justify-content-center">
                            <ul class="navbar-nav grid gap-3 text-center" id="barra-elementos">
                                <li id="cerrar-sesion">
                                    Cerrar sesión
                                </li>
                                <li id="mi-carrito">
                                    Mi carrito
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-2 d-flex justify-content-center p-5" id="opcionesUsuario">
                    <div class="dropdown mt-2" id="cuenta">
                        <img src="../../resources/img/user.png" class="dropdown-toggle" type="button" width="25px"
                            height="25px" data-bs-toggle="dropdown" aria-expanded="false" alt="user">
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item pe-5 ps-5 text-center" href="mi_cuenta.html" id="miCuenta">Mi cuenta</a></li>
                            <li><a class="dropdown-item pe-5 ps-5 text-center botonAbajo" href="#" id="cerrarS">Cerrar
                                    sesión<img src="../../resources/img/logout.png" alt="salir" class="ms-2" width="20px" height="px"></a></li>
                        </ul>
                    </div>
                    <div class="btn" type="button" id="carrito">
                        <img src="../../resources/img/carrito-de-compras.png" alt="carrito" height="25px" width="25px">
                    </div>
                </div>
            </div>
        </nav>
    </header>
    `);
}
else if(titulo == "Mis pedidos")
{
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg" style="background-color: #BCE7FD;">
            <div class="container-fluid">
                <div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2" id="seasmart-container">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <img src="../../resources/img/Logo1.png" width="55px" height="55px">
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <p style="font-weight: 500; font-size: x-large;">S<span
                                    style="color: #3E88DE;">ea</span>S<span style="color: #3E88DE;">mart</span></p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xs-10 col-sm-10 col-md-10 d-flex justify-content-end" id="btnCollapse">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#listaCollapse" aria-controls="listaCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span></button>
                </div>
                <div class="collapse navbar-collapse" id="listaCollapse">
                    <div class="container-fluid d-flex justify-content-end">
                        <div class="col-12 d-flex justify-content-center">
                            <ul class="navbar-nav grid gap-3 text-center" id="barra-elementos">
                                <li id="cerrar-sesion">
                                    Cerrar sesión
                                </li>
                                <li id="mi-carrito">
                                    Mi carrito
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-2 d-flex justify-content-center p-5" id="opcionesUsuario">
                    <div class="dropdown mt-2" id="cuenta">
                        <img src="../../resources/img/user.png" class="dropdown-toggle" type="button" width="25px"
                            height="25px" data-bs-toggle="dropdown" aria-expanded="false" alt="user">
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item pe-5 ps-5 text-center" href="mi_cuenta.html" id="miCuenta">Mi cuenta</a></li>
                            <li><a class="dropdown-item pe-5 ps-5 text-center botonAbajo" href="#" id="cerrarS">Cerrar
                                    sesión<img src="../../resources/img/logout.png" alt="salir" class="ms-2" width="20px" height="px"></a></li>
                        </ul>
                    </div>
                    <div class="btn" type="button" id="carrito">
                        <img src="../../resources/img/carrito-de-compras.png" alt="carrito" height="25px" width="25px">
                    </div>
                </div>
            </div>
        </nav>
    </header>
    `);
}
else if(titulo == "Mi información")
{
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg" style="background-color: #BCE7FD;">
            <div class="container-fluid">
                <div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2" id="seasmart-container">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <img src="../../resources/img/Logo1.png" width="55px" height="55px">
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <p style="font-weight: 500; font-size: x-large;">S<span
                                    style="color: #3E88DE;">ea</span>S<span style="color: #3E88DE;">mart</span></p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xs-10 col-sm-10 col-md-10 d-flex justify-content-end" id="btnCollapse">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#listaCollapse" aria-controls="listaCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span></button>
                </div>
                <div class="collapse navbar-collapse" id="listaCollapse">
                    <div class="container-fluid d-flex justify-content-end">
                        <div class="col-12 d-flex justify-content-center">
                            <ul class="navbar-nav grid gap-3 text-center" id="barra-elementos">
                                <li id="cerrar-sesion">
                                    Cerrar sesión
                                </li>
                                <li id="mi-carrito">
                                    Mi carrito
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-2 d-flex justify-content-center p-5" id="opcionesUsuario">
                    <div class="dropdown mt-2" id="cuenta">
                        <img src="../../resources/img/user.png" class="dropdown-toggle" type="button" width="25px"
                            height="25px" data-bs-toggle="dropdown" aria-expanded="false" alt="user">
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item pe-5 ps-5 text-center" href="mi_cuenta.html" id="miCuenta">Mi cuenta</a></li>
                            <li><a class="dropdown-item pe-5 ps-5 text-center botonAbajo" href="#" id="cerrarS">Cerrar
                                    sesión<img src="../../resources/img/logout.png" alt="salir" class="ms-2" width="20px" height="px"></a></li>
                        </ul>
                    </div>
                    <div class="btn" type="button" id="carrito">
                        <img src="../../resources/img/carrito-de-compras.png" alt="carrito" height="25px" width="25px">
                    </div>
                </div>
            </div>
        </nav>
    </header>
    `);
}

let btnCollapse = document.getElementById('btnCollapse');
let listaCollapse = document.getElementById('listaCollapse');
let opcionesUsuario = document.getElementById('opcionesUsuario');
let imagenUsuario = document.getElementById('cuenta');
let imagenCarrito = document.getElementById('carrito');
let estiloBotonCerrar = document.getElementById('cerrar-sesion');
let estiloBotonCarrito = document.getElementById('mi-carrito');

if (window.screen.width >= 992) {
    btnCollapse.remove();
    listaCollapse.remove();
    estiloBotonCerrar.setAttribute('style', 'display:none;');
    estiloBotonCarrito.setAttribute('style', 'display:none;');
}
else {
    opcionesUsuario.remove();
    estiloBotonCerrar.setAttribute('style', 'display:block;');
    estiloBotonCarrito.setAttribute('style', 'display:block;');
}
