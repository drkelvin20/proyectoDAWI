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
    const {tipo, modificadoPor} = req.body
    const tipoPersonal = "CALL `Escuela`.`PA_Tipo_Personal_Post`( ?, ?);"
    connection.execute(tipoPersonal, [ tipo,   modificadoPor], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)

        })

 })

router.get('/', (req, res) => {
    const query = "CALL `Escuela`.`PA_Tipo_Personal_GET`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows[0])

        })
})

router.put('/:id', (req, res) => {
    const {tipo,  modificadoPor} = req.body
    const tipoPUT = "CALL `Escuela`.`PA_Tipo_Personal_PUT`(?, ?, ?);"
    connection.execute(tipoPUT, [ tipo,  modificadoPor, req.params.id ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)
    })
})

router.delete('/:id', (req, res) => {
    const tipoDEL = "CALL `Escuela`.`PA_Tipo_Personal_DELETE`(?);"
    connection.execute(tipoDEL, [req.params.id], function (err, rows, fields) {
       if (err) res.status(500).json(err)
       res.json(rows)
   })
})


module.exports = router