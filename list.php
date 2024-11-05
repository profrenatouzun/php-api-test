<?php
require("header.inc.php");
@session_start();

if (!array_key_exists("data", $_SESSION ))  // Verifica se já existem dados na sessão
{
    // Se não existir, carrega os dados iniciais de um arquivo JSON.
    $json = file_get_contents('initial_data.json'); 

    // Verifica se 
    if ($json === false) die('Error reading the JSON file');

    $_SESSION["data"] = json_decode($json, true); 
}

echo json_encode($_SESSION["data"]);

?>