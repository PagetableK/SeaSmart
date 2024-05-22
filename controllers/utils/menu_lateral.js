const MENU_CUENTA = document.getElementById('menu_cuenta');

MENU_CUENTA.insertAdjacentHTML('afterbegin', `
    <!-- Título de menú -->
    <div class="container-fluid px-lg-5">
    <div class="row d-flex align-items-center justify-content-center gap-2">
        <!-- Ícono de menú -->
        <div class="col-auto d-flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" class="bi bi-columns-gap"
        viewBox="0 0 16 16">
        <path
            d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z" />
    </svg>
        </div>
        <div  class="col-auto d-flex">
        <p class="p-0 m-0 fs-2">Menú</p>
        </div>
        
    </div>
    <!-- Botones del menú -->
    <div class="row gap-3 mb-5 mt-4">
        <!-- Botón mis pedidos -->
        <div class="col d-flex justify-content-center">
            <div class="vr"></div>
            <a href="mis_pedidos.html"><button class="btn btn-primary rounded-0" type="button"><img
                        src="../../resources/img/camion.png" alt="Camion" width="40px" height="25px">
                    Mis pedidos</button></a>
        </div>
        <!-- Botón mi información -->
        <div class="col d-flex justify-content-center">
            <div class="vr"></div>
            <a href="mi_informacion.html"><button class="btn btn-primary rounded-0" type="button"><img
                        src="../../resources/img/user.png" alt="Camion" width="25px" height="25px"> Mi
                    información</button></a>
        </div>
        <!-- Botón cerrar sesión -->
        <div class="col d-flex justify-content-center ms-1">
            <a href="index.html"><button class="btn btn-primary rounded-pill fw-semibold" type="button">Cerrar sesión
                <img src="../../resources/img/logout.png" alt="Cerrar Sesion" width="20px"></button></a>
        </div>
    </div>
    </div>
    `
);