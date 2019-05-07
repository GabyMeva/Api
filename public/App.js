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
        if(operacion === "PUT"){
          _evento_put(entrada.value);
        }
        if(operacion === "DELETE"){
          _evento_delete(entrada.value);
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
    var contenedor = document.getElementById("contenido");
    //valida toda la url
    if((param[0]==="http:") && (param[1]==="") && (param[2]==="localhost:3000") && (param[3]==="api") && (param[4]==="1.0") && ((param[5]==="transporte") || (param[5]==="manufactura")))
    {
      if((param[6]==="entidades") || (param[6]==="actividades") || (param[6]==="detalle_actividades") || (param[6]==="empresas") || (param[6]==="inmuebles") || (param[6]==="localidades") || (param[6]==="municipios") || (param[6]==="ubicaciones"))
      {
        if(param.length === 8){
          var numero = Number.parseInt(param[7]);
          if(numero>0){
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
          else {contenedor.textContent = "Parametro invalido";}
        }
        //en caso de que haya id?
        else { //
          xhr.open('GET', url, true)
          xhr.setRequestHeader("Accept", formato);
          xhr.onload = function () {
      	     var users = xhr.responseText;
      	      if (xhr.readyState == 4 && xhr.status == "200") {
                  contenedor.textContent = xhr.responseText;
                  console.log(param);
                }
                 else {contenedor.textContent = "Error al hacer la operacion";}
                  }
                  xhr.send();
        } //
      }
      else {contenedor.textContent = "URL invalida";}
    }
    else {contenedor.textContent = "URL invalida";}
  };

  var _evento_put = function (enlace){
    var url  = enlace;
    var xhr  = new XMLHttpRequest();
    var formato = document.getElementById("formato").value;
    var cuerpo = document.getElementById("cuerpo").value;
    var param = url.split("/");
    var contenedor = document.getElementById("contenido");
    //valida toda la url
    if((param[0]==="http:") && (param[1]==="") && (param[2]==="localhost:3000") && (param[3]==="api") && (param[4]==="1.0") && ((param[5]==="transporte") || (param[5]==="manufactura")))
    {
      if((param[6]==="entidades") || (param[6]==="actividades") || (param[6]==="detalle_actividades") || (param[6]==="empresas") || (param[6]==="inmuebles") || (param[6]==="localidades") || (param[6]==="municipios") || (param[6]==="ubicaciones"))
      {
        if(param.length === 8){
          var numero = Number.parseInt(param[7]);
          if(numero>0){
            xhr.open('PUT', url, true)
            xhr.setRequestHeader("Content-Type", formato);
            xhr.onload = function () {
        	     var users = xhr.responseText;
        	      if (xhr.readyState == 4 && xhr.status == "201") {
                    contenedor.textContent = xhr.responseText;
                    console.log(param);
        	         } else {
                     contenedor.textContent = "Error al hacer la operacion";
        	            }
                    }
                    xhr.send(cuerpo);
          }
          else {contenedor.textContent = "Parametro invalido";}
        }
        //en caso de que haya id?
      }
      else {contenedor.textContent = "URL invalida";}
    }
    else {contenedor.textContent = "URL invalida";}
  };

  var _evento_post = function (enlace){
    var url  = enlace;
    var xhr  = new XMLHttpRequest();
    var formato = document.getElementById("formato").value;
    var cuerpo = document.getElementById("cuerpo").value;
    var param = url.split("/");
    var contenedor = document.getElementById("contenido");
    //valida toda la url
    if((param[0]==="http:") && (param[1]==="") && (param[2]==="localhost:3000") && (param[3]==="api") && (param[4]==="1.0") && ((param[5]==="transporte") || (param[5]==="manufactura")))
    {
      if((param[6]==="entidades") || (param[6]==="actividades") || (param[6]==="detalle_actividades") || (param[6]==="empresas") || (param[6]==="inmuebles") || (param[6]==="localidades") || (param[6]==="municipios") || (param[6]==="ubicaciones"))
      {
            xhr.open('POST', url, true)
            xhr.setRequestHeader("Content-Type", formato);
            xhr.onload = function () {
        	     var users = xhr.responseText;
        	      if (xhr.readyState == 4 && xhr.status == "201") {
                    contenedor.textContent = xhr.responseText;
                    console.log(param);
        	         } else {
                     contenedor.textContent = "Error al hacer la operacion";
        	            }
                    }
                    xhr.send(cuerpo);
        //en caso de que haya id?
      }
      else {contenedor.textContent = "URL invalida";}
    }
    else {contenedor.textContent = "URL invalida";}
  };

  var _evento_delete = function (enlace){
    var url  = enlace;
    var xhr  = new XMLHttpRequest();
    var formato = document.getElementById("formato").value;
    var param = url.split("/");
    var contenedor = document.getElementById("contenido");
    //valida toda la url
    if((param[0]==="http:") && (param[1]==="") && (param[2]==="localhost:3000") && (param[3]==="api") && (param[4]==="1.0") && ((param[5]==="transporte") || (param[5]==="manufactura")))
    {
      if((param[6]==="detalle_actividad") || (param[6]==="empresa") || (param[6]==="inmueble") || (param[6]==="ubicacion"))
      {
        if(param.length === 8){
          var numero = Number.parseInt(param[7]);
          if(numero>0){
            xhr.open('DELETE', url, true)
            xhr.setRequestHeader("Content-Type", formato);
            xhr.onload = function () {
        	     var users = xhr.responseText;
        	      if (xhr.readyState == 4 && xhr.status == "200") {
                    contenedor.textContent = xhr.responseText;
                    console.log(param);
        	         } else {
                     contenedor.textContent = "Error al hacer la operacion";
        	            }
                    }
                    xhr.send(null);
          }
          else {contenedor.textContent = "Parametro invalido";}
        }
        //en caso de que haya id?
      }
      else {contenedor.textContent = "URL invalida";}
    }
    else {contenedor.textContent = "URL invalida";}
  };

  return {
    "iniciar": _iniciar
  }

}());
