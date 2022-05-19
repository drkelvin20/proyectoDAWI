const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mysql = require('mysql2')

const http = require('http');
const logger = require('morgan');
const path = require('path');

//RUTAS VERSIÓN 1
const estados = require('./routes/v1/estados')
const tipoPersonal = require('./routes/v1/tipo-personal')
const personal = require('./routes/v1/personal')
const centroEduc = require('./routes/v1/centro-educativo')
const cargo = require('./routes/v1/cargo')
const grados = require('./routes/v1/grado')
const secciones = require('./routes/v1/seccion')
const padresFamilia = require('./routes/v1/padres-familia')
const materias = require('./routes/v1/materias')
const alumnos = require('./routes/v1/alumnos')
const calificaciones = require('./routes/v1/calificaciones')

//RUTAS VERSIÓN 2
var alumnosv2 = require('./routes/v2/alumnos')
var escuela = require('./routes/v2/escuela')
var gradosv2 = require('./routes/v2/grados')
var materiasv2 = require('./routes/v2/materias')
var padresv2 = require ('./routes/v2/padres_familia')
var personalv2 = require('./routes/v2/personal')



var cors = require('cors')
require('dotenv').config()

var connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USUARIO,
    port: process.env.PORT,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

})

//Configuracion de express.
const app = express()
//const port = 3000

//Middleware
app.use(cors())
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.APPPORT || 3000;

app.use('/estados', estados)
app.use('/tipo-personal', tipoPersonal)
app.use('/personal', personal)
app.use('/centro-educativo', centroEduc)
app.use('/cargo', cargo)
app.use('/grados', grados)
app.use('/secciones', secciones)
app.use('/padres-familia', padresFamilia)
app.use('/materias', materias)
app.use('/alumnos', alumnos)
app.use('/calificaciones', calificaciones)

//Rutas v2
app.use('/v2/alumnos', alumnosv2)
app.use('/v2/escuela', escuela)
app.use('/v2/grados', gradosv2)
app.use('/v2/materias', materiasv2)
app.use('/v2/padres', padresv2)
app.use('/v2/personal', personalv2)


// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

   // Error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: process.env.NODE_ENV !== 'production' ? err : {}
    });
});

app.listen(port, () => {
    console.log(`El servidor se está ejecutando en el puerto: ${port}`)
  })
