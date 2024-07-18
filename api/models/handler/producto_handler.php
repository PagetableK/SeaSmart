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

    public function getProducts()
    {
        $sql = 'SELECT id_detalle_producto, talla, color_producto, nombre_producto, imagen_producto, existencia_producto, precio_producto
                FROM detalles_productos
                INNER JOIN productos_tallas ON productos_tallas.id_producto_talla = detalles_productos.id_producto_talla
                INNER JOIN productos_colores ON productos_colores.id_producto_color = detalles_productos.id_producto_color
                INNER JOIN productos ON productos.id_producto = detalles_productos.id_producto
                WHERE estado_detalle_producto = 1;';
        return Database::getRows($sql);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO productos(nombre_producto, descripcion_producto, id_sub_categoria, precio_producto, id_administrador)
                VALUES(?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->descripcion, $this->id_subcategoria, $this->precio, $_SESSION['idAdministrador']);
        return Database::executeRow($sql, $params);
    }

    public function readAllThats(){
        $sql = 'SELECT a.id_producto, a.nombre_producto, a.descripcion_producto, b.imagen_producto, 
        a.precio_producto from productos a, detalles_productos b where a.id_producto = b.id_producto';

        return Database::getRows($sql);
    }

    public function readAllSub(){
        $sql = 'SELECT a.id_producto, a.nombre_producto, a.descripcion_producto, b.imagen_producto, 
        a.precio_producto from productos a, detalles_productos b , sub_categorias c where a.id_producto = b.id_producto AND c.id_sub_categoria = a.id_sub_categoria AND c.id_sub_categoria = ?';
        $params = array($this->id_subcategoria);
        return Database::getRows($sql, $params);
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

    public function porcentajeProductosSubcategoria()
    {
        $sql = 'SELECT nombre_sub_categoria, ROUND((COUNT(id_producto) * 100.0 / (SELECT COUNT(id_producto) FROM productos)), 2) porcentaje
                FROM productos
                INNER JOIN sub_categorias USING(id_sub_categoria)
                GROUP BY nombre_sub_categoria ORDER BY porcentaje DESC
                ';
        return Database::getRows($sql);
    }

    public function porcentajeProductosCategoria()
    {
        $sql = 'SELECT categorias.nombre_categoria, ROUND((COUNT(productos.id_producto) * 100.0 / (SELECT COUNT(*) FROM productos)), 2) AS porcentaje
                FROM productos
                INNER JOIN sub_categorias ON productos.id_sub_categoria = sub_categorias.id_sub_categoria
                INNER JOIN categorias ON sub_categorias.id_categoria = categorias.id_categoria
                GROUP BY categorias.nombre_categoria
                ORDER BY porcentaje DESC';
        return Database::getRows($sql);
    }

    // Definir la función para obtener los top 5 productos más vendidos
    public function topProductosMasVendidos()
    {
        $sql = 'SELECT p.nombre_producto, SUM(dped.cantidad_producto) AS cantidad_vendida
                FROM productos p
                INNER JOIN detalles_productos dp ON p.id_producto = dp.id_producto
                INNER JOIN detalles_pedidos dped ON dp.id_detalle_producto = dped.id_detalle_producto
                INNER JOIN pedidos ped ON dped.id_pedido = ped.id_pedido AND ped.estado_pedido = "Enviado"
                GROUP BY p.nombre_producto
                ORDER BY cantidad_vendida DESC
                LIMIT 5';
        return Database::getRows($sql);
    }
}
