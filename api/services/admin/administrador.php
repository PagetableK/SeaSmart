<?php
require_once('../../models/data/administrador_data.php');

session_start();    

$administrador = new AdministradorData;

$result = array('status' => 0, 'session' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'username' => null);