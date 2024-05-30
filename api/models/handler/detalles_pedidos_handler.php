<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla DETALLES_PEDIDOS.
 */
class DetallesPedidosHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $cantidad_producto = null;
    protected $precio_producto = null;
    protected $id_pedido = null;
    protected $id_detalle_producto = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/detalles_productos/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function readOrderWithProduct($id_producto)
    {
        $sql = 'SELECT nombre_cliente, cantidad_producto, detalles_pedidos.precio_producto, estado_pedido, productos.id_producto, pedidos.id_pedido, detalles_pedidos.id_detalle_pedido
                FROM detalles_pedidos
                INNER JOIN pedidos ON pedidos.id_pedido = detalles_pedidos.id_pedido
                INNER JOIN clientes ON clientes.id_cliente = pedidos.id_cliente
                INNER JOIN detalles_productos ON detalles_productos.id_detalle_producto = detalles_pedidos.id_detalle_producto
                INNER JOIN productos ON productos.id_producto = detalles_productos.id_producto
                WHERE productos.id_producto = ? AND clientes.id_cliente = ? AND estado_pedido = "Enviado";';
        $params = array($id_producto, $_SESSION['idCliente']);
        return Database::getRows($sql, $params);
    }
}
