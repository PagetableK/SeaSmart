<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class DetallesProductosHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $id_color = null;
    protected $id_talla = null;
    protected $id_producto = null;
    protected $imagen = null;
    protected $estado = null;
    protected $existencia = null;


    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/detalles_productos/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function readAll()
    {
        $sql = 'SELECT id_detalle_producto, productos_colores.id_producto_color, productos_tallas.id_producto_talla, productos.id_producto, imagen_producto, detalles_productos.estado_producto, existencia_producto, color_producto, talla
                FROM detalles_productos, productos_colores, productos_tallas, productos
                WHERE productos.id_producto = ? AND
                productos_colores.id_producto_color = detalles_productos.id_producto_color AND
                productos_tallas.id_producto_talla = detalles_productos.id_producto_talla AND
                productos.id_producto = detalles_productos.id_producto;';
        $params = array($this->id_producto);
        return Database::getRows($sql, $params);
    }

    public function readAllWithColor()
    {
        $sql = 'SELECT id_detalle_producto, productos_colores.id_producto_color, productos.id_producto, imagen_producto, detalles_productos.estado_producto, existencia_producto, color_producto
                FROM detalles_productos, productos_colores, productos
                WHERE productos.id_producto = ? AND
                productos_colores.id_producto_color = detalles_productos.id_producto_color AND
                id_producto_talla IS NULL AND
                productos.id_producto = detalles_productos.id_producto;';
        $params = array($this->id_producto);
        return Database::getRows($sql, $params);
    }

    public function readAllWithSize()
    {
        $sql = 'SELECT id_detalle_producto, productos_tallas.id_producto_talla, productos.id_producto, imagen_producto, detalles_productos.estado_producto, existencia_producto, talla
                FROM detalles_productos, productos_tallas, productos
                WHERE productos.id_producto = ? AND
                id_producto_color IS NULL AND
                productos_tallas.id_producto_talla = detalles_productos.id_producto_talla AND
                productos.id_producto = detalles_productos.id_producto;';
        $params = array($this->id_producto);
        return Database::getRows($sql, $params);
    }

    public function readAllEmpty()
    {
        $sql = 'SELECT id_detalle_producto, productos.id_producto, imagen_producto, detalles_productos.estado_producto, existencia_producto
                FROM detalles_productos, productos
                WHERE productos.id_producto = ? AND
                id_producto_color IS NULL AND
                id_producto_talla IS NULL AND
                productos.id_producto = detalles_productos.id_producto;';
        $params = array($this->id_producto);
        return Database::getRows($sql, $params);
    }

    public function searchRows()
    {
        $sql = 'SELECT id_detalle_producto, productos_colores.id_producto_color, productos_tallas.id_producto_talla, productos.id_producto, imagen_producto, detalles_productos.estado_producto, existencia_producto, color_producto, talla
                FROM detalles_productos, productos_colores, productos_tallas, productos
                WHERE productos.id_producto = ? AND
                productos_colores.id_producto_color = detalles_productos.id_producto_color AND
                productos_tallas.id_producto_talla = detalles_productos.id_producto_talla AND
                productos.id_producto = detalles_productos.id_producto AND
                detalles_productos.id_producto_color = ? AND
                detalles_productos.id_producto_talla = ?;';
        $params = array($this->id_producto, $this->id_color, $this->id_talla);
        return Database::getRows($sql, $params);
    }

    public function searchRowsWithColorAllSizes()
    {
        $sql = 'SELECT id_detalle_producto, productos_colores.id_producto_color, productos_tallas.id_producto_talla, productos.id_producto, imagen_producto, detalles_productos.estado_producto, existencia_producto, color_producto, talla
                FROM detalles_productos, productos_colores, productos_tallas, productos
                WHERE productos.id_producto = ? AND
                productos_colores.id_producto_color = detalles_productos.id_producto_color AND
                productos_tallas.id_producto_talla = detalles_productos.id_producto_talla AND
                productos.id_producto = detalles_productos.id_producto AND
                detalles_productos.id_producto_color = ? AND
                detalles_productos.id_producto_talla >= 0;';
        $params = array($this->id_producto, $this->id_color);
        return Database::getRows($sql, $params);
    }

    public function searchRowsWithColorNoSizes()
    {
        $sql = 'SELECT id_detalle_producto, productos_colores.id_producto_color, productos.id_producto, imagen_producto, detalles_productos.estado_producto, existencia_producto, color_producto
                FROM detalles_productos, productos_colores, productos
                WHERE productos.id_producto = ? AND
                productos_colores.id_producto_color = detalles_productos.id_producto_color AND
                id_producto_talla IS NULL AND
                productos.id_producto = detalles_productos.id_producto AND
                detalles_productos.id_producto_color = ?;';
        $params = array($this->id_producto, $this->id_color);
        return Database::getRows($sql, $params);
    }
}
