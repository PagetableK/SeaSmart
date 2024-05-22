const MAIN = document.querySelector('main');

const BARRA_ELEMENTOS = document.getElementById('barra-elementos');

const USER_API = 'services/public/clientes.php';

const OPCIONES_USUARIO = document.querySelector('#opcionesUsuario');

function abrirCarro() {
    window.location.href = 'carrito.html';
}

function abrirIndex() {
    window.location.href = 'index.html';
}

const cargarPlantilla = async (tipoNavbar) => {

    if (tipoNavbar == 1) {
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
                    <div class="col-10 col-sm-8 d-flex justify-content-center" id="divBuscador">
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
                    <div class="col-2 col-sm-2 d-flex justify-content-end pe-3 d-block d-md-none" id="btnCollapse">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#listaCollapse">
                            <span class="navbar-toggler-icon"></span></button>
                    </div>
                    <div class="collapse navbar-collapse" id="listaCollapse">
                        <div class="container-fluid d-flex justify-content-end">
                            <div class="col-12 d-flex justify-content-center">
                                <ul class="navbar-nav grid gap-3 text-center" id="barra-elementos">
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-2 d-none d-md-block">
                        <div class="row d-flex justify-content-center align-items-center gap-3" id="opcionesUsuario">
                            <div class="dropdown" id="cuenta">
                                <img src="../../resources/img/user.png" class="dropdown-toggle" type="button" width="35px"
                                    height="35px" data-bs-toggle="dropdown" alt="user">
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><a class="dropdown-item pe-5 ps-5 text-center" href="inicio_sesion.html" id="btnLogin_d">Iniciar sesión</a></li>
                                    <li><a class="dropdown-item pe-5 ps-5 text-center botonAbajo" href="registro.html" id="btnRegistro_d">Registrarse</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
        `);
    }

    const DATA = await fetchData(USER_API, 'getUser');
    if (DATA.session) {
        console.log(DATA.username);

        if (tipoNavbar == 1) {
            OPCIONES_USUARIO.insertAdjacentHTML('beforeend', `
            <div class="btn" type="button" id="carrito" onclick="abrirCarro()">
                <img src="../../resources/img/carrito_de_compras.png" alt="carrito" height="35px" width="35px">
            </div>
            `);
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
    } else {
        // AGREGAR BOTONES DE INICIAR SESIÓN Y REGISTRARSE

    }
}