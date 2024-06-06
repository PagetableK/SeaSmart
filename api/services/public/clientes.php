<?php
// Se incluye la clase del modelo.
require_once('../../models/data/cliente_data.php');
 
// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();    
    // Se instancia la clase correspondiente.
    $cliente = new ClienteData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'recaptcha' => 0, 'message' => null, 'error' => null, 'exception' => null, 'username' => null, 'debug' => null );
    // Se verifica si existe una sesión iniciada como cliente para realizar las acciones correspondientes.
    if (isset($_SESSION['idCliente'])) {
        $result['session'] = 1;
        // Se compara la acción a realizar cuando un cliente ha iniciado sesión.
        switch ($_GET['action']) {
            case 'createRow':
                // Se validan los datos del formulario.
                $_POST = Validator::validateForm($_POST);
                // Se comprueba y establecen los datos del cliente.
                if (
                    !$clientes->setNombre($_POST['nombreCliente']) or
                    !$clientes->setApellido($_POST['apellidoCliente']) or
                    !$clientes->setDUI($_POST['duiCliente'], 0) or
                    !$clientes->setCorreo($_POST['correoCliente'], 0) or
                    !$clientes->setContra($_POST['contraCliente']) or
                    !$clientes->setTelefono($_POST['telefonoCliente'], 0) or
                    !$clientes->setTelefonoFijo($_POST['telefonoFijoCliente'], 0)
                ) {
                    $result['error'] = $clientes->getDataError();
                } elseif ($_POST['contraCliente'] != $_POST['confirmarContraCliente']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($_POST['telefonoCliente'] == $_POST['telefonoFijoCliente']) {
                    $result['error'] = 'El teléfono fijo no puede ser el mismo que el teléfono móvil';
                } elseif ($clientes->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cliente creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el cliente';
                }
                break;
            case 'getUser':
                // Se obtiene el correo del cliente si está en sesión.
                if (isset($_SESSION['correoCliente'])) {
                    $result['status'] = 1;
                    $result['username'] = $_SESSION['correoCliente'];
                } else {
                    $result['error'] = 'Correo de usuario indefinido';
                }
                break;
            case 'logOut':
                // Se cierra la sesión del cliente.
                if (session_destroy()) {
                    $result['status'] = 1;
                    $result['message'] = 'Sesión eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al cerrar la sesión';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    }  else {
        // Se compara la acción a realizar cuando el cliente no ha iniciado sesión.
        switch ($_GET['action']) {
            case 'signUp':
                // Se establecen los datos del cliente.
                if (
                    !$cliente->setNombre($_POST['nombreCliente']) or
                    !$cliente->setApellido($_POST['apellidoCliente']) or
                    !$cliente->setCorreo($_POST['correoCliente']) or
                    !$cliente->setDUI($_POST['duiCliente']) or
                    !$cliente->setTelefono($_POST['telefonoMovil']) or
                    !$cliente->setTelefonoFijo($_POST['telefonoFijo']) or
                    !$cliente->setContra($_POST['claveCliente'])
                ) {
                    $result['error'] = $cliente->getDataError();
                } elseif ($_POST['claveCliente'] != $_POST['confirmarClave']) {
                    $result['error'] = 'Contraseñas diferentes';
                } elseif ($cliente->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cuenta registrada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al registrar la cuenta';
                }
                break;
               
            case 'logIn':
                // Se validan los campos del form que se encuentran en el array $_POST.
                $_POST = Validator::validateForm($_POST);
                if ($cliente->checkUser($_POST['correo'], $_POST['contra'])) {
                    // Si el estado del administrador es activo se ejecuta el código.
                    // Se asigna el valor de status.
                    $result['status'] = 1;
                    // Se asignan los valores de sesión obtenidos de la función checkUser().
                    // Se devuelve el mensaje del resultado de la acción logIn.
                    $result['message'] = 'Autenticación correcta';
                    $result['username'] = $_SESSION['correoCliente'];
                } else {
                    $result['error'] = 'Su cuenta ha sido desactivada';
                }
                break;
               
            default:
                $result['error'] = 'Acción no disponible fuera de la sesión';
        }
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

?>