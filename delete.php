<?php
require("header.inc.php");
@session_start();

if (!array_key_exists("data", $_SESSION ))  // Verifica se já existem dados na sessão
    die("Session not initialized");

$idToDelete = $_GET["id"];

foreach($_SESSION["data"] as $index => $record)
{
    if ($record["id"] == $idToDelete)   // Achou o registro para apagar
    {
        // Remove o dado do array
        unset($_SESSION["data"][$index]);
    }
}

echo json_encode($_SESSION["data"]);

?>