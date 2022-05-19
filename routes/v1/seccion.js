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

router.post('/', (req, res) => {
    const {seccion, modificadoPor, idGrado} = req.body
    const seccionPOST = "CALL `Escuela`.`PA_Seccion_POST`(?, ?, ?);"
    connection.execute(seccionPOST, [seccion, modificadoPor, idGrado], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)

        })

 })

router.get('/', (req, res) => {
    const query = "CALL `Escuela`.`PA_Seccion_GET`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows[0])

        })

})

router.put('/:id', (req, res) => {
    const {seccion, modificadoPor, idGrado} = req.body
    const seccionPUT = "CALL `Escuela`.`PA_Seccion_PUT`(?, ?, ?, ?);"
    connection.execute(seccionPUT, [seccion, modificadoPor, idGrado, req.params.id ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)
    })
})

router.delete('/:id', (req, res) => {
    const seccionDEL = "CALL `Escuela`.`PA_Seccion_DELETE`(?);"
    connection.execute(seccionDEL, [req.params.id], function (err, rows, fields) {
       if (err) res.status(500).json(err)
       res.json(rows)
   })
})


module.exports = router