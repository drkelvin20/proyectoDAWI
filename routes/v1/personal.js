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
    const {nombres, apellidos, dni, correo, modificadoPor, idTipoPersonal, idEstado, codigoCE, idCargo} = req.body
    const personal = "CALL `Escuela`.`PA_Personal_POST`(?, ?, ?, ?, ?, ?, ?, ?, ?);"
    connection.execute(personal, [nombres, apellidos, dni, correo, modificadoPor, idTipoPersonal, idEstado, codigoCE, idCargo ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)

        })

 })

 router.get('/vista', (req, res) => {
    const query = "CALL `Escuela`.`PA_Personal_GET-INNER_JOIN`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows[0])

        })

})

router.get('/', (req, res) => {
    const query = "CALL `Escuela`.`PA_Personal_GET`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows[0])

        })

})

router.put('/:id', (req, res) => {
    const {nombres, apellidos, dni, correo, modificadoPor, idTipoPersonal, idEstado, codigoCE, idCargo} = req.body
    const personalPUT = "CALL `Escuela`.`PA_Personal_PUT`(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
    connection.execute(personalPUT, [nombres, apellidos, dni, correo, modificadoPor, idTipoPersonal, idEstado, codigoCE, idCargo, req.params.id ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)
    })
})

router.delete('/:id', (req, res) => {
    const personalDEL = "CALL `Escuela`.`PA_Personal_DELETE`(?);"
    connection.execute(personalDEL, [req.params.id], function (err, rows, fields) {
       if (err) res.status(500).json(err)
       res.json(rows)
   })
})


module.exports = router