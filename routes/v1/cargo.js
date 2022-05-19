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
    const {cargo,  modificadoPor} = req.body
    const cargoPOST = "CALL `Escuela`.`PA_Cargo_POST`(?, ?);"
    connection.execute(cargoPOST, [ cargo,  modificadoPor ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)

        })

})

router.get('/', (req, res) => {
    const query = "CALL `Escuela`.`PA_Cargo_GET`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows[0])
        })
})

router.put('/:id', (req, res) => {
    const {cargo,  modificadoPor} = req.body
    const cargoPUT = "CALL `Escuela`.`PA_Cargo_PUT`(?, ?, ?);"
    connection.execute(cargoPUT, [ cargo,  modificadoPor, req.params.id ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)
    })
})

router.delete('/:id', (req, res) => {
    const cargoDEL = "CALL `Escuela`.`PA_Cargo_DELETE`(?);"
    connection.execute(cargoDEL, [req.params.id], function (err, rows, fields) {
       if (err) res.status(500).json(err)
       res.json(rows)
   })
})


module.exports = router