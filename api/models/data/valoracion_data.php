<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/valoracion_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla VALORACION.
 */
class ValoracionData extends ValoracionHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la valoracion es incorrecto';
            return false;
        }
    }

    public function setVisibilidad($value)
    {
        if (Validator::validateNaturalNumber($value) or ($value == 0)) {
            $this->visibilidad = $value;
            return true;
        } else {
            $this->data_error = 'El valor de la valoracion es incorrecto';
            return false;
        }
    }

    /*
     *  Métodos para obtener los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}