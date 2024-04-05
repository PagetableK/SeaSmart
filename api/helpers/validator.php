<?php
/*
*	Clase para validar todos los datos de entrada del lado del servidor.
*/
class Validator
{
    /*
    *   Método para validar la longitud de una cadena de texto.
    *   Parámetros: $value (dato a validar), $min (longitud mínima) y $max (longitud máxima).
    *   Retorno: booleano (true si el valor es correcto o false en caso contrario).
    */
    public static function validarLongitud($valor, $min, $max)
    {
        // Se verifica la longitud de la cadena de texto.
        if (strlen($valor) >= $min && strlen($valor) <= $max) {
            return true;
        } else {
            return false;
        }
    }
}