<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla PRODUCTO.
*/
class PedidoHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $fecha = null;
    protected $estado = null;
    

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_pedido, fecha_pedido, estado_pedido,
                FROM pedidos
                INNER JOIN pedidos USING(id_pedido)
                WHERE id_pedido LIKE ? OR estado_pedido LIKE ?
                ORDER BY id_pedido';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO producto(nombre_producto, descripcion_producto, precio_producto, existencias_producto, imagen_producto, estado_producto, id_categoria, id_administrador)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->precio, $this->estado, $this->pedido, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_pedido, fecha_pedido, estado_pedido
                FROM pedidos
                INNER JOIN pedidos USING(id_pedido)
                ORDER BY id_pedido';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_pedido, fecha_pedido, estado_pedido, id_direccion, id_cliente
                FROM pedidos
                WHERE id_pedido = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }


    public function updateRow()
    {
        $sql = 'UPDATE pedido
                SET id_pedido = ?, fecha_pedido = ?, estado_pedido = ?
                WHERE id_producto = ?';
        $params = array($this->fecha, $this->estado, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM pedido
                WHERE id_pedido = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readDetallesPedido()
    {
        $sql = 'SELECT id_detalle_pedido, cantidad_producto, precio_producto, 
                FROM pedidos
                INNER JOIN pedidos USING(id_pedido)
                WHERE id_pedido = ? AND estado_pedido = true
                ORDER BY id_pedido';
        $params = array($this->pedido);
        return Database::getRows($sql, $params);
    }
}
