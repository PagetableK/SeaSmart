document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al span que contiene el texto del estado seleccionado
    const estadoSeleccionado = document.getElementById('estadoSeleccionado');

    // Función para manejar el clic en el botón "Completado"
    function handleCompletadoClick() {
        // Establecer el texto del estado seleccionado como "Completado"
        estadoSeleccionado.textContent = "Completado";
    }

    // Función para manejar el clic en el botón "Pendiente"
    function handlePendienteClick() {
        // Establecer el texto del estado seleccionado como "Pendiente"
        estadoSeleccionado.textContent = "Pendiente";
    }

    // Función para manejar el clic en el botón "Cancelado"
    function handleCanceladoClick() {
        // Establecer el texto del estado seleccionado como "Cancelado"
        estadoSeleccionado.textContent = "Cancelado";
    }

    // Agregar event listeners a los botones de opciones
    document.getElementById('completadooption').addEventListener('click', handleCompletadoClick);
    document.getElementById('pendienteoption').addEventListener('click', handlePendienteClick);
    document.getElementById('canceladooption').addEventListener('click', handleCanceladoClick);
});

document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al span que contiene el texto del color seleccionado
    const estadoSeleccionado = document.getElementById('colorSeleccionado');

    // Función para manejar el clic en el botón "Completado"
    function handleColo1Click() {
        // Establecer el texto del estado seleccionado como "Completado"
        estadoSeleccionado.textContent = "Verde";
    }

    // Función para manejar el clic en el botón "Pendiente"
    function handleColo2Click() {
        // Establecer el texto del estado seleccionado como "Pendiente"
        estadoSeleccionado.textContent = "Rojo";
    }

    // Función para manejar el clic en el botón "Cancelado"
    function handleColo3Click() {
        // Establecer el texto del estado seleccionado como "Cancelado"
        estadoSeleccionado.textContent = "Azul";
    }

    // Agregar event listeners a los botones de opciones
    document.getElementById('color1option').addEventListener('click', handleColo1Click);
    document.getElementById('color2option').addEventListener('click', handleColo2Click);
    document.getElementById('color3option').addEventListener('click', handleColo3Click);
});


document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencia al span que contiene el texto del color seleccionado
    const estadoSeleccionado = document.getElementById('tallaSeleccionado');

    // Función para manejar el clic en el botón "Completado"
    function handleTalla1Click() {
        // Establecer el texto del estado seleccionado como "Completado"
        estadoSeleccionado.textContent = "S";
    }

    // Función para manejar el clic en el botón "Pendiente"
    function handleTalla2Click() {
        // Establecer el texto del estado seleccionado como "Pendiente"
        estadoSeleccionado.textContent = "M";
    }

    // Función para manejar el clic en el botón "Cancelado"
    function handleTalla3Click() {
        // Establecer el texto del estado seleccionado como "Cancelado"
        estadoSeleccionado.textContent = "XS";
    }

    // Agregar event listeners a los botones de opciones
    document.getElementById('talla1option').addEventListener('click', handleTalla1Click);
    document.getElementById('talla2option').addEventListener('click', handleTalla2Click);
    document.getElementById('talla3option').addEventListener('click', handleTalla3Click);
});