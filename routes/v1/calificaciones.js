const express = require('express')
var mysql = require('mysql2')
var router = express.Router()
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

router.get('/vista', (req, res) => {
    const query = "CALL `Escuela`.`PA_Calificaciones_INNER_JOIN`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows[0])

        })

})

router.get('/:id', (req, res) => {
    const query = "CALL `Escuela`.`PA_Calificaciones_Por_ID_Alumno`(?);"
        connection.execute(query, [req.params.id], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)

        })

})

router.get('/', (req, res) => {
    const query = "CALL `Escuela`.`PA_Calificaciones_GET`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)

        })

})

router.post('/', (req, res) => {
    const {nota, modificadoPor, idAlumno, idMateria} = req.body
    const calificacionesPOST = "CALL `Escuela`.`PA_Calificaciones_POST`(?, ?, ?, ?);"
    connection.execute(calificacionesPOST, [nota, modificadoPor, idAlumno, idMateria], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)
        })
 })

router.put('/:id', (req, res) => {
    const {nota, modificadoPor, idAlumno, idMateria} = req.body
    const seccionPUT = "CALL `Escuela`.`PA_Calificaciones_PUT`(?, ?, ?, ?, ?);"
    connection.execute(seccionPUT, [nota, modificadoPor, idAlumno, idMateria, req.params.id ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)
    })
})

router.delete('/:id', (req, res) => {
    const seccionDEL = "CALL `Escuela`.`PA_Calificaciones_DELETE`(?);"
    connection.execute(seccionDEL, [req.params.id], function (err, rows, fields) {
       if (err) res.status(500).json(err)
       res.json(rows)
   })
})


module.exports = router