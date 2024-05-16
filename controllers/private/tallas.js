const TALLAS_API = 'services/admin/tallas.php';
const FILAS_ENCONTRADAS = document.getElementById('filasEncontradas'),
    CUERPO_TABLA = document.getElementById('cuerpoTabla');

const MODALTALLA = new bootstrap.Modal('#crearModal_talla');
const MODALETALLA = new bootstrap.Modal('#editModal_talla');
const MODALBTALLA = new bootstrap.Modal('#borrarModal_talla');

function abrirCrear() {
    MODALTALLA.show();
}

function abrirEditar() {
    MODALETALLA.show();
}

function abrirEliminar() {
    MODALBTALLA.show();
}

document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla();
});

const cargarTabla = async (form = null) => {
    FILAS_ENCONTRADAS.textContent = '';
    CUERPO_TABLA.innerHTML = '';

    (form) ? action = 'searchRows' : action = 'readAll';

    const DATA = await fetchData(TALLA_API, action, form);
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