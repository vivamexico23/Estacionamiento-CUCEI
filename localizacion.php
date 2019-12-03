<?php
    $servername = "remotemysql.com:3306";
    $username = "mEZnhrxLWk";
    $password = "6D9dPZhNaK";
    $database = "mEZnhrxLWk";
    
    $latitud = $_GET['latitud'];
    $longitud = $_GET['longitud'];
    $placas = $_GET['placas'];
    $ocupado = "1";
    
    // Creación de la conexión . . .
    $conn = mysqli_connect($servername, $username, $password, $database);
    
    // Comprobar la conexión . . .
    if (!$conn) {
        die("Conexion Fallida: " . mysqli_connect_error());
    }
    
    // Instrucción SQL . . .
    $sql = "INSERT INTO LugarE (Placas, lat, lon, ocupado) VALUES ('$placas', '$latitud', '$longitud', '$ocupado')";
    mysqli_query($conn, $sql);
    
    // Comprobar la realización de la instrucción SQL . . .
    if (mysqli_affected_rows($conn)) {
        echo "Datos Insertados";
    } else {
        echo "Error Insercion";
        //echo "Error. " . "<br>" . mysqli_error($conn);
    }
    
    mysqli_close($conn);
?>