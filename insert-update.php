<?php
require("header.inc.php");
@session_start();

if (!array_key_exists("data", $_SESSION ))  // Verifica se já existem dados na sessão
    die("Session not initialized");

$postdata = json_decode(file_get_contents('php://input'), true);

$newValue = true;   
foreach($_SESSION["data"] as $index => $record)
{
    if ($record["id"] == $postdata["id"])   // Registro ja existe?
    {
        // Altera os dados na sessão
        $_SESSION["data"][$index] = $postdata;

        // Avisa que achou o valor
        $newValue = false;
    }
}

if ($newValue)
{
    // Adiciona na sessão
    $_SESSION["data"][] = $postdata;
}

echo json_encode($_SESSION["data"]);

?>