<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/cliente_handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla ADMINISTRADOR.
 */
class ClienteData extends ClienteHandler
{
    // Atributo para el manejo de errores.
    private $info_error = null;

    /*
    *  Métodos para validar y asignar los valores de los atributos.
    */
    public function setId($valor)
    {
        if(Validator::validateNaturalNumber($valor)){
            $this->id = $valor;
            return true;
        }
        else{
            $this->info_error = 'El identificador del administrador es correcto';
            return false;
        }
    }

    public function setNombre($valor, $min = 4, $max = 20)
    {
        if (!Validator::validateAlphabetic($valor)) {
            $this->info_error = 'El nombre debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($valor, $min, $max)) {
            $this->nombre = $valor;
            return true;
        } else {
            $this->info_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    
    public function setApellido($valor, $min = 4, $max = 20)
    {
        if (!Validator::validateAlphabetic($valor)) {
            $this->info_error = 'El apellido debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($valor, $min, $max)) {
            $this->apellido = $valor;
            return true;
        } else {
            $this->info_error = 'El apellido debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setCorreo($valor, $boolean, $min = 8, $max = 100)
    {
        if (!Validator::validateEmail($valor)) {
            $this->info_error = 'El correo no es válido';
            return false;
        } else if($boolean and !$this->checkDuplicateWithId($valor)){
            $this->correo = $valor;
            return true;
        } else if($this->checkDuplicate($valor)){
            $this->info_error = 'El correo ya está siendo usado por otro cliente';
            return false;
        } elseif (Validator::validateLength($valor, $min, $max)) {
            $this->correo = $valor;
            return true;
        } else {
            $this->info_error = 'El correo debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setContra($valor)
    {
        if (Validator::validatePassword($valor)) {
            $this->contra = password_hash($valor, PASSWORD_DEFAULT);
            return true;
        } else {
            $this->info_error = Validator::getPasswordError();
            return false;
        }
    }

    public function setDUI($value, $boolean)
    {
        if (!Validator::validateDUI($value)) {
            $this->info_error = 'El DUI debe tener el formato ########-#';
            return false;
        } else if($boolean and !$this->checkDuplicateWithId($value)){
            $this->dui = $value;
            return true;
        } elseif($this->checkDuplicate($value)) {
            $this->info_error = 'El DUI ingresado está siendo utilizado por otro cliente';
            return false;
        } else {
            $this->dui = $value;
            return true;
        }
    }

    public function setEstado($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->estado = $value;
            return true;
        } else {
            $this->info_error = 'Estado incorrecto';
            return false;
        }
    }

    public function setTelefono($value, $boolean)
    {
        if($boolean and !$this->checkDuplicateWithId($value)){
            $this->telefono = $value;
            return true;
        } else if($this->checkDuplicate($value)){
            $this->info_error = 'El teléfono móvil ya está siendo usado';
            return false;
        }  elseif (Validator::validatePhone($value)) {
            $this->telefono = $value;
            return true;
        } else {
            $this->info_error = 'El teléfono debe tener el formato ####-####';
            return false;
        }
    }

    public function setTelefonoFijo($value, $boolean)
    {
        if($value == null){
            return true;
        } else if($boolean and !$this->checkDuplicateWithId($value)){
            $this->telefono_fijo = $value;
            return true;
        } else if($this->checkDuplicate($value)){
            $this->info_error = 'El teléfono fijo ya está siendo usado';
            return false;
        }
        else if (Validator::validatePhone($value)) {
            $this->telefono_fijo = $value;
            return true;
        }  else {
            $this->info_error = 'El teléfono fijo debe tener el formato ####-####';
            return false;
        }
    }

    public function getDataError()
    {
        return $this->info_error;
    }
}
