<?php
    $servername = "remotemysql.com:3306";
    $username = "mEZnhrxLWk";
    $password = "6D9dPZhNaK";
    $database = "mEZnhrxLWk";

    $placas = $_GET['placas'];
    
    // Creación de la conexión . . .
    $conn = mysqli_connect($servername, $username, $password, $database);
    
    // Comprobar la conexión . . .
    if (!$conn) {
          die("Conexion Fallida: " . mysqli_connect_error());
    }
    
    // Instrucción SQL . . .
    $sql = "DELETE FROM LugarE WHERE Placas='$placas'";
    mysqli_query($conn, $sql);
    
    // Comprobar la realización de la instrucción SQL . . .
    if (mysqli_affected_rows($conn)) {
        echo "Posicion Eliminada Exitosamente.";
    } else {
        echo "Error Posicion Eliminada.";
        //echo "Error. " . "<br>" . mysqli_error($conn);
    }
    
    mysqli_close($conn);
    
?>