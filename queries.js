var promise = require('bluebird');
var js2xmlparser = require("js2xmlparser");


var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://alumno:ALEIRBAG@localhost:9696/inegi';
var db = pgp(connectionString);

function tipo_formato(res, cadena, data){
  res.format({
        'application/xml': function(){
          var xml=js2xmlparser.parse(cadena,data);
          res.send(xml);
        },
        'application/json': function(){
          res.send({ data: data });
        },
        'default': function() {
          res.status(406).send('Not Acceptable');
        }
  });
} //funcion para el tipo de formato
function getAllMEntidades(req, res, next) {
  db.any('select * from manofactura.entidad')
    .then(function (data) {
      res.status(200)
      tipo_formato(res,"entidades",data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllMActividad(req, res, next) {
  var next = parseInt(req.query.next);
  var prev = parseInt(req.query.prev);
  var inclusive = req.query.inclusive; //--paginacion--
  var to_item = parseInt(req.query.to_item);
  var orderby = req.query.orderby;
  var sort = req.query.sort; //--ordenamiento--
  var consulta;
  console.log(req.query.next);
  if((prev!==null && to_item!==null && inclusive==='false') || (orderby!==null && sort!=null)){
    if(prev!==null && to_item!==null && inclusive==='false'){ consulta = 'SELECT * FROM manofactura.actividad WHERE codigo_act >= '+to_item+' -'+prev+' AND codigo_act <= '+to_item+' ORDER BY codigo_act DESC'; }
    if(orderby!==null && sort!=null){ consulta = 'select * FROM manofactura.actividad order by '+orderby+' '+sort+''; }
  }
  else {consulta='SELECT * FROM manofactura.actividad';}
  db.any(consulta)
    .then(function (data) {
      res.status(200)
      tipo_formato(res,"actividades",data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllMDetalle_Actividades(req, res, next) {
  var next = parseInt(req.query.next);
  var prev = parseInt(req.query.prev);
  var inclusive = req.query.inclusive; //--paginacion--
  var to_item = parseInt(req.query.to_item);
  var orderby = req.query.orderby;
  var sort = req.query.sort; //--ordenamiento--
  var consulta;
  if((prev!==null && to_item!==null && inclusive==='false') || (orderby!==null && sort!=null)){
    if(prev!==null && to_item!==null && inclusive==='false'){ consulta = 'SELECT * FROM manofactura.detalle_actividad WHERE id_empresa >= '+to_item+' -'+prev+' AND id_empresa <= '+to_item+' ORDER BY codigo_act DESC'; }
    if(orderby!==null && sort!=null){ consulta = 'select * FROM manofactura.detalle_actividad order by '+orderby+' '+sort+''; }
  }
  else {consulta='SELECT * FROM manofactura.detalle_actividad';}
  db.any(consulta)
    .then(function (data) {
      res.status(200)
      tipo_formato(res, "ActividadesEmpresas", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllMEmpresa(req, res, next) {
  var next = parseInt(req.query.next);
  var prev = parseInt(req.query.prev);
  var inclusive = req.query.inclusive; //--paginacion--
  var to_item = parseInt(req.query.to_item);
  var orderby = req.query.orderby;
  var sort = req.query.sort; //--ordenamiento--
  var consulta;
  if((prev!==null && to_item!==null && inclusive==='false') || (orderby!==null && sort!=null)){
    if(prev!==null && to_item!==null && inclusive==='false'){ consulta = 'SELECT * FROM manofactura.empresa WHERE id_empresa >= '+to_item+' -'+prev+' AND id_empresa <= '+to_item+' ORDER BY id_empresa DESC'; }
    if(orderby!==null && sort!=null){ consulta = 'select * FROM manofactura.empresa order by '+orderby+' '+sort+''; }
  }
  else{consulta = 'select * FROM manofactura.empresa';}
  db.any(consulta)
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Empresas", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllMInmueble(req, res, next) {
  db.any('select * from manofactura.inmueble')
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Inmueble", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllMLocalidad(req, res, next) {
  db.any('select * from manofactura.localidad')
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Localidades", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllMMunicipio(req, res, next) {
  db.any('select * from manofactura.municipio')
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Municipios", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllMUbicacion(req, res, next) {
  var next = parseInt(req.query.next);
  var prev = parseInt(req.query.prev);
  var inclusive = req.query.inclusive; //--paginacion--
  var to_item = parseInt(req.query.to_item);
  var orderby = req.query.orderby;
  var sort = req.query.sort; //--ordenamiento--
  var consulta;
  console.log(req.query.next);
  if((prev!==null && to_item!==null && inclusive==='false') || (orderby!==null && sort!=null)){
    if(prev!==null && to_item!==null && inclusive==='false'){ consulta = 'SELECT * FROM manofactura.ubicacion WHERE id_empresa >= '+to_item+' -'+prev+' AND id_empresa <= '+to_item+' ORDER BY id_empresa DESC'; }
    if(orderby!==null && sort!=null){ consulta = 'select * FROM manofactura.ubicacion order by '+orderby+' '+sort+''; }
  }
  else {consulta='SELECT * FROM manofactura.ubicacion';}
  db.any(consulta)
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Ubicaciones", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
//GET por id
function getSingleManufactureEmpresa(req, res, next) {
  var id_empresa = parseInt(req.params.id_empresa);
  db.one('select * from manofactura.empresa where id_empresa = $1', id_empresa)

    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Empresa", data);
    })
    .catch(function (err) {
      res.status(404).send("Recurso no encontrado");
    });
}

function getSingleManufactureActividad(req, res, next) {
  var codigo_act = parseInt(req.params.codigo_act);
  db.one('select * from manofactura.actividad where codigo_act = $1', codigo_act)
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Actividad", data);
     })
    .catch(function (err) {
      return next(err);
     });
     if(res.status===500){
       res.send("Recurso no encontrado");
     }
}
function getUnaActividadTransporte(req, res, next) {
  var codigo_act = parseInt(req.params.codigo_act);
  db.one('select * from transporte.actividad where codigo_act = $1', codigo_act)
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Actividad", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
//POST
function createActividad(req, res, next) {  // para probarlo en el cliente usar la cabecera content-Type
  req.accepts('application/xml');
    if (!req.is('application/json') && !req.is('application/xml')) {
			res.status(406).send('Not Acceptable');
		}
    if(req.is('application/json')){
      db.none('insert into manofactura.actividad(nombre_act)' +
        'values(${nombre_act})',
      req.body)
      .then(function () {
        res.status(201).send('Una actividad insertada');
      })
      .catch(function (err) {
        return next(err);
      });
    }
}
//DELETE
function removeMunicipio(req, res, next) {
  var cve_mun = parseInt(req.params.cve_mun);
  db.result('delete from manofactura.municipio where cve_mun = $1', cve_mun)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} municipio'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

//////-------------------------------------------------------------------------------------------------
function getAllTEntidades(req, res, next) {
  db.any('select * from transporte.entidad')
    .then(function (data) {
      res.status(200)
      tipo_formato(res,"entidades",data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllTActividad(req, res, next) {
  db.any('select * from transporte.actividad')
    .then(function (data) {
      res.status(200)
      tipo_formato(res,"actividades",data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllTDetalle_Actividades(req, res, next) {
  var next = parseInt(req.query.next);
  var prev = parseInt(req.query.prev);
  var inclusive = req.query.inclusive; //--paginacion--
  var to_item = parseInt(req.query.to_item);
  var orderby = req.query.orderby;
  var sort = req.query.sort; //--ordenamiento--
  var consulta;
  if((prev!==null && to_item!==null && inclusive==='false') || (orderby!==null && sort!=null)){
    if(prev!==null && to_item!==null && inclusive==='false'){ consulta = 'SELECT * FROM transporte.detalle_actividad WHERE id_empresa >= '+to_item+' -'+prev+' AND id_empresa <= '+to_item+' ORDER BY codigo_act DESC'; }
    if(orderby!==null && sort!=null){ consulta = 'select * FROM transporte.detalle_actividad order by '+orderby+' '+sort+''; }
  }
  else {consulta='SELECT * FROM transporte.detalle_actividad';}
  db.any(consulta)
    .then(function (data) {
      res.status(200)
      tipo_formato(res, "ActividadesEmpresas", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllTEmpresa(req, res, next) {
  var next = parseInt(req.query.next);
  var prev = parseInt(req.query.prev);
  var inclusive = req.query.inclusive; //--paginacion--
  var to_item = parseInt(req.query.to_item);
  var orderby = req.query.orderby;
  var sort = req.query.sort; //--ordenamiento--
  var consulta;
  if(prev!==null && to_item!==null && inclusive==='false'){ consulta = 'SELECT * FROM transporte.empresa WHERE id_empresa >= '+to_item+' -'+prev+' AND id_empresa <= '+to_item+' ORDER BY id_empresa DESC'; }
  if(orderby!==null && sort!=null){ consulta = 'select * FROM transporte.empresa order by '+orderby+' '+sort+''; }
  db.any(consulta)
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Empresas", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllTInmueble(req, res, next) {
  db.any('select * from transporte.inmueble')
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Inmueble", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllTLocalidad(req, res, next) {
  db.any('select * from transporte.localidad')
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Localidades", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllTMunicipio(req, res, next) {
  db.any('select * from transporte.municipio')
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Municipios", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getAllTUbicacion(req, res, next) {
  var next = parseInt(req.query.next);
  var prev = parseInt(req.query.prev);
  var inclusive = req.query.inclusive; //--paginacion--
  var to_item = parseInt(req.query.to_item);
  var orderby = req.query.orderby;
  var sort = req.query.sort; //--ordenamiento--
  var consulta;
  console.log(req.query.next);
  if((prev!==null && to_item!==null && inclusive==='false') || (orderby!==null && sort!=null)){
    if(prev!==null && to_item!==null && inclusive==='false'){ consulta = 'SELECT * FROM transporte.ubicacion WHERE id_empresa >= '+to_item+' -'+prev+' AND id_empresa <= '+to_item+' ORDER BY id_empresa DESC'; }
    if(orderby!==null && sort!=null){ consulta = 'select * FROM transporte.ubicacion order by '+orderby+' '+sort+''; }
  }
  else {consulta='SELECT * FROM transporte.ubicacion';}
  db.any(consulta)
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Ubicaciones", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
//GET por id
function getSingleTransporteEmpresa(req, res, next) {
  var id_empresa = parseInt(req.params.id_empresa);
  db.one('select * from transporte.empresa where id_empresa = $1', id_empresa)
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Empresa", data);
    })
    .catch(function (err) {
      return next(err);
    });
}
function getSingleTransporteActividad(req, res, next) {
  var codigo_act = parseInt(req.params.codigo_act);
  db.one('select * from transporte.actividad where codigo_act = $1', codigo_act)
    .then(function (data) {
      res.status(200)
        tipo_formato(res, "Actividad", data);
    })
    .catch(function (err) {
      return next(err);
    });
}

//-------------------------------------------------------------- metodos post


function createEmpresaM(req, res, next) {

  db.none('insert into manofactura.empresa(cve_loc,per_ocu,nomb_estab,raz_soc,telefono,correoelec,www,tipounieco,fecha_alta,ageb,manzana,tipo_asent,nomb_asent,tipocencom,nom_cencom,num_local)' +
      'values(${cve_loc}, ${per_ocu}, ${nomb_estab}, ${raz_soc}, ${telefono}, ${correoelec}, ${www}, ${tipounieco}, ${fecha_alta}, ${ageb}, ${manzana},${tipo_asent}, ${nomb_asent}, ${tipocencom},${nom_cencom}, ${num_local})',
  req.body)
    .then(function () {
      res.status(201)
       res.send("Empresa Creada");
    })
    .catch(function (err) {
      return next(err);
    });
}


function createEmpresaT(req, res, next) {

  db.none('insert into transporte.empresa(cve_loc,per_ocu,nomb_estab,raz_soc,telefono,correoelec,www,tipounieco,fecha_alta,ageb,manzana,tipo_asent,nomb_asent,tipocencom,nom_cencom,num_local)' +
      'values(${cve_loc}, ${per_ocu}, ${nomb_estab}, ${raz_soc}, ${telefono}, ${correoelec}, ${www}, ${tipounieco}, ${fecha_alta}, ${ageb}, ${manzana},${tipo_asent}, ${nomb_asent}, ${tipocencom},${nom_cencom}, ${num_local})',
    req.body)
    .then(function () {
      res.status(201)
       res.send("Empresa Creada");
    })
    .catch(function (err) {
      return next(err);
    });
}

function createActividadM(req, res, next) {


	   db.none('insert into manofactura.actividad(nombre_act)' +
      'values(${nombre_act})', req.body)
      .then(function () {
      	  res.status(201)
      	  res.send("Actividad Creada");

     })

     .catch(function (err) {
       return next(err);
     });
   };




function createActividadT(req, res, next) {
 db.none('insert into transporte.actividad(nombre_act)' +
      'values(${nombre_act})', req.body)
     .then(function () {
     	  res.status(201)
     	  res.send("Actividad Creada");

    })
    .catch(function (err) {
      return next(err);
    });
}

function createDetalle_ActividadM(req, res, next) {
  db.none('insert into manofactura.detalle_actividad(id_empresa, codigo_act)' +
      'values(${id_empresa}, ${codigo_act})',
    req.body)
    .then(function () {
      res.status(201)
        res.send("Detalle_Actividad Creada");
    })
    .catch(function (err) {
      return next(err);
    });
}


function createDetalle_ActividadT(req, res, next) {
  db.none('insert into transporte.detalle_actividad(id_empresa, codigo_act)' +
      'values(${id_empresa}, ${codigo_act})',
    req.body)
    .then(function () {
      res.status(201)
        res.send("Detalle_Actividad Creada");
    })
    .catch(function (err) {
      return next(err);
    });
}


function createUbicacionM(req, res, next) {
  db.none('insert into manofactura.ubicacion(id_empresa, latitud,longitud)' +
      'values(${id_empresa}, ${latitud}, ${longitud})',
    req.body)
    .then(function () {
      res.status(201)
      res.send("Ubicacion Creada");

    })
    .catch(function (err) {
      return next(err);
    });
}

function createUbicacionT(req, res, next) {
  db.none('insert into transporte.ubicacion(id_empresa, latitud,longitud)' +
      'values(${id_empresa}, ${latitud}, ${longitud})',
    req.body)
    .then(function () {
      res.status(201)
          res.send("Ubicacion Creada");
    })
    .catch(function (err) {
      return next(err);
    });
}

function createInmuebleM(req, res, next) {
  db.none('insert into manofactura.inmueble(numero_int, letra_int, numero_ext, letra_ext, tipo_vial, nom_vial, tipo_v_e_1, nom_v_e_1, tipo_v_e_2,nom_v_e_2 ,tipo_v_e_3, nom_v_e_3, edificio, edificio_e,id_empresa)' +
      'values(${numero_int},${letra_int},${numero_ext},${letra_ext},${tipo_vial},${nom_vial},${tipo_v_e_1},${nom_v_e_1},${tipo_v_e_2},${nom_v_e_2},${tipo_v_e_3},${nom_v_e_3},${edificio},${edificio_e},${id_empresa})',
    req.body)
    .then(function () {
      res.status(201)
         res.send("Inmueble Creado");
    })
    .catch(function (err) {
      return next(err);
    });
}


function createInmuebleT(req, res, next) {
  db.none('insert into transporte.inmueble(numero_int, letra_int, numero_ext, letra_ext, tipo_vial, nom_vial, tipo_v_e_1, nom_v_e_1, tipo_v_e_2,nom_v_e_2 ,tipo_v_e_3, nom_v_e_3, edificio, edificio_e,id_empresa)' +
      'values(${numero_int},${letra_int},${numero_ext},${letra_ext},${tipo_vial},${nom_vial},${tipo_v_e_1},${nom_v_e_1},${tipo_v_e_2},${nom_v_e_2},${tipo_v_e_3},${nom_v_e_3},${edificio},${edificio_e},${id_empresa})',
    req.body)
    .then(function () {
      res.status(201)
           res.send("Inmueble Creado");
    })
    .catch(function (err) {
      return next(err);
    });
}


//------------------------------------------------------------ metodos put

function updateEmpresaM(req, res, next) {
  db.none('update manofactura.empresa set cve_loc=$1, nomb_estab=$2, raz_soc=$3, telefono=$4, correoelec=$5, www=$6 where id_empresa=$7',
    [parseInt(req.body.cve_loc),req.body.nomb_estab,req.body.raz_soc,req.body.telefono,req.body.correoelec,req.body.www,parseInt(req.params.id_empresa)])
    .then(function () {
      res.status(201)
        res.send("Actualizacion Empresa");
    })
    .catch(function (err) {
      return next(err);
    });
}



function updateEmpresaT(req, res, next) {
  db.none('update transporte.empresa set cve_loc=$1, nomb_estab=$2, raz_soc=$3, telefono=$4, correoelec=$5, www=$6 where id_empresa=$7',
    [parseInt(req.body.cve_loc),req.body.nomb_estab,req.body.raz_soc,req.body.telefono,req.body.correoelec,req.body.www,parseInt(req.params.id_empresa)])
    .then(function () {
      res.status(201)
            res.send("Actualizacion Empresa");
    })
    .catch(function (err) {
      return next(err);
    });
}


 function updateInmuebleM(req, res, next){
 db.none('update manofactura.inmueble set numero_int=$1, letra_int=$2, numero_ext=$3, letra_ext=$4, tipo_vial=$5, nom_vial=$6, tipo_v_e_1=$7, nom_v_e_1=$8, tipo_v_e_2=$9, nom_v_e_2=$10, tipo_v_e_3=$11, nom_v_e_3 =$12, edificio =$13, edificio_e=$14 where id_empresa=$15',
 [req.body.numero_int, req.body.letra_int, req.body.numero_ext, req.body.letra_ext, req.body.tipo_vial, req.body.nom_vial, req.body.tipo_v_e_1, req.body.nom_v_e_1, req.body.tipo_v_e_2, req.body.nom_v_e_2, req.body.tipo_v_e_3, req.body.nom_v_e_3, req.body.edificio, req.body.edificio_e, parseInt(req.params.id_empresa)])
     .then(function () {
      res.status(201)
      res.send("Actualizacion Inmueble");
    })
    .catch(function (err) {
      return next(err);
    });

 }
function updateInmuebleT(req, res, next){
 db.none('update transporte.inmueble set numero_int=$1, letra_int=$2, numero_ext=$3, letra_ext=$4, tipo_vial=$5, nom_vial=$6, tipo_v_e_1=$7, nom_v_e_1=$8, tipo_v_e_2=$9, nom_v_e_2=$10, tipo_v_e_3=$11, nom_v_e_3 =$12, edificio =$13, edificio_e=$14 where id_empresa=$15',
 [req.body.numero_int, req.body.letra_int, req.body.numero_ext, req.body.letra_ext, req.body.tipo_vial, req.body.nom_vial, req.body.tipo_v_e_1, req.body.nom_v_e_1, req.body.tipo_v_e_2, req.body.nom_v_e_2, req.body.tipo_v_e_3, req.body.nom_v_e_3, req.body.edificio, req.body.edificio_e, parseInt(req.params.id_empresa)])
     .then(function () {
      res.status(201)
        res.send("Actualizacion Inmueble");
    })
    .catch(function (err) {
      return next(err);
    });

 }
function updateActividadM(req, res, next){
	db.none('update manofactura.actividad set nombre_act=$1 where codigo_act=$2',
		[req.body.nombre_act,parseInt(req.params.codigo_act)])
	 .then(function () {
      res.status(201)
        res.send("Actualizacion Actividad");
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateActividadT(req, res, next){
	db.none('update transporte.actividad set nombre_act=$1 where codigo_act=$2',
		[req.body.nombre_act,parseInt(req.params.codigo_act)])
	 .then(function () {
      res.status(201)
       res.send("Actualizacion Actividad");
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateDetalle_ActividadM(req, res, next){
	db.none('update manofactura.detalle_actividad set codigo_act=$1 where id_empresa=$2',
		[req.body.codigo_act,parseInt(req.params.id_empresa)])
	 .then(function () {
      res.status(201)
      res.send("Actualizacion Detalle_Actividad");
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateDetalle_ActividadT(req, res, next){
	db.none('update transporte.detalle_actividad set codigo_act=$1 where id_empresa=$2',
		[req.body.codigo_act,parseInt(req.params.id_empresa)])
	 .then(function () {
      res.status(201)
       res.send("Actualizacion Detalle_Actividad");
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateUbicacionM(req, res, next){
	db.none('update manofactura.ubicacion set latitud=$1, longitud=$2 where id_empresa=$3',
		[req.body.latitud,req.body.longitud,parseInt(req.params.id_empresa)])
	 .then(function () {
      res.status(201)
       res.send("Actualizacion Ubicacion");
    })
    .catch(function (err) {
      return next(err);
    });
}
function updateUbicacionT(req, res, next){
	db.none('update transporte.ubicacion set latitud=$1, longitud=$2 where id_empresa=$3',
		[req.body.latitud,req.body.longitud,parseInt(req.params.id_empresa)])
	 .then(function () {
      res.status(201)
       res.send("Actualizacion Ubicacion");
    })
    .catch(function (err) {
      return next(err);
    });
}
//...............................................................................delete



//remove empresa
function removeEmpresa(req, res, next) {
  var id_empresa = parseInt(req.params.id_empresa);
  db.result('delete from manofactura.empresa where id_empresa= $1', id_empresa)
    .then(function (result) {
      res.status(200)
      res.send("Removida  Empresa");
    })
    .catch(function (err) {
      return next(err);
    });
}
// remove detalle_actividad
function removeDetActividad(req, res, next) {
  var id_empresa = parseInt(req.params.id_empresa);
  db.result('delete from manofactura.detalle_actividad where id_empresa= $1' ,id_empresa)
    .then(function (result) {
      res.status(200)
      res.send("Removido  detalle_actividad");
    })
    .catch(function (err) {
      return next(err);
    });
}
//   ubicacion remove

function removeUbicacion(req, res, next) {
  var id_empresa = parseInt(req.params.id_empresa);
  db.result('delete from manofactura.ubicacion where id_empresa= $1', id_empresa)
    .then(function (result) {
      res.status(200)
      res.send("Removido  Ubicacion");
    })
    .catch(function (err) {
      return next(err);
    });

}
// remove inmueble
function removeInmueble(req, res, next) {
  var id_empresa = req.params.id_empresa;
  db.result('delete from manofactura.inmueble where id_empresa= $1', id_empresa)
    .then(function (result) {
      res.status(200)
      res.send("Removido  Inmueble");
    })
    .catch(function (err) {
      return next(err);
    });
}

/////// transporte
///////
//remove empresa
function removeEmpresaT(req, res, next) {
  var id_empresa = parseInt(req.params.id_empresa);
  db.result('delete from transporte.empresa where id_empresa= $1', id_empresa)
    .then(function (result) {
      res.status(200)
      res.send("Removida  Empresa");
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeDetActividadT(req, res, next) {
  var id_empresa = parseInt(req.params.id_empresa);
  db.query('delete from transporte.detalle_actividad where id_empresa= $1',id_empresa)
    .then(function (result) {
      res.status(200)
      res.send("Removida  detalle_actividad");
        })
    .catch(function (err) {
      return next(err);
    });
}
//   ubicacion remove

function removeUbicacionT(req, res, next) {
  var id_empresa = parseInt(req.params.id_empresa);
  db.result('delete from transporte.ubicacion where id_empresa= $1', id_empresa)
    .then(function (result) {
      res.status(200)
      res.send("Removida  Ubicacion");
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeInmuebleT(req, res, next) {
  var id_empresa = req.params.id_empresa;
 db.result('delete from transporte.inmueble where id_empresa= $1', id_empresa)
    .then(function (result) {
      res.status(200)
      res.send("Removido  Inmueble");
    })
    .catch(function (err) {
      return next(err);
    });
}

// add query functions

module.exports = {
  //GET
  getAllMEntidades: getAllMEntidades,
  getAllMActividad: getAllMActividad,
  getAllMDetalle_Actividades: getAllMDetalle_Actividades,
  getAllMEmpresa: getAllMEmpresa,
  getAllMInmueble: getAllMInmueble,
  getAllMLocalidad: getAllMLocalidad,
  getAllMMunicipio: getAllMMunicipio,
  getAllMUbicacion: getAllMUbicacion,
  //GET por id
  getSingleManufactureEmpresa: getSingleManufactureEmpresa,
  getSingleManufactureActividad: getSingleManufactureActividad,

  getAllTEntidades: getAllTEntidades,
  getAllTActividad: getAllTActividad,
  getAllTDetalle_Actividades: getAllTDetalle_Actividades,
  getAllTEmpresa: getAllTEmpresa,
  getAllTInmueble: getAllTInmueble,
  getAllTLocalidad: getAllTLocalidad,
  getAllTMunicipio: getAllTMunicipio,
  getAllTUbicacion: getAllTUbicacion,
  //GET por id
  getSingleTransporteEmpresa: getSingleTransporteEmpresa,
  getSingleTransporteActividad: getSingleTransporteActividad,
  updateEmpresaM: updateEmpresaM,
  updateEmpresaT: updateEmpresaT,
  updateInmuebleM: updateInmuebleM,
  updateInmuebleT: updateInmuebleT,
  updateActividadM: updateActividadM,
  updateActividadT: updateActividadT,
  updateDetalle_ActividadM: updateDetalle_ActividadM,
  updateDetalle_ActividadT: updateDetalle_ActividadT,
  updateUbicacionM: updateUbicacionM,
  updateUbicacionT: updateUbicacionT,
//post
  createEmpresaM: createEmpresaM,
  createEmpresaT: createEmpresaT,
  createActividadM: createActividadM,
  createActividadT: createActividadT,
  createInmuebleM: createInmuebleM,
  createInmuebleT: createInmuebleT,
  createDetalle_ActividadT: createDetalle_ActividadT,
  createDetalle_ActividadM: createDetalle_ActividadM,
  createUbicacionM: createUbicacionM,
  createUbicacionT: createUbicacionT,

  //Delete
  removeUbicacion: removeUbicacion,
  removeEmpresa: removeEmpresa,
  removeDetActividad: removeDetActividad,
  removeInmueble: removeInmueble,


  removeUbicacionT: removeUbicacionT,
  removeEmpresaT: removeEmpresaT,
  removeDetActividadT: removeDetActividadT,
  removeInmuebleT: removeInmuebleT
};
