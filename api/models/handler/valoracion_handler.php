<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla COLOR.
 */
class ValoracionHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id = null;
    protected $visibilidad = null;

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function readAll()
    {
        $sql = 'SELECT * FROM view_valoraciones ORDER BY fecha_valoracion DESC;';
        return Database::getRows($sql);
    }

    public function readAllAsc()
    {
        $sql = 'SELECT * FROM view_valoraciones;';
        return Database::getRows($sql);
    }

    public function updateRow()
    {
        $sql = 'UPDATE valoraciones
                SET estado_comentario = ?
                WHERE id_valoracion = ?';
        $params = array($this->nombre, $this->id);
        return Database::executeRow($sql, $params);
    }
}