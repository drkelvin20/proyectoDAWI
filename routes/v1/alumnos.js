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

router.get('/', (req, res) => {
    const query = "CALL `Escuela`.`PA_Alumno_GET`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows[0])
       })
})

// router.get('/:id', (req, res) => {
//     const query = "CALL `Escuela`.`PA_Alumnos_Por_ID`(?);"
//         connection.execute(query, [req.params.id],function (err, rows, fields) {
//         if (err) res.status(500).json(err)
//         res.json(rows)
//        })
// })

router.get('/vista', (req, res) => {
    const query = "CALL `Escuela`.`PA_Alumnos_INNER_JOIN`();"
        connection.execute(query, function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows[0])
        })
})

router.post('/', (req, res) => {
    const {nombres, apellidos, dni, modificadoPor, idEstado, idPadreFamilia, codigoCE, idSeccion} = req.body
    const alumnoPOST = "CALL `Escuela`.`PA_Alumno_POST`(?, ?, ?, ?, ?, ?, ?, ?);"
    connection.execute(alumnoPOST, [nombres, apellidos, dni, modificadoPor, idEstado, idPadreFamilia, codigoCE, idSeccion], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)

        })

 })

router.put('/:id', (req, res) => {
    const {nombres, apellidos, dni, modificadoPor, idEstado, idPadreFamilia, codigoCE, idSeccion} = req.body
    const alumnoPUT = "CALL `Escuela`.`PA_Alumno_PUT`(?, ?, ?, ?, ?, ?, ?, ?, ?);"
    connection.execute(alumnoPUT, [nombres, apellidos, dni, modificadoPor, idEstado, idPadreFamilia, codigoCE, idSeccion, req.params.id ], function (err, rows, fields) {
        if (err) res.status(500).json(err)
        res.json(rows)
    })
})

router.delete('/:id', (req, res) => {
    const alumnoDEL = "CALL `Escuela`.`PA_Alumno_DELETE`(?);"
    connection.execute(alumnoDEL, [req.params.id], function (err, rows, fields) {
       if (err) res.status(500).json(err)
       res.json(rows)
   })
})


module.exports = router