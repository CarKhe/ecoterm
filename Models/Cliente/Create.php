<?php

$host = "localhost";
$bd="bd_ecoterm";
$user="root";
$password="";
$table="tbl_clientes(referencia,nombre,apellido,calle,numero,colonia,cp,telefono,celular,rfc,correo)";


try
{
  $conexion= new PDO("mysql:host=$host;dbname=$bd",$user,$password);
  //echo "Conexion...";
} 
catch( Exception $ex)
{
    echo $ex->getMessage();

}
//Insertar
 
     $referencia="1111";
     $nombre=$_POST['nombre'];
     $apellido=$_POST['apellido'];
     $correo=$_POST['correo'];
     $rfc=$_POST['rfc'];
     $telefono=$_POST['telefono'];
     $celular=$_POST['celular'];
     $calle=$_POST['calle'];
     $numero=$_POST['numero'];
     $colonia=$_POST['colonia'];
     $cp=$_POST['cp'];

     $sentenciaSQL= $conexion->prepare("INSERT INTO ".$table." VALUES (:referencia,:nombre,:apellido,:calle,:numero,:colonia,:cp,:telefono,:celular,:rfc,:correo)");
     $sentenciaSQL->bindParam(':referencia',$referencia);   
     $sentenciaSQL->bindParam(':nombre',$nombre);
     $sentenciaSQL->bindParam(':apellido',$apellido);
     $sentenciaSQL->bindParam(':calle',$calle);
     $sentenciaSQL->bindParam(':numero',$numero);
     $sentenciaSQL->bindParam(':colonia',$colonia);
     $sentenciaSQL->bindParam(':cp',$cp);
     $sentenciaSQL->bindParam(':telefono',$telefono);
     $sentenciaSQL->bindParam(':celular',$celular);
     $sentenciaSQL->bindParam(':rfc',$rfc);
     $sentenciaSQL->bindParam(':correo',$correo);
     $sentenciaSQL->execute(); 
     exit();


 
?>