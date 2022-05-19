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
    const {grado, modificadoPor, codigoCE} = req.body
    const gradoPOST = "CALL `Escuela`.`PA_Grado_POST`(?, ?, ?);"
    connection.execute(gradoPOST, [grado, modificadoPor, codigoCE], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)

        })

 })


router.get('/', (req, res) => {
    const query = "CALL `Escuela`.`PA_Grado_GET`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows[0])

        })

})

router.put('/:id', (req, res) => {
    const {grado, modificadoPor, codigoCE} = req.body
    const gradoPUT = "CALL `Escuela`.`PA_Grado_PUT`(?, ?, ?, ?);"
    connection.execute(gradoPUT, [grado, modificadoPor, codigoCE, req.params.id ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)
    })
})

router.delete('/:id', (req, res) => {
    const gradoDEL = "CALL `Escuela`.`PA_Grado_DELETE`(?);"
    connection.execute(gradoDEL, [req.params.id], function (err, rows, fields) {
       if (err) res.status(500).json(err)
       res.json(rows)
   })
})


module.exports = router