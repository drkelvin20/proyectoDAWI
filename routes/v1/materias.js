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
    const {nombre, modificadoPor, idEstado, idGrado} = req.body
    const materiaPOST = "CALL `Escuela`.`PA_Materias_POST`(?, ?, ?, ?);"
    connection.execute(materiaPOST, [nombre, modificadoPor, idEstado, idGrado], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)

        })

 })

router.get('/', (req, res) => {
    const query = "CALL `Escuela`.`PA_Materias_GET`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows[0])

        })

})

router.put('/:id', (req, res) => {
    const {nombre, modificadoPor, idEstado, idGrado} = req.body
    const materiaPUT = "CALL `Escuemateria`(?, ?, ?, ?, ?);"
    connection.execute(materiaPUT, [nombre, modificadoPor, idEstado, idGrado, req.params.id ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)
    })
})

router.delete('/:id', (req, res) => {
    const materiaDEL = "CALL `Escuela`.`PA_Materias_DELETE`(?);"
    connection.execute(materiaDEL, [req.params.id], function (err, rows, fields) {
       if (err) res.status(500).json(err)
       res.json(rows)
   })
})


module.exports = router