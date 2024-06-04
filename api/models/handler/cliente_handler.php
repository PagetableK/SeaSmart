<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*   Clase para manejar el comportamiento de los datos de la tabla CLIENTE.
*/
class ClienteHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $contra = null;
    protected $dui = null;
    protected $telefono = null;
    protected $telefono_fijo = null;
    protected $estado = null;
 
    /*
    *   Métodos para gestionar la cuenta del cliente.
    */
 
    // Método para verificar el estado del cliente.
    public function checkStatus()
    {
        if ($this->estado) {
            $_SESSION['idCliente'] = $this->id;
            $_SESSION['correoCliente'] = $this->correo;
            return true;
        } else {
            return false;
        }
    }
 
    // Método para cambiar la contraseña del cliente.
    public function changePassword()
    {
        $sql = 'UPDATE clientes
                SET contra_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->contra, $this->id);
        return Database::executeRow($sql, $params);
    }
 
    // Método para editar el perfil del cliente.
    public function editProfile()
    {
        $sql = 'UPDATE clientes
                SET nombre_cliente = ?, apellido_cliente = ?, correo_cliente = ?, dui_cliente = ?, telefono_movil = ?, telefono_fijo = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->dui, $this->telefono, $this->telefono_fijo, $this->id);
        return Database::executeRow($sql, $params);
    }
 
    // Método para cambiar el estado del cliente.
    public function changeStatus()
    {
        $sql = 'UPDATE clientes
                SET estado_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }
 
    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */

    // Método para buscar clientes.
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, dui_cliente, estado_cliente
                FROM clientes
                WHERE apellido_cliente LIKE ? OR nombre_cliente LIKE ? OR correo_cliente LIKE ?
                ORDER BY apellido_cliente';
        $params = array($value, $value, $value);
        return Database::getRows($sql, $params);
    }
 
    // Método para crear un nuevo cliente.
    public function createRow()
    {
        $sql = 'INSERT INTO clientes(nombre_cliente, apellido_cliente, correo_cliente, dui_cliente, telefono_movil, contra_cliente, telefono_fijo)
                VALUES(?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->dui, $this->telefono, $this->contra, $this->telefono_fijo);
        return Database::executeRow($sql, $params);
    }
 
    // Método para leer todos los clientes.
    public function readAll()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, dui_cliente, estado_cliente
                FROM clientes
                ORDER BY apellido_cliente';
        return Database::getRows($sql);
    }
 
    // Método para leer un cliente específico.
    public function readOne()
    {
        $sql = 'SELECT id_cliente, nombre_cliente, apellido_cliente, correo_cliente, dui_cliente, telefono_movil, estado_cliente, telefono_fijo
                FROM clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }
 
     // Método para actualizar un cliente.
    public function updateRow()
    {
        $sql = 'UPDATE clientes
                SET nombre_cliente = ?, apellido_cliente = ?, dui_cliente = ?, estado_cliente = ?, telefono_movil = ?, telefono_fijo = ?, correo_cliente = ?
                WHERE id_cliente = ?';
        $params = array($this->nombre, $this->apellido, $this->dui, $this->estado, $this->telefono, $this->telefono_fijo, $this->correo, $this->id);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un cliente.
    public function deleteRow()
    {
        $sql = 'DELETE FROM clientes
                WHERE id_cliente = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
 
    // Método para comprobar duplicados.
    public function checkDuplicate($value)
    {
        $sql = 'SELECT id_cliente
                FROM clientes
                WHERE dui_cliente = ? OR correo_cliente = ? OR telefono_movil = ? OR telefono_fijo = ?';
        $params = array($value, $value, $value, $value);
        return Database::getRow($sql, $params);
    }
 
    // Método para comprobar duplicados por valor excluyendo un ID.
    public function checkDuplicateWithId($value)
    {
        $sql = 'SELECT id_cliente
                FROM clientes
                WHERE (dui_cliente = ? OR correo_cliente = ? OR telefono_movil = ? OR telefono_fijo = ?) AND id_cliente != ?';
        $params = array($value, $value, $value, $value, $this->id);
        return Database::getRow($sql, $params);
    }
 
    // Método para comprobar el usuario y contraseña.
    public function checkUser($correo, $contra)
    {
        $sql = 'SELECT id_cliente, contra_cliente, correo_cliente
                FROM clientes
                WHERE correo_cliente = ?';
        $params = array($correo);
        $data = Database::getRow($sql, $params);
 
        // Se valida que el query retorne un registro de la tabla.
        if ($data) {
            // Se valida que la contraseña ingresada en el campo de login convertida a hash
            // sea igual a la contraseña almacenada en la bd.
            if (password_verify($contra, $data['contra_cliente'])) {
                $this->id = $data['id_cliente'];
                $this->correo = $data['correo_cliente'];
                $_SESSION['idCliente'] = $this->id;
                $_SESSION['correoCliente'] = $this->correo;
                return true;
            } else {
                // Si la contraseña no es correcta se devuelve false.
                return false;
            }
        } else {
            return false;
        }
    }
 
 
}