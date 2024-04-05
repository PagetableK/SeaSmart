const ADMINISTRADOR_API = 'services/admin/administrador.php';
const BTNMOSTRAR = document.getElementById('btnMostrar');
const BTNOCULTAR = document.getElementById('btnOcultar');
const TXTCONTRA = document.getElementById('contraRegistro');
const CONTENEDORC = document.getElementById('contenedor_contra');
const BTNMOSTRAR1 = document.getElementById('btnMostrar1');
const BTNOCULTAR1 = document.getElementById('btnOcultar1');
const TXTCONTRA1 = document.getElementById('confirmarContra'); 
const CONTENEDORC1 = document.getElementById('contenedor_contra_2');
const BTNCONTINUAR = document.getElementById('btnContinuar');

function MostrarContra(){
    BTNMOSTRAR.remove();
    CONTENEDORC.appendChild(BTNOCULTAR);
    TXTCONTRA.type = 'text';
}

function OcultarContra(){
    BTNOCULTAR.remove();
    CONTENEDORC.appendChild(BTNMOSTRAR);
    TXTCONTRA.type = 'password';
}

function MostrarContra1(){
    BTNMOSTRAR1.remove();
    CONTENEDORC1.appendChild(BTNOCULTAR1);
    TXTCONTRA1.type = 'text';
}

function OcultarContra1(){
    BTNOCULTAR1.remove();
    CONTENEDORC1.appendChild(BTNMOSTRAR1);
    TXTCONTRA1.type = 'password';
}

BTNOCULTAR.remove();
BTNOCULTAR1.remove();

function ValidarCampos(asyn){
    location.href='registro1.html';
}

BTNCONTINUAR.addEventListener('submit', async(event) => {
    event.preventDefault();
    const FORM = new FormData(SAVE_FORM);
    const DATA = await fetchData(ADMINISTRADOR_API, FORM);
    if(DATA.status)
    {
        alert('a');
    }
});