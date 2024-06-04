<?php
// Se incluye la clase del modelo.
require_once ('../../models/data/detalles_productos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $detalle_producto = new DetallesProductosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como cliente, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idCliente'])) {
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            // La acción readColors retorna todos los registros de detalles_productos con color y en estado disponible.
            case 'readColors':
                if (!$detalle_producto->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $detalle_producto->getDataError();
                } elseif ($result['dataset'] = $detalle_producto->readColors()) {
                    $result['status'] = 1;
                    $result['message'] = 'Mostrando ' . count($result['dataset']) . ' colores';
                } else {
                    $result['error'] = 'No hay colores registrados';
                }
                break;
            // La acción readSizes retorna todos los registros de detalles_productos con talla y en estado disponible.
            case 'readSizes':
                if (!$detalle_producto->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $detalle_producto->getDataError();
                } elseif ($result['dataset'] = $detalle_producto->readSizes()) {
                    $result['status'] = 1;
                    $result['message'] = 'Mostrando ' . count($result['dataset']) . ' tallas';
                } else {
                    $result['error'] = 'No hay tallas registradas';
                }
                break;
            // La acción readColorsFromSize retorna todos los registros de detalles_productos con color y una talla específica.
            case 'readColorsFromSize':
                if (
                    !$detalle_producto->setIdProducto($_POST['idProducto']) or
                    !$detalle_producto->setIdTalla($_POST['idProductoTalla'])
                ) {
                    $result['error'] = $detalle_producto->getDataError();
                } elseif ($result['dataset'] = $detalle_producto->readColorsFromSize()) {
                    $result['status'] = 1;
                    $result['message'] = 'Mostrando ' . count($result['dataset']) . ' colores';
                } else {
                    $result['error'] = 'No hay colores para la talla seleccionada';
                }
                break;
            // La acción readStock retorna la cantidad de existencias de los registros en estado disponible.
            case 'readStock':
                if (!$detalle_producto->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $detalle_producto->getDataError();
                } elseif ($result['dataset'] = $detalle_producto->readStock() and $result['dataset']['existencias']) {
                    $result['status'] = 1;
                    $result['message'] = 'Mostrando ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No hay existencias disponibles';
                }
                break;
            // La acción readImages retorna las imágenes de los detalles de productos registrados.
            case 'readImages':
                if (!$detalle_producto->setIdProducto($_POST['idProducto'])) {
                    $result['error'] = $detalle_producto->getDataError();
                } elseif ($result['dataset'] = $detalle_producto->readImages()) {
                    $result['status'] = 1;
                    $result['message'] = 'Mostrando ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No hay existencias registradas';
                }
                break;
            // La acción readImages retorna las imágenes de los detalles de productos registrados.
            case 'readDetailIdWithColorAndSize':
                if (
                    !$detalle_producto->setIdProducto($_POST['idProducto']) or
                    !$detalle_producto->setIdColor($_POST['idColor']) or
                    !$detalle_producto->setIdTalla($_POST['idTalla'])
                ) {
                    $result['error'] = $detalle_producto->getDataError();
                } elseif (!$result['dataset'] = $detalle_producto->readDetailIdWithColorAndSize()) {
                    $result['error'] = 'Detalle de producto no disponible';
                } elseif (!($_POST['cantidadRequerida'] <= $result['dataset']['existencia_producto'])) {
                    $result['error'] = 'La cantidad requerida del producto es mayor a la cantidad en stock';
                    $result['message'] = $result['dataset']['existencia_producto'];
                } else{
                    $result['status'] = 1;
                }
                break;
            // Si no se encuentra la acción a realizar se muestra el error.
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print (json_encode($result));
    } else {
        print (json_encode('Acceso denegado'));
    }
} else {
    print (json_encode('Recurso no disponible'));
}
