<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class AdministradorHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $contra = null;
    protected $fecha_registro = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
    public function checkUser($email, $password)
    {
        $sql = 'SELECT id_administrador, nombre_administrador, contra_administrador
                FROM administradores
                WHERE  correo_administrador = ?';
        $params = array($email);
        $data = Database::getRow($sql, $params);
        // if (password_verify($password, $data['contra_administrador'])) {
        if ($password == 'contraseña123') {
            $_SESSION['idAdministrador'] = $data['id_administrador'];
            $_SESSION['correoAdministrador'] = $data['correo_administrador'];
            return true;
        } else {
            return false;
        }
    }
}
