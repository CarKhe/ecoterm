<?php

$host = "localhost";
$bd="bd_ecoterm";
$user="root";
$password="";
$table="tbl_clientes";


try
{
  $conexion= new PDO("mysql:host=$host;dbname=$bd",$user,$password);
  //echo "Conexion...";
} 
catch( Exception $ex)
{
    echo $ex->getMessage();

}
//Eliminar
   
     $id=$_GET['delete'];
     $sentenciaSQL= $conexion->prepare("DELETE FROM ".$table." where id_cliente=".$id); 
     $sentenciaSQL->execute(); 
     exit();


 
?> 