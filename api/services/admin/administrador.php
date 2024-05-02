<?php
// Se incluye la clase del modelo.
require_once ('../../models/data/administrador_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $administrador = new AdministradorData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'correoAdmin' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        $result['session'] = 1;

        switch ($_GET['action']) {
            case 'getUser':
                if(isset($_SESSION['correoAdministrador'])){
                    $result['status'] = 1;
                    $result['correoAdmin'] = $_SESSION['CorreoAdmin'];
                }
                else {
                    $result['error'] = 'Correo no definido';
                }
                break;
        }
    } else {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'readUsers':
                if ($administrador->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Debe autenticarse para ingresar';
                } else {
                    $result['error'] = 'Debe crear un administrador para comenzar   ';
                }
                break;
            case 'signUp':
                $_POST = Validator::validateForm($_POST);
                if(
                    !$administrador->setNombre($_POST['NombreAdmin']) 
                    or
                    !$administrador->setApellido($_POST['ApellidoAdmin']) 
                    or
                    !$administrador->setCorreo($_POST['CorreoAdmin']) 
                    or
                    !$administrador->setContra($_POST['ContraAdmin'])
                ){
                    $result['error'] = $administrador->getDataError();
                }
                else if($_POST['ContraAdmin'] != $_POST['ConfirmarContra']){
                    $result['error'] = 'Las contraseñas son diferentes';
                }
                elseif ($administrador->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Administrador registrado correctamente';
                }
                else {
                    $result['error'] = 'Ocurrió un problema al registrar el administrador';
                }
                break;
            case 'logIn':
                $_POST = Validator::validateForm($_POST);
                if ($administrador->checkUser($_POST['CorreoAdmin'], $_POST['ContraAdmin'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Autenticación correcta';
                } else {
                    $result['error'] = 'Credenciales incorrectas';
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
    print (json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}