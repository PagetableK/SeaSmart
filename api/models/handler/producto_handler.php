<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla PRODUCTO.
*/
class ProductoHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $id_subcategoria = null;
    protected $estado = null;
    protected $precio = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/productos/';

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_producto, nombre_producto, descripcion_producto, nombre_sub_categoria, estado_producto, nombre_administrador
                FROM productos
                INNER JOIN sub_categorias USING(id_sub_categoria)
                INNER JOIN administradores USING(id_administrador)
                WHERE nombre_producto LIKE ? OR descripcion_producto LIKE ? OR nombre_administrador LIKE ? OR nombre_sub_categoria LIKE ?
                ORDER BY nombre_producto';
        $params = array($value, $value, $value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO productos(nombre_producto, descripcion_producto, id_sub_categoria, precio_producto, id_administrador)
                VALUES(?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->descripcion, $this->id_subcategoria, $this->precio, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_producto, nombre_producto, descripcion_producto, 
                nombre_sub_categoria, estado_producto, nombre_administrador
                FROM productos
                INNER JOIN sub_categorias USING(id_sub_categoria)
                INNER JOIN administradores USING(id_administrador)
                ORDER BY nombre_producto';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_producto, nombre_producto, descripcion_producto, categorias.id_categoria, sub_categorias.id_sub_categoria, estado_producto, precio_producto, nombre_administrador, nombre_categoria, nombre_sub_categoria
                FROM productos, sub_categorias, categorias, administradores
                WHERE id_producto = ? AND
                categorias.id_categoria = sub_categorias.id_categoria AND
                sub_categorias.id_sub_categoria = productos.id_sub_categoria AND
                administradores.id_administrador = productos.id_administrador';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE productos
                SET nombre_producto = ?, descripcion_producto = ?, estado_producto = ?, id_sub_categoria = ?, precio_producto = ?
                WHERE id_producto = ?';
        $params = array($this->nombre, $this->descripcion, $this->estado, $this->id_subcategoria, $this->precio, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM productos
                WHERE id_producto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
