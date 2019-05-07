var express = require('express');
var router = express.Router();

var db = require('../queries.js');
//var tr = require('../transporte.js');

/* GET home page. */ //GET MANUFACTURA
//router.get('/api/1.0/index', db.getIndex);

router.get('/api/1.0/manufactura/entidades', db.getAllMEntidades);
router.get('/api/1.0/manufactura/actividades', db.getAllMActividad);
router.get('/api/1.0/manufactura/detalle_actividades', db.getAllMDetalle_Actividades);
router.get('/api/1.0/manufactura/empresas', db.getAllMEmpresa);
router.get('/api/1.0/manufactura/inmuebles', db.getAllMInmueble);
router.get('/api/1.0/manufactura/localidades', db.getAllMLocalidad);
router.get('/api/1.0/manufactura/municipios', db.getAllMMunicipio);
router.get('/api/1.0/manufactura/ubicaciones', db.getAllMUbicacion);


//GET por id
router.get('/api/1.0/manufactura/empresas/:id_empresa', db.getSingleManufactureEmpresa);
router.get('/api/1.0/manufactura/actividades/:codigo_act', db.getSingleManufactureActividad);

//GET TRANSPORTE
router.get('/api/1.0/transporte/entidades', db.getAllTEntidades);
router.get('/api/1.0/transporte/actividades', db.getAllTActividad);
router.get('/api/1.0/transporte/detalle_actividades', db.getAllTDetalle_Actividades);
router.get('/api/1.0/transporte/empresas', db.getAllTEmpresa);
router.get('/api/1.0/transporte/inmuebles', db.getAllTInmueble);
router.get('/api/1.0/transporte/localidades', db.getAllTLocalidad);
router.get('/api/1.0/transporte/municipios', db.getAllTMunicipio);
router.get('/api/1.0/transporte/ubicaciones', db.getAllTUbicacion);

//GET por id
router.get('/api/1.0/transporte/empresas/:id_empresa', db.getSingleTransporteEmpresa);
router.get('/api/1.0/transporte/actividades/:codigo_act', db.getSingleTransporteActividad);

//post
router.post('/api/1.0/manufactura/empresas',db.createEmpresaM);
router.post('/api/1.0/transporte/empresas',db.createEmpresaT);
router.post('/api/1.0/manufactura/actividades',db.createActividadM);
router.post('/api/1.0/transporte/actividades',db.createActividadT);
router.post('/api/1.0/manufactura/ubicaciones',db.createUbicacionM);
router.post('/api/1.0/transporte/ubicaciones',db.createUbicacionT);
router.post('/api/1.0/manufactura/inmuebles',db.createInmuebleM);
router.post('/api/1.0/transporte/inmuebles',db.createInmuebleT);
router.post('/api/1.0/manufactura/detalle_actividades',db.createDetalle_ActividadM);
router.post('/api/1.0/transporte/detalle_actividades',db.createDetalle_ActividadT);

//put
router.put('/api/1.0/manufactura/empresas/:id_empresa',db.updateEmpresaM);
router.put('/api/1.0/transporte/empresas/:id_empresa',db.updateEmpresaT);
router.put('/api/1.0/manufactura/inmuebles/:id_empresa',db.updateInmuebleM);
router.put('/api/1.0/transporte/inmuebles/:id_empresa',db.updateInmuebleT);
router.put('/api/1.0/manufactura/actividades/:codigo_act',db.updateActividadM);
router.put('/api/1.0/transporte/actividades/:codigo_act',db.updateActividadT);
router.put('/api/1.0/manufactura/detalle_actividades/:id_empresa',db.updateDetalle_ActividadM);
router.put('/api/1.0/transporte/detalle_actividades/:id_empresa',db.updateDetalle_ActividadT);
router.put('/api/1.0/manufactura/ubicaciones/:id_empresa',db.updateUbicacionM);
router.put('/api/1.0/transporte/ubicaciones/:id_empresa',db.updateUbicacionT);

//delete
router.delete('/api/1.0/manufactura/detalle_actividad/:id_empresa', db.removeDetActividad);
router.delete('/api/1.0/manufactura/empresa/:id_empresa', db.removeEmpresa);
router.delete('/api/1.0/manufactura/ubicacion/:id_empresa', db.removeUbicacion);
router.delete('/api/1.0/manufactura/inmueble/:id_empresa', db.removeInmueble);

router.delete('/api/1.0/transporte/detalle_actividad/:id_empresa', db.removeDetActividadT);
router.delete('/api/1.0/transporte/empresa/:id_empresa', db.removeEmpresaT);
router.delete('/api/1.0/transporte/ubicacion/:id_empresa', db.removeUbicacionT);
router.delete('/api/1.0/transporte/inmueble/:id_empresa', db.removeInmuebleT);

//router.get('/', function (req, res) {

  //  res.render('index.html', {title: 'API-REST HPW 2017'}); // load the single view file (angular will handle the page changes on the front-end)
//});


//DELETE
//router.delete('/api/manufactura/municipio/:cve_mun', db.removeMunicipio);

module.exports = router;
