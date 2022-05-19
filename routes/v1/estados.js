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
    const {estado,  modificadoPor} = req.body
    const estadoPOST = "CALL `Escuela`.`PA_Estado_Post`(?, ?);"
    connection.execute(estadoPOST, [ estado,  modificadoPor ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)

        })

})

router.get('/:id', (req, res) => {
    const query = "SELECT `Estado`.`idEstado`, `estado`, `ultimaModificacion`, `modificadoPor` FROM `Estado` WHERE `idEstado` = ?;"
        connection.execute(query, [req.params.id],function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)
       })
})

router.get('/', (req, res) => {
    const query = "CALL `Escuela`.`PA_Estado_GET`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows[0])

        })

})

router.put('/:id', (req, res) => {
    const {estado,  modificadoPor} = req.body
    const estadoPUT = "CALL `Escuela`.`PA_Estado_PUT`(?, ?, ?);"
    connection.execute(estadoPUT, [ estado,  modificadoPor, req.params.id ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)
    })
})

router.delete('/:id', (req, res) => {
    const estadoDEL = "CALL `Escuela`.`PA_Estado_DELETE`(?);"
    connection.execute(estadoDEL, [req.params.id], function (err, rows, fields) {
       if (err) res.status(500).json(err)
       res.json(rows)
   })
})


module.exports = router