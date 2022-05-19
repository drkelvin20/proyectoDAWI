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
    const {codigoCE, nombre,  modificadoPor} = req.body
    const centroEducPOST = "CALL `Escuela`.`PA_Centro_Educativo_POST`(?, ?, ?);"
    connection.execute(centroEducPOST, [ codigoCE, nombre,  modificadoPor ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)

        })

})

router.get('/', (req, res) => {
    const query = "CALL `Escuela`.`PA_Centro_Educativo_GET`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows[0])
        })
})

router.put('/:id', (req, res) => {
    const {nombre,  modificadoPor} = req.body
    const centroEducPUT = "CALL `Escuela`.`PA_Centro_Educativo_PUT`(?, ?, ?);"
    connection.execute(centroEducPUT, [ nombre,  modificadoPor, req.params.id ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)
    })
})

router.delete('/:id', (req, res) => {
    const centroEducDEL = "CALL `Escuela`.`PA_Centro_Educativo_DELETE`(?);"
    connection.execute(centroEducDEL, [req.params.id], function (err, rows, fields) {
       if (err) res.status(500).json(err)
       res.json(rows)
   })
})


module.exports = router