const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 5,
    spaceBetween: 10,


    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const CARRUSEL_CONTAINER = document.getElementById('wrapper');

const PRODUCTO_API = "services/public/producto.php"
// Evento que carga los recursos de barra de navegación y función de rellenar tabla.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para mostrar el encabezado y pie del documento.
    cargarPlantilla(1);

    // LLamada  a la función para llenar el carrusel
    cargarCarrusel();
});

const cargarCarrusel = async () => {
    const DATA = await fetchData(PRODUCTO_API, 'readAll');
    if (DATA.status) {
        DATA.dataset.forEach(item => {
            CARRUSEL_CONTAINER.innerHTML += `

            <div class="swiper-slide">

                <div class="cloth-card">
                    <img class="cloth-card-img" src="../../resources/img/${item.imagen_producto}" />
                    <span class="cloth-card-info">${item.descripcion_producto}</span>
                    <b class="cloth-card-price">${item.precio_producto}</b>

                    <button class="cloth-card-buy">Agregar al carrito</button>
                </div>

            </div>

            `;
        });
    }
}