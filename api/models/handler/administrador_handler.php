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
    public function checkUser($correo, $contra)
    {
        $sql = 'SELECT id_administrador, nombre_administrador, contra_administrador
                FROM administradores
                WHERE correo_administrador = ?';
        $params = array($correo);
        $data = Database::getRow($sql, $params);
        if (password_verify($contra, $data['contra_administrador'])) {
            $_SESSION['idAdministrador'] = $data['id_administrador'];
            $_SESSION['correoAdministrador'] = $correo;
            return true;
        } else {
            return false;
        }
    }

    public function createRow()
    {
        $sql = 'INSERT INTO administradores (nombre_administrador, apellido_administrador, correo_administrador, contra_administrador) VALUES
        (?, ?, ?, ?);';

        $params = array($this->nombre, $this->apellido, $this->correo, $this->contra);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_administrador, nombre_administrador, apellido_administrador, correo_administrador
                FROM administradores
                ORDER BY apellido_administrador';
        return Database::getRows($sql);
    }
}
