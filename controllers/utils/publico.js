MAIN.insertAdjacentHTML('beforebegin', `
<header>
        <nav class="navbar navbar-expand-lg" style="background-color: #BCE7FD;">
            <div class="container-fluid">
                    <div class="col" id="seasmart-container">
                        <div class="row d-flex justify-content-start">
                            <div class="col-12 d-flex align-items-center justify-content-center">
                                <img src="../../resources/img/Logo1.png" width="75px" height="75px">
                            </div>
                            <div class="col-12 d-flex align-items-center justify-content-center">
                                <p style="font-weight: 500; font-size: x-large;">S<span
                                        style="color: #3E88DE;">ea</span>S<span style="color: #3E88DE;">mart</span></p>
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
                                        class="${colorTexto1}" style="font-weight: 600;">Calificaciones</span></a>
                            </li>
                            <li class="nav-item rounded-pill ${colorBoton2}" id="">
                                <a class="nav-link fs-6 text-center" href="#"><span class="${colorTexto2}"
                                        style="font-weight: 600;">Pedidos</span></a>
                            </li>
                            <li class="nav-item rounded-pill ${colorBoton3}" id="">
                                <a class="nav-link fs-6 text-center" href="productos.html"><span class="${colorTexto3}"
                                        style="font-weight: 600;">Productos</span></a>
                            </li>
                            <li class="nav-item rounded-pill ${colorBoton4}" id="">
                                <a class="nav-link fs-6 text-center" href="subcategorias.html"><span
                                        class="${colorTexto4}" style="font-weight: 600;">Sub-categorías</span></a>
                            </li>
                            <li class="nav-item rounded-pill ${colorBoton5}" id="">
                                <a class="nav-link fs-6 text-center" href="categorias.html"><span class="${colorTexto5}"
                                        style="font-weight: 600;">Categorías</span></a>
                            </li>
                            <li class="nav-item rounded-pill ${colorBoton6}" id="">
                                <a class="nav-link fs-6 text-center" href="colores.html"><span class="${colorTexto6}"
                                        style="font-weight: 600;">Colores</span></a>
                            </li>
                            <li class="nav-item rounded-pill ${colorBoton7}" id="">
                                <a class="nav-link fs-6 text-center" href="tallas.html"><span class="${colorTexto7}"
                                        style="font-weight: 600;">Tallas</span></a>
                            </li>
                            <li class="nav-item mx-auto px-auto" id="cerrar-sesion" ${estiloBotonC}>
                                <a class="nav-link fs-6 text-center" href="index.html"><span
                                        style="font-weight: 600;">Cerrar
                                        sesión</span></a>
                            </li>
                        </ul>
                    </div>
                    </div>
                    <div class="col d-flex align-items-center justify-content-center" id="imagen-usuario">
                        <div class="dropdown" id="cuenta" ${estiloIconoC}>
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