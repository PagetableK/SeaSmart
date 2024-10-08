<?php
// Se incluye la clase del modelo.
require_once('../../models/data/valoracion_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $valoracion = new ValoracionData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            //Buscar valoracion sea por nombre de cliente o producto
            case 'searchRows':
                if (!Validator::validateSearch($_POST['buscarValoracion'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $color->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $valoracion->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Mostrando ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No hay valoraciones';
                }
                break;
            case 'readAllasc':
                if ($result['dataset'] = $valoracion->readAllAsc()) {
                    $result['status'] = 1;
                    $result['message'] = 'Mostrando ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No hay valoraciones';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$valoracion->setId($_POST['id_valoracion']) or
                    !$valoracion->setVisibilidad($_POST['estado_comentario'])
                ) {
                    $result['error'] = $valoracion->getDataError();
                } elseif ($valoracion->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Estado modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al desactivar el comentario';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de bd por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
       print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}