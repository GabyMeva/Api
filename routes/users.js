var express = require('express');
var router = express.Router();

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.get('/',function(request,res){
    // el método es sendFile (con F mayúscula) y debes agregar
    // la variable de entorno llamada __dirname que te da la ruta de
    // de la raíz en tu actual proyecto
    res.sendFile(__dirname + '/index.html');
});

module.exports = router;
