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
    const {nombres, apellidos, dni, modificadoPor, codigoCE} = req.body
    const padresPOST = "CALL `Escuela`.`PA_Padres_Familia_POST`(?, ?, ?, ?, ?);"
    connection.execute(padresPOST, [nombres, apellidos, dni, modificadoPor, codigoCE], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)

        })

 })

router.get('/', (req, res) => {
    const query = "CALL `Escuela`.`PA_Padres_Familia_GET`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows[0])

        })

})

router.put('/:id', (req, res) => {
    const {nombres, apellidos, dni, modificadoPor, codigoCE} = req.body
    const padresPUT = "CALL `Escuela`.`PA_Padres_Familia_PUT`(?, ?, ?, ?, ?, ?);"
    connection.execute(padresPUT, [nombres, apellidos, dni, modificadoPor, codigoCE, req.params.id ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)
    })
})

router.delete('/:id', (req, res) => {
    const padresDEL = "CALL `Escuela`.`PA_Padres_Familia_DELETE`(?);"
    connection.execute(padresDEL, [req.params.id], function (err, rows, fields) {
       if (err) res.status(500).json(err)
       res.json(rows)
   })
})


module.exports = router