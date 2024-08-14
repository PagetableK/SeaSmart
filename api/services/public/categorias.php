<?php
// Se incluye la clase del modelo.
require_once('../../models/data/categoria_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $categoria = new CategoriaData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
    switch ($_GET['action']) {
            // La acción readAll retorna todos los registros de categorías.
        case 'readAll':
            if ($result['dataset'] = $categoria->readAll()) {
                $result['status'] = 1;
                $result['message'] = 'Mostrando ' . count($result['dataset']) . ' registros';
            } else {
                $result['error'] = 'No existen categorías registradas';
            }
            break;
            // La acción searchRows permite buscar categorías por nombre o palabra clave en la descripción.
        case 'searchRows':
            if (!Validator::validateSearch($_POST['busqueda'])) {
                $result['error'] = Validator::getSearchError();
            } elseif ($result['dataset'] = $categoria->searchRows()) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
            } else {
                $result['error'] = 'No hay coincidencias';
            }
            break;
            // Si no se encuentra la acción a realizar se muestra el error.
        default:
            $result['error'] = 'Acción no disponible dentro de la sesión';
            break;
    }
    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
