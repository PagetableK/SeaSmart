<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CALIFICACIONES.
 */
class ValoracionHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $visibilidad = null;

    /*
     *  Métodos para realizar operaciones (search, read, update).
     */

     //Buscador de valoraciones
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_producto, nombre_producto, nombre_cliente
        FROM productos
        WHERE nombre_producto LIKE ? OR nombre_cliente LIKE ?
        ORDER BY nombre_producto';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT * FROM view_valoraciones ORDER BY fecha_valoracion ASC;';
        return Database::getRows($sql);
    }

    public function readAllAsc()
    {
        $sql = 'SELECT * FROM view_valoraciones ORDER BY fecha_valoracion DESC;';
        return Database::getRows($sql);
    }

    public function updateRow()
    {
        $sql = 'UPDATE valoraciones
                SET estado_comentario = ?
                WHERE id_valoracion = ?';
        $params = array($this->visibilidad, $this->id);
        return Database::executeRow($sql, $params);
    }
}