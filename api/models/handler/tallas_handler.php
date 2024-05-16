<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class TallasHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $talla = null;


    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT talla, id_producto_talla
                FROM productos_tallas
                WHERE talla LIKE ? OR id_producto_talla LIKE ?
                ORDER BY talla';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }


    public function readAll()
    {
        $sql = 'SELECT id_producto_talla, talla
                FROM productos_tallas
                ORDER BY talla';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_producto_talla, talla
                FROM productos_tallas
                WHERE id_producto_talla = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM productos_tallas
                WHERE id_producto_talla = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
