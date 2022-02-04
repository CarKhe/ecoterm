<?php

$host = "localhost";
$bd="bd_ecoterm";
$user="root";
$password="";
$data="tbl_clientes";


try
{
  $conexion= new PDO("mysql:host=$host;dbname=$bd",$user,$password);
  //echo "Conexion...";
} 
catch( Exception $ex)
{
    echo $ex->getMessage();

}
//Buscar
$sentenciaSQL= $conexion->prepare("SELECT * FROM ".$data);
$sentenciaSQL->execute();
$listaProveedor=$sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
echo '{ "data" : '.json_encode($listaProveedor).'}';

?>