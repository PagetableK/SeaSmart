const IMGFILTRO = document.getElementById('contenedor-img-filtro');
const FILAS_ENCONTRADAS = document.getElementById('filasEncontradas'),
    CUERPO_TABLA = document.getElementById('cuerpoTabla');
const FORM_BUSCAR = document.getElementById('formBuscar')

if (window.screen.width < 995) {
    IMGFILTRO.remove();
}

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla();

    cargarPantalla();
});

function verificarReset(){
    if(document.getElementById('buscarPedido').value==""){
        cargarTabla();
    }
}

document.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM = new FormData(FORM_BUSCAR);
    cargarTabla(FORM);
});


const cargarTabla = async (form = null) => {
    FILAS_ENCONTRADAS.textContent = '';
    CUERPO_TABLA.innerHTML = '';

    (form) ? action = 'searchRows' : action = 'readAll';

    const DATA = await fetchData(PEDIDO_API, action, form);
    if (DATA.status) {
        DATA.dataset.foreach(row => {
            CUERPO_TABLA.innerHTML += `
            <tr>
            <td>${row.talla}</td>
            </tr>
            `
        })
    }
}