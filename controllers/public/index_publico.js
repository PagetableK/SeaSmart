// Constante para completar la ruta de la API.
const CATEGORIAS_API = 'services/public/categorias.php';
// Se almacena el contenedor donde se cargarán las cards de categorías.
const CONTENEDOR_CATEGORIAS = document.getElementById('contenedorCategorias');

// Evento que carga los recursos de barra de navegación y función de rellenar tabla.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla(1);
    // Llamada a la función para cargar las categorías registradas.
    cargarCategorias();
});


const cargarCategorias = async () => {
    // Se realiza una petición a la API para retornas las categorías registradas.
    const DATA = await fetchData(CATEGORIAS_API, 'readAll');
    // Si la respuesta es satisfactoria se ejecuta el código.
    if(DATA.status){
        // Se inicializa el contenido del contenedor.
        CONTENEDOR_CATEGORIAS.innerHTML = '';
        // Se carga una card de categoría por cada categoría encontrada.
        DATA.dataset.forEach(row => {
            CONTENEDOR_CATEGORIAS.innerHTML += `
            <div class="card d-flex align-items-center">
                <img src="${SERVER_URL}images/categorias/${row.imagen_categoria}" class="img-fluid" width="150px" height="150px"
                    alt="categoriaImagen">
                <div class="card-body d-flex align-items-center justify-content-center flex-column">
                    <h5 class="card-title text-center">Mujeres</h5>
                    <p class="card-text text-center">Echa un vistazo a los productos de la categoría ${row.nombre_categoria}</p>
                    <a href="#" class="btn btn-primary" id="verProductos()">Ver productos</a>
                </div>
            </div>
            `;
        });

    } else{
        sweetAlert(2, DATA.error, false);
    }
}