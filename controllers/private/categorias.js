// Constante para completar la ruta de la API.
const CATEGORIA_API = 'services/admin/categorias.php';
//Constante para almacenar el modal de agregar categoría
const MODALCCATEGORIA = new bootstrap.Modal('#agregarModal_categoria');
//Constante para almacenar el modal de editar categoría
const MODALECATEGORIA = new bootstrap.Modal('#editModal_categoria');
//Constante para almacenar el modal de eliminar categoría
const MODALBCATEGORIA = new bootstrap.Modal('#borrarModal_categoria');
//Constantes para cargar los elementos de la tabla
const FILAS_ENCONTRADAS = document.getElementById('filasEncontradas'),
        CUERPO_TABLA = document.getElementById('cuerpoTabla');

//Función para abrir el modal crear categoría
function abrirCrear(){
    MODALCCATEGORIA.show();
}

//Función para abrir el modal editar categoría
function abrirEditar(){
    MODALECATEGORIA.show();
}

//Función para abrir el modal eliminar categoría
function abrirEliminar(){
    MODALBCATEGORIA.show();
}

//Evento que carga los recursos de barra de navegación y función de rellenar tabla
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla();
    //Llamar la función para cargar los datos de la tabla
    cargarTabla();
});

const cargarTabla = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    FILAS_ENCONTRADAS.textContent = '';
    CUERPO_TABLA.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(CATEGORIA_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <tr>
                    <td><img src="${SERVER_URL}images/categorias/${row.imagen_categoria}" height="50"></td>
                    <td>${row.nombre_categoria}</td>
                    <td>${row.descripcion_categoria}</td>
                    <td>
                        <button type="button" class="btn btn-info" onclick="openUpdate(${row.id_categoria})">
                            <i class="bi bi-pencil-fill"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="openDelete(${row.id_categoria})">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                        <button type="button" class="btn btn-warning" onclick="openReport(${row.id_categoria})">
                            <i class="bi bi-filetype-pdf"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
        // Se muestra un mensaje de acuerdo con el resultado.
        ROWS_FOUND.textContent = DATA.message;
    } else {
        sweetAlert(4, DATA.error, true);
    }
}