<?php
// Se incluye la clase del modelo.
require_once('../../models/data/cliente_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $clientes = new ClienteData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'correoCliente' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idCliente'])) {
        // Se verifica la acción a realizar.
        switch ($_GET['action']) {
                // La acción searchRows permite buscar clientes por su nombre, apellido o correo.
            case 'searchRows':
                if (!Validator::validateSearch($_POST['buscarUsuario'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $clientes->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
                // La acción createRow permite crear un nuevo cliente.
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
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
                // La acción readAll permite seleccionar todos los clientes registrados.
            case 'readAll':
                if ($result['dataset'] = $clientes->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen clientes registrados';
                }
                break;
                // La acción readOne permite seleccionar la información de un cliente específico.
            case 'readOne':
                if (!$clientes->setId($_POST['idCliente'])) {
                    $result['error'] = 'Cliente incorrecto';
                } elseif ($result['dataset'] = $clientes->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Cliente inexistente';
                }
                break;
                // La acción updateRow permite editar la información de un registro específico.
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$clientes->setId($_POST['idCliente']) or
                    !$clientes->setNombre($_POST['nombreCliente']) or
                    !$clientes->setApellido($_POST['apellidoCliente']) or
                    !$clientes->setCorreo($_POST['correoCliente'], 1) or
                    !$clientes->setDUI($_POST['duiCliente'], 1) or
                    !$clientes->setTelefono($_POST['telefonoCliente'], 1) or
                    !$clientes->setTelefonoFijo($_POST['telefonoFijoCliente'], 1) or
                    !$clientes->setEstado($_POST['estadoCliente'])
                ) {
                    $result['error'] = $clientes->getDataError();
                } elseif ($_POST['telefonoCliente'] == $_POST['telefonoFijoCliente']) {
                    $result['error'] = 'El teléfono fijo no puede ser el mismo que el teléfono móvil';
                } elseif ($clientes->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cliente modificado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el cliente';
                }
                break;
                // La acción deleteRow permite eliminar un cliente.
            case 'deleteRow':
                if (!$clientes->setId($_POST['idCliente'])) {
                    $result['error'] = $clientes->getDataError();
                } elseif ($clientes->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Cliente eliminado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el cliente';
                }
                break;
                // Si no se encuentra la acción a realizar se muestra el error.
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
    } else {
        // La acción signUp valida la información del usuario y agrega el primer registro a la tabla administradores.
        case 'signUp':
            $_POST = Validator::validateForm($_POST);
            if (
                !$administrador->setNombre($_POST['NombreAdmin'])
                or
                !$administrador->setApellido($_POST['ApellidoAdmin'])
                or
                !$administrador->setCorreo($_POST['CorreoAdmin'], 0)
                or
                !$administrador->setContra($_POST['ContraAdmin'])
            ) {
                $result['error'] = $administrador->getDataError();
            } else if ($_POST['ContraAdmin'] != $_POST['ConfirmarContra']) {
                $result['error'] = 'Las contraseñas son diferentes';
            } elseif ($administrador->createRow()) {
                $result['status'] = 1;
                $result['message'] = 'Administrador registrado correctamente';
            } else {
                $result['error'] = 'Ocurrió un problema al registrar el administrador';
            }
            break;
            // La acción logIn verifica las credenciales del administrador para poder ingresar al programa.
        case 'logIn':
            // Se validan los campos del form que se encuentran en el array $_POST.
            $_POST = Validator::validateForm($_POST);
            // Se valida el estado del administrador.
            if ($administrador->checkUser($_POST['CorreoAdmin'], $_POST['ContraAdmin']) == 'Estado inactivo') {
                // Si el estado del administrador es inactivo se muestra un mensaje con el error.
                $result['error'] = 'Su cuenta ha sido desactivada por un administrador';
            } elseif ($administrador->checkUser($_POST['CorreoAdmin'], $_POST['ContraAdmin'])) {
                // Si el estado del administrador es activo se ejecuta el código.
                // Se asigna el valor de status.
                $result['status'] = 1;
                // Se asigna el id del administrador proveniente de la función checkUser()
                // dentro del array de la sesión $_SESSION.
                $_SESSION['idCliente'] = $administrador->checkUser($_POST['CorreoAdmin'], $_POST['ContraAdmin'])[0];
                // Se asigna el correo del administrador proveniente de la función checkUser()
                // dentro del array de la sesión $_SESSION.
                $_SESSION['correoAdministrador'] = $administrador->checkUser($_POST['CorreoAdmin'], $_POST['ContraAdmin'])[1];
                // Se devuelve el mensaje del resultado de la acción logIn.
                $result['message'] = 'Autenticación correcta';
            } else {
                $result['error'] = 'Credenciales incorrectas';
            }
            break;
            // Si el usuario no ha iniciado sesión no permite realizar las acciones updateRow, createRow,
            // deleteRow (Acciones que si están permitidas cuando el usuario ha iniciado sesión).
        default:
            $result['error'] = 'Acción no disponible fuera de la sesión';
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
