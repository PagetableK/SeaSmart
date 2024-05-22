const MAIN = document.querySelector('main');
const titulo = document.title;

let validacionElemento_Cerrar;

if (titulo == "SeaSmart") {
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid row-gap-3">
                <div class="col-12 col-sm-2" id="seasmart-container" onclick="abrirIndex()">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <img src="../../resources/img/logo1.png" width="55px" height="55px">
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <p id="texto-ss">S<span>ea</span>S<span>mart</span></p>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-sm-8 col-md-8 col-lg-8 d-flex justify-content-center" id="divBuscador">
                    <form class="d-flex w-75 bg-light" role="busqueda" id="form-buscarCategoria">
                        <input class="form-control bg-light" type="search" placeholder="Buscar una categoría.."
                            aria-label="Buscar" id="buscarCategoria">
                        <div class="btn input-group-addon d-flex align-items-center justify-content-center"
                            id="btnBuscarCategoria">
                            <img src="../../resources/img/lupaa.png" class="img-fluid" width="18px" height="18px"
                                alt="buscarimg">
                        </div>
                    </form>
                </div>
                <div class="col-12 col-sm-2 col-md-2 col-lg-2 d-flex justify-content-end" id="btnCollapse">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#listaCollapse">
                        <span class="navbar-toggler-icon"></span></button>
                </div>
                <div class="collapse navbar-collapse" id="listaCollapse">
                    <div class="container-fluid d-flex justify-content-end">
                        <div class="col-12 d-flex justify-content-center">
                            <ul class="navbar-nav grid gap-3 text-center" id="barra-elementos">
                                <li id="elemento-login">
                                    <a href="inicio_sesión.html" id="btnLogin_e">Iniciar sesión</a>
                                </li>
                                <li id="elemento-registro">
                                    <a href="registro.html" id="btnRegistro_e">Registrarse</a>
                                </li>compras
                                <li id="elemento-carrito">
                                <a href="carrito.html" id="btnCarrito_e">Mi carrito</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-2 p-5 d-flex justify-content-center" id="opcionesUsuario">
                    <div class="dropdown mt-2" id="cuenta">
                        <img src="../../resources/img/user.png" class="dropdown-toggle" type="button" width="25px"
                            height="25px" data-bs-toggle="dropdown" alt="user">
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item pe-5 ps-5 text-center" href="inicio_sesion.html" id="btnLogin_d">Iniciar sesión</a></li>
                            <li><a class="dropdown-item pe-5 ps-5 text-center botonAbajo" href="registro.html" id="btnRegistro_d">Registrarse</a></li>
                        </ul>
                    </div>
                    <div class="btn" type="button" id="carrito" onclick="abrirCarro()">
                        <img src="../../resources/img/carrito_de_compras.png" alt="carrito" height="25px" width="25px" onclick="alerta()">
                    </div>
                </div>
            </div>
        </nav>
    </header>
    `);
    validacionElemento_Cerrar = false;
}
else if(titulo == "Mi cuenta")
{
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <div class="col-12 col-sm-2" id="seasmart-container" onclick="abrirIndex()">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <img src="../../resources/img/logo1.png" width="55px" height="55px">
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <p id="texto-ss">S<span>ea</span>S<span>mart</span></p>
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
                                <li id="elemento-mis-pedidos">
                                    <a class="pe-5 ps-5 text-center" href="mis_pedidos.html" id="btnPedidos_e">Mis pedidos</a>
                                </li>
                                <li id="elemento-mi-informacion">
                                    <a class="pe-5 ps-5 text-center" href="mi_informacion.html" id="btnInformacion_e">Mi información</a>
                                </li>
                                <li id="elemento-mi-carrito">
                                    <a class="pe-5 ps-5 text-center" href="carrito.html" id="btncarrito_de_comprase">Mi carrito</a>
                                </li>
                                <li id="elemento-cerrar-sesion">
                                    <a class="pe-5 ps-5 text-center" href="index.html" id="btnCerrarSesion_e">Cerrar sesión</a>
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
                            <li><a class="dropdown-item pe-5 ps-5 text-center" href="mi_cuenta.html" id="btnMiCuenta_d">Mi cuenta</a></li>
                            <li><a class="dropdown-item pe-5 ps-5 text-center botonAbajo" href="index.html" id="btnCerrarSesion_d">Cerrar
                                    sesión<img src="../../resources/img/logout.png" alt="salir" class="ms-2" width="20px" height="px"></a></li>
                        </ul>
                    </div>
                    <div class="btn" type="button" id="carrito" onclick="abrirCarro()">
                        <img src="../../resources/img/carrito_de_compras.png" alt="carrito" height="25px" width="25px">
                    </div>
                </div>
            </div>
        </nav>
    </header>
    `);

    if(window.screen.width >= 992)
    {
        document.getElementById('menu_cuenta').classList.add('me-4');
    }
    else
    {
        document.getElementById('menu_cuenta').classList.add('mt-4');
    }

    validacionElemento_Cerrar = true;
}
else if(titulo=="Mi carrito")
{
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <div class="col-12 col-sm-2" id="seasmart-container" onclick="abrirIndex()">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <img src="../../resources/img/logo1.png" width="55px" height="55px">
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <p id="texto-ss">S<span>ea</span>S<span>mart</span></p>
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
                                <li id="elemento-mi-carrito">
                                    <a href="carrito.html" id="btncarrito_de_comprase">Mi carrito</a>
                                </li>
                                <li id="elemento-mi-cuenta">
                                    <a href="mi_cuenta.html" id="btnMiCuenta_e">Mi cuenta</a>
                                </li>
                                <li id="elemento-cerrar-sesion">
                                    <a href="index.html" id="btnCerrarSesion_e">Cerrar sesión</a>
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
                            <li><a class="dropdown-item pe-5 ps-5 text-center" href="mi_cuenta.html" id="btnMiCuenta_d">Mi
                                    cuenta</a></li>
                            <li><a class="dropdown-item pe-5 ps-5 text-center botonAbajo" href="index.html"
                                    id="btnCerrarSesion_d">Cerrar
                                    sesión<img src="../../resources/img/logout.png" alt="salir" class="ms-2"
                                        width="20px" height="px"></a></li>
                        </ul>
                    </div>
                    <div class="btn" type="button" id="carrito" onclick="abrirCarro()">
                        <img src="../../resources/img/carrito_de_compras.png" alt="carrito" height="25px" width="25px">
                    </div>
                </div>
            </div>
        </nav>
    </header>
    `);

    validacionElemento_Cerrar = true;
}
else if(titulo == "Mis pedidos")
{
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg" style="background-color: #BCE7FD;">
            <div class="container-fluid">
                <div class="col-12 col-sm-2" id="seasmart-container" onclick="abrirIndex()">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <img src="../../resources/img/logo1.png" width="55px" height="55px">
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <p style="font-weight: 500; font-size: x-large;" id="texto-ss">S<span
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
                                <li id="elemento-mi-cuenta">
                                    <a href="mi_cuenta.html" id="btnMiCuenta_e">Mi cuenta</a>
                                </li>
                                <li id="elemento-mi-informacion">
                                    <a href="mi_informacion.html" id="btnMiInfo_e">Mi información</a>
                                </li>
                                <li id="elemento-mi-carrito">
                                    <a href="carrito.html" id="btnCarrito_e">Mi carrito</a>
                                </li>
                                <li id="elemento-cerrar-sesion">
                                    <a href="index.html" id="btnCerrarSesion_e">Cerrar sesión</a>
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
                            <li><a class="dropdown-item pe-5 ps-5 text-center botonAbajo" href="#" id="btnCerrarSesion_d">Cerrar
                                    sesión<img src="../../resources/img/logout.png" alt="salir" class="ms-2" width="20px" height="px"></a></li>
                        </ul>
                    </div>
                    <div class="btn" type="button" id="carrito" onclick="abrirCarro()">
                        <img src="../../resources/img/carrito_de_compras.png" alt="carrito" height="25px" width="25px">
                    </div>
                </div>
            </div>
        </nav>
    </header>
    `);

    if(window.screen.width < 992)
    {
        document.getElementById('menu_cuenta').remove();
    }
    else if(window.screen.width >= 992)
    {
        document.getElementById('menu_cuenta').classList.add('me-4');
    }

    validacionElemento_Cerrar = false;
}
else if(titulo == "Mi información")
{
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg" style="background-color: #BCE7FD;">
            <div class="container-fluid">
                <div class="col-12 col-sm-2" id="seasmart-container" onclick="abrirIndex()">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <img src="../../resources/img/logo1.png" width="55px" height="55px">
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <p style="font-weight: 500; font-size: x-large;" id="texto-ss">S<span
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
                                <li id="elemento-mi-cuenta">
                                    <a href="mi_cuenta.html" id="btnMiCuenta_e">Mi cuenta</a>
                                </li>
                                <li id="elemento-mis-pedidos">
                                    <a class="pe-5 ps-5 text-center" href="mis_pedidos.html" id="btnPedidos_e">Mis pedidos</a>
                                </li>
                                <li id="elemento-mi-carrito">
                                    <a href="carrito.html" id="btnCarrito_e">Mi carrito</a>
                                </li>
                                <li id="elemento-cerrar-sesion">
                                    <a href="index.html" id="btnCerrarSesion_e">Cerrar sesión</a>
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
                            <li><a class="dropdown-item pe-5 ps-5 text-center botonAbajo" href="index.html" id="btnCerrarSesion_d">Cerrar
                                    sesión<img src="../../resources/img/logout.png" alt="salir" class="ms-2" width="20px" height="px"></a></li>
                        </ul>
                    </div>
                    <div class="btn" type="button" id="carrito" onclick="abrirCarro()">
                        <img src="../../resources/img/carrito_de_compras.png" alt="carrito" height="25px" width="25px">
                    </div>
                </div>
            </div>
        </nav>
    </header>
    `);

    if(window.screen.width < 992)
    {
        document.getElementById('menu_cuenta').remove();
        document.getElementById('contenedor-agregar-direccion').classList.add('mb-3');
    }
    else if(window.screen.width >= 992)
    {
        document.getElementById('menu_cuenta').classList.add('me-4');
    }

    validacionElemento_Cerrar = false;
}
else if(titulo == "Inicio de sesión")
{
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg" style="background-color: #BCE7FD;">
            <div class="container-fluid">
                <div class="col-12 col-sm-2" id="seasmart-container" onclick="abrirIndex()">
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
                </div>
            </div>
        </nav>
    </header>
    `);

    validacionElemento_Cerrar = false;
}
else if(titulo == "Registro")
{
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg" style="background-color: #BCE7FD;">
            <div class="container-fluid">
                <div class="col-12 col-sm-2" id="seasmart-container" onclick="abrirIndex()">
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
                </div>
            </div>
        </nav>
    </header>
    `);

    validacionElemento_Cerrar = false;
}
else if(titulo == "¿Quiénes somos?"){
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg" style="background-color: #BCE7FD;">
            <div class="container-fluid">
                <div class="col-12 col-sm-2" id="seasmart-container" onclick="abrirIndex()">
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
                </div>
            </div>
        </nav>
    </header>
    `);

    validacionElemento_Cerrar = false;
}

MAIN.insertAdjacentHTML('afterend', `
    <footer>
        <nav class="navbar">
            <div class="container">
                <div>
                    <img src="../../resources/img/logo.png" alt="logo">
                    <p id="texto-ss">S<span>ea</span>S<span>mart</span></p>
                </div>
                <div>
                    <a href="quienes_somos.html" id="quienes_somos"><p>¿Quiénes somos?</p></a>
                </div>
                <div>
                    <h6>Contáctanos</h6>
                    <div>
                        <a href="https://facebook.com" target="_blank"><img src="../../resources/img/facebook.png" alt="facebook"></a>
                        <a href="https://instagram.com/sea__smart/" target="_blank"><img src="../../resources/img/instagram.png" alt="instagram"></a>
                        <a href="https://web.whatsapp.com/" target="_blank"><img src="../../resources/img/whatsapp.png" alt="whatsapp"></a>
                    </div>
                </div>
            </div>
        </nav>
    </footer>
`);
if (titulo == "sub_categoria") {
    MAIN.insertAdjacentHTML('beforebegin', `
    <header>
        <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
                <div class="col-12 col-sm-2" id="seasmart-container" onclick="abrirIndex()">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <img src="../../resources/img/logo1.png" width="55px" height="55px">
                        </div>
                        <div class="col-12 d-flex align-items-center justify-content-center">
                            <p id="texto-ss">S<span>ea</span>S<span>mart</span></p>
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
                        data-bs-target="#listaCollapse">
                        <span class="navbar-toggler-icon"></span></button>
                </div>
                <div class="collapse navbar-collapse" id="listaCollapse">
                    <div class="container-fluid d-flex justify-content-end">
                        <div class="col-12 d-flex justify-content-center">
                            <ul class="navbar-nav grid gap-3 text-center" id="barra-elementos">
                                <li id="elemento-login">
                                    <a href="inicio_sesión.html" id="btnLogin_e">Iniciar sesión</a>
                                </li>
                                <li id="elemento-registro">
                                    <a href="registro.html" id="btnRegistro_e">Registrarse</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-2 d-flex justify-content-center" id="opcionesUsuario">
                    <div class="dropdown mt-2" id="cuenta">
                        <img src="../../resources/img/user.png" class="dropdown-toggle" type="button" width="25px"
                            height="25px" data-bs-toggle="dropdown" alt="user">
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li><a class="dropdown-item pe-5 ps-5 text-center" href="inicio_sesion.html" id="btnLogin_d">Iniciar sesión</a></li>
                            <li><a class="dropdown-item pe-5 ps-5 text-center botonAbajo" href="registro.html" id="btnRegistro_d">Registrarse</a></li>
                        </ul>
                    </div>
                    <div class="btn" type="button" id="carrito" onclick="abrirCarro()">
                        <img src="../../resources/img/carrito_de_compras.png" alt="carrito" height="25px" width="25px" onclick="alerta()">
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
let estiloBotonCerrar = document.getElementById('elemento-cerrar-sesion');
let estiloBotonCarrito = document.getElementById('elemento-mi-carrito');
let seasmart = document.getElementById('seasmart-container');

if (window.screen.width >= 992) {
    btnCollapse.remove();
    listaCollapse.remove();
    
}
else {
    opcionesUsuario.remove();
}

if(validacionElemento_Cerrar && window.screen.width >= 992){
    estiloBotonCerrar.setAttribute('style', 'display:none;');
    estiloBotonCarrito.setAttribute('style', 'display:none;');
}
else if(validacionElemento_Cerrar){
    estiloBotonCerrar.setAttribute('style', 'display:block;');
    estiloBotonCarrito.setAttribute('style', 'display:block;');
}

function abrirCarro(){
    window.location.href='carrito.html';
}

function abrirIndex(){
    window.location.href='index.html';
}