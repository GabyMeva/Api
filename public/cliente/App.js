var cliente = (function() {

  var _iniciar = function(){
    var boton = document.getElementById('enviar');
    boton.addEventListener('click', consultar, false);
  };

  var consultar = function(even){
    var entrada = document.getElementById('solicitud');
    var operacion = document.getElementById('operaciones').value;
    if(entrada.value!==""){
        if(operacion === "GET"){
          _evento_get(entrada.value);
        }
        if(operacion === "POST"){
          _evento_post(entrada.value);
        }
      }
      else{
        var contenedor = document.getElementById("contenido");
        contenedor.textContent = "Debe especificar una URL";
      }
  };

  var _evento_get = function (enlace){
    var url  = enlace;
    var xhr  = new XMLHttpRequest();
    var formato = document.getElementById("formato").value;
    var param = url.split("/");
    //valida toda la url
    if((param[0]==="http:") && (param[1]==="") && (param[2]==="localhost:3000") && (param[3]==="api") && (param[4]==="1.0") && ((param[5]==="transporte") || (param[5]==="manufactura")))
    {
      if((param[6]==="entidades") || (param[6]==="actividades") || (param[6]==="detalle_actividades") || (param[6]==="empresas") || (param[6]==="inmuebles") || (param[6]==="localidades") || (param[6]==="municipios") || (param[6]==="ubicaciones"))
      {
        //en caso de que haya id?
        var contenedor = document.getElementById("contenido");
        xhr.open('GET', url, true)
        xhr.setRequestHeader("Accept", formato);
        xhr.onload = function () {
    	     var users = xhr.responseText;
    	      if (xhr.readyState == 4 && xhr.status == "200") {
                contenedor.textContent = xhr.responseText;
                console.log(param);

    	         } else {
                 contenedor.textContent = "Error al hacer la operacion";
    	            }
                }
                xhr.send();
      }
      else {
        contenedor.textContent = "URL invalida";
      }
    }
    else {
      contenedor.textContent = "URL invalida";
    }
  };


  return {
    "iniciar": _iniciar
  }

}());
