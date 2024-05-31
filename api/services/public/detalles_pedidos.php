<?php
// Se incluye la clase del modelo.
require_once('../../models/data/detalles_pedidos_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $detalle_pedido = new DetallesPedidosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como cliente, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idCliente'])) {
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
                // La acción readOrderWithProduct retorna los detalles de pedidos que tienen un producto específico y el estado_pedido es 'Enviado'.
            case 'readOrderWithProduct':
                if(!$detalle_pedido->setIdProducto($_POST['idProducto'])){
                    $result['error'] = $detalle_pedido->getDataError(); 
                } elseif ($result['dataset'] = $detalle_pedido->readOrderWithProduct()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay compras registradas con el producto';
                }
                break;
                // La acción readCartWithProduct retorna los detalles de pedidos que tienen un producto específico y el estado_pedido es 'En carrito'.
            case 'readCartWithProduct':
                if(!$detalle_pedido->setIdProducto($_POST['idProducto'])){
                    $result['error'] = $detalle_pedido->getDataError(); 
                } elseif (!$result['dataset'] = $detalle_pedido->readCartWithProduct()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'El producto ya se encuentra agregado al carrito';
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
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
