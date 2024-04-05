<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');

class AdministradorData
{
    // Atributo para el manejo de errores.
    private $info_error = null;

    public function validarNombre($valor, $min = 4, $max = 20)
    {
        if(Validator::validarLongitud($valor, $min, $max))
        {
            return true;
        }
        else
        {
            $this->info_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }
}