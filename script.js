//Variables globales . . . 
var i, codigo_new, nombre_new, placas_new, identificador, nombreudg, codigoudg, placasudg, myObj;


//Funcion que realiza la animacion del splashscreen . . .
function Animacion() {
    setTimeout(function () {
        $("#caratula").fadeOut();
    }, 2000);

    setTimeout(function () {
        $("#inicio").fadeIn();
    }, 2500);
}

//Funcion que se ejecuta al inicio de la aplicacion . . .
window.onload = function () {
    //Ejecuta la funcion del Splashscreen . . .
    Animacion();
    //Proceso de obtención de posibles valores almacenados en localstorage . . .
    var x = localStorage.getItem("nombre");
    var y = localStorage.getItem("codigo");
    var z = localStorage.getItem("placas");
    //De encontrarse valores en localstorage redirige a la página del mapa . . .
    if (x != null) {
        Pagina_Mapa(x,y,z);
    } else {

    }
}

//Funcion que genera una codigo unico entre letras minusculas y numeros . . .
function Generar_Identificador() {
    var d = new Date().getTime();
    identificador = 'xxx4xxyxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    document.getElementById("codigo_nuevo").innerHTML = identificador;
}

//Funcion que redirige a la pagina inserta . . .
function Pagina_Nuevo() {
    Limpiar('#form_ingresar ons-input');
    myNavigator.pushPage('nuevo.html').then(function () {
        Generar_Identificador();
    });
}


function Insertar_Nuevo() {
    codigo_new = identificador;
    nombre_new = document.getElementById("nombre_innovar").value;
    placas_new = document.getElementById("placas_innovar").value;
    var password = document.getElementById("password_innovar").value;
    var telefono = document.getElementById("telefono_innovar").value;
    //Declaramos una bandera que nos servira para determinar si los input están vacios o no . . .
    var bandera = true;
    //Agrupamos todos los input dentro de la variable elementos del respectivo formulario . . .
    var elementos = document.getElementsByClassName("form_innova");
    //Recorremos todos los input por medio del ciclo for para comprobar que esten vacios . . .
    for (i = 0; i < elementos.length; i++) {
        if (elementos[i].value == "" || elementos[i].value == null) {
            bandera = false;
            break;
        }
    }
    //Si bandera es positiva indica que no hay campos vacios y continua con la operación . . . 
    if (bandera) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                ons.notification.alert(this.responseText);
            }
        };
        xhttp.open("GET", "http://CuceiMobile.tech/Escuela/altaU.php?codigo=" + codigo_new + "&nombre=" + nombre_new + "&placas=" + placas_new + "&telefono=" + telefono + "&password=" + password, true);
        xhttp.send();
        //Mandamos a llamar a la funcion Limpiar para que limpie los campos una vez finalizado el formulario . . .
        Limpiar('#form_innovar ons-input', '#form_innovar input:first');
        Pagina_Mapa_Nuevo();
    }
    //En caso contrario notifica que existen campos vacios . . .
    else {
        ons.notification.alert("Existen Campos Vacios.");
    }
}

function Pagina_Mapa_Nuevo() {
    myNavigator.pushPage('mapa.html').then(function () {
        document.getElementById("nombre_mapa").innerHTML = nombre_new;
        document.getElementById("codigo_mapa").innerHTML = codigo_new;
        document.getElementById("placas_mapa").innerHTML = placas_new;
        localStorage.setItem("nombre", nombre_new);
        localStorage.setItem("codigo", codigo_new);
        localStorage.setItem("placas", placas_new);
        initMap();
    });
}


//Funcion que hace la insercion de datos en la base mediante el archivo php del servidor . . .
function Insertar() {
    //Aqui jalamos el valor del codigo ingresado en el login a una variable para posteriormente insertarlo . . .
    var codigo = codigoudg;
    var password = "";
    //Tambien jalamos a una variable el nombre del alumno logueado por medio del objeto JSON de Javascript . . .
    var nombre = nombreudg;
    var placas = document.getElementById("placas_insertar").value;
    var telefono = document.getElementById("telefono_insertar").value;
    //Declaramos una bandera que nos servira para determinar si los input están vacios o no . . .
    var bandera = true;
    //Agrupamos todos los input dentro de la variable elementos del respectivo formulario . . .
    var elementos = document.getElementsByClassName("form_inserta");
    //Recorremos todos los input por medio del ciclo for para comprobar que esten vacios . . .
    for (i = 0; i < elementos.length; i++) {
        if (elementos[i].value == "" || elementos[i].value == null) {
            bandera = false;
            break;
        }
    }
    //Si bandera es positiva indica que no hay campos vacios y continua con la operación . . . 
    if (bandera) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                ons.notification.alert(this.responseText);
            }
        };
        xhttp.open("GET", "http://CuceiMobile.tech/Escuela/altaU.php?codigo=" + codigo + "&nombre=" + nombre + "&placas=" + placas + "&telefono=" + telefono + "&password=" + password, true);
        xhttp.send();
        //Mandamos a llamar a la funcion Limpiar para que limpie los campos una vez finalizado el formulario . . .
        Limpiar('#form_insertar ons-input', '#form_insertar input:first');
        Pagina_Mapa(nombreudg, codigoudg, placas);
    }
    //En caso contrario notifica que existen campos vacios . . .
    else {
        ons.notification.alert("Existen Campos Vacios");
    }
}


//Funcion que redirige a la pagina eliminar . . .
function Pagina_Mapa(nombre, codigo, placas) {
    myNavigator.pushPage('mapa.html').then(function () {
        document.getElementById("nombre_mapa").innerHTML = nombre;
        document.getElementById("codigo_mapa").innerHTML = codigo;
        document.getElementById("placas_mapa").innerHTML = placas;
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("codigo", codigo);
        localStorage.setItem("placas", placas);
        //Funcion para generar el mapa con sus respectivos marcadores . . .
        initMap();
    });
}


//Función que elimina la posicion en el mapa conforme a las placas del usuario logueado . . .
function Abandonar() {
    //Obtenemos las placas insertadas dentro del elemento div de nuestra página mapa . . .
    var placas = document.getElementById("placas_mapa").innerHTML;
    var xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = this.responseText;
            ons.notification.alert(cadena);
            //Habilita nuevamente el boton Arribar . . . 
            document.getElementById("arribar").disabled=false;
            initMap();
        }
    };
    xhttp3.open("GET", "https://viva-mexico23.000webhostapp.com/abandonar.php?placas=" + placas, true);
    xhttp3.send();
}


//Función que genera la localización del Usuario . . .
function Localizacion() {
	//inicializamos la funcion y definimos  el tiempo maximo ,las funciones de exito y error . . .
	navigator.geolocation.getCurrentPosition(viewMap,ViewError,);
}


//Funcion de exito de la funcion Localizacion() . . . 
function viewMap(position) {
    var lon = position.coords.longitude; //guardamos la longitud
    var lat = position.coords.latitude; //guardamos la latitud
    //Aqui transformamos los valores obtenidos de la latitud y longitud en valores del tipo string . . .
    var stringlon = lon.toString();
    var stringlat = lat.toString();
    //Obtenemos las placas insertadas dentro del elemento div de nuestra página mapa . . .
    var placas = document.getElementById("placas_mapa").innerHTML;
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(placas);
    var xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = this.responseText;
            ons.notification.alert(cadena);
            //Deshabilita nuevamente el boton Arribar . . . 
            document.getElementById("arribar").disabled=true;
            initMap();
        }
    };
    xhttp3.open("GET", "https://viva-mexico23.000webhostapp.com/localizacion.php?latitud=" + stringlat + "&longitud=" + stringlon + "&placas=" + placas, true);
    xhttp3.send();
}

//Funcion de error de la funcion Localizacion() . . . 
function ViewError (error) {
	alert("Codigo de Error: " + error.code + "\n" + "Mensaje: " + error.message + "\n");
}	

//Funcion que genera e inserta el mapa con sus respectivos marcadores . . .
function initMap() {
    var myObj_posiciones;
    //Funcion especifica para crear el mapa de google . . .
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 20.6540,
            lng: -103.3245
        },
        zoom: 17,
    });
    //Funcion para mandar a llamar los datos del servidor e incrustarlos en el mapa como marcadores . . .
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = this.responseText;
            myObj_posiciones = JSON.parse(cadena);
            //Arreglo que sirve para recorrer cada uno de los atributos de los objetos JSON y a su vez asignarlos en las funciones correspondientes del mapa . . . 
            for (i in myObj_posiciones) {
                //Funcion especifica para crear los marcadores del mapa de google . . .
                var position = new google.maps.LatLng(myObj_posiciones[i].lat, myObj_posiciones[i].lon);
                var marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: myObj_posiciones[i].Placas
                });
            }
        }
    };
    xhttp.open("GET", "https://viva-mexico23.000webhostapp.com/mapa.php", true);
    xhttp.send();
}


//Funcion que recibe como parametro el nombre del form al que se le desea efectuar la limpieza de sus inputs . . .
function Limpiar(valor1, valor2) {
    $(valor1).each(function () {
        $(this).val("");
    });
    $(valor2).focus();
}

function Salir() {
    localStorage.clear();
    myNavigator.pushPage('page1.html').then(function () {
        location.reload();
        Animacion();
    });
}

//Funcion que comprobara si se encuentra el codigo ingresado en la base de datos . . .
function Comprobacion(codigo, password){
    var xhttp1 = new XMLHttpRequest();
    xhttp1.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cadena = this.responseText;
            if (cadena == "Datos Desconocidos" && password) {
                ons.notification.alert("Usuario Inexistente o Incorrecto");
                Pagina_Nuevo();
            } 
            else if(cadena == "Datos Desconocidos" && !password){
                ons.notification.alert("Alumno UDG No Registrado");
                myNavigator.pushPage('page2.html').then(function () {
                    document.getElementById("alumno_udg").innerHTML = nombreudg;
                    document.getElementById("codigo_udg").innerHTML = codigoudg;
                    document.getElementById("alumno2_udg").innerHTML = nombreudg;
                });
            }
            else if(cadena != "Datos Desconocidos" && !password){
                myObj = JSON.parse(cadena);
                Pagina_Mapa(myObj.Nombre, myObj.Codigo, myObj.Placas);
            }
            else {
                myObj = JSON.parse(cadena);
                Pagina_Mapa(myObj.Nombre, myObj.Codigo, myObj.Placas);
            }
        }
    };
    xhttp1.open("GET", "https://viva-mexico23.000webhostapp.com/enviar.php?codigo=" + codigo + "&password=" + password, true);
    xhttp1.send();
}


//Funcion que hace el envio de datos para generar un inicio de sesión . . .
function Enviar() {
    var codigo = document.getElementById("codigo_login").value;
    var password = document.getElementById("password_login").value;
    //Declaramos una bandera que nos servira para determinar si los input están vacios o no . . .
    var bandera = true;
    //Agrupamos todos los input dentro de la variable elementos del respectivo formulario . . .
    var elementos = document.getElementsByClassName("form_ingresa");
    //Recorremos todos los input por medio del ciclo for para comprobar que esten vacios . . .
    for (i = 0; i < elementos.length; i++) {
        if (elementos[i].value == "" || elementos[i].value == null) {
            bandera = false;
            break;
        }
    }
    //Si bandera es positiva indica que no hay campos vacios y continua con la operación . . . 
    if (bandera) {
        //Envio y respuesta del servidor.
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var cadena = this.responseText;
                console.log(cadena);
                var temp = cadena.charAt(0);
                if (temp == "0") {
                    Comprobacion(codigo, password);
                } else {
                    var ArregloT = cadena.split(',');
                    nombreudg = ArregloT[2];
                    codigoudg = ArregloT[1];
                    password_vacio = "";
                    Comprobacion(codigo, password_vacio);
                }
            }
        };
        xhttp.open("GET", "http://dcc.000webhostapp.com/2018/datosudeg.php?codigo=" + codigo + "&nip=" + password, true);
        xhttp.send();
        Limpiar('#form_ingresar ons-input');
    } 
    else {
        ons.notification.alert("Existen Campos Vacios");
    }
}