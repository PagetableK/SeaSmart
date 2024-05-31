<?php
// Se incluye la clase para trabajar con la base de datos.
require_once ('../../helpers/database.php');
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

    public function getOrder()
    {
        $this->estado = 'En carrito';
        $sql = 'SELECT id_pedido
        FROM pedidos
        WHERE estado_pedido = ? AND id_cliente = ?';
        $params = array($this->estado, $_SESSION['idCliente']);
        if ($data = Database::getRow($sql, $params)) {
            $_SESSION['idPedido'] = $data['id_pedido'];
            return true;
        } else {
            return false;
        }
    }

    public function startOrder()
    {
        // Se verifica que exista un pedido con el estado 'En carrito'.
        if ($this->getOrder()) {
            return true;
        } else {
            // Si no existe un pedido con el estado 'En carrito' se crea el pedido.
            $sql = 'INSERT INTO pedidos (estado_pedido, id_cliente) VALUES("En carrito", ?);';
            $params = array($_SESSION['idCliente']);
            // Se obtiene el ultimo valor insertado de la llave primaria en la tabla pedidos.
            if ($_SESSION['idPedido'] = Database::getLastRow($sql, $params)) {
                return true;
            } else {
                return false;
            }
        }
    }
}
