var express = require('express')
var router = express.Router()
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const assert = require('assert');
require('dotenv').config()

//GET - ALUMNOS
router.get('/', (req, res) => {
    MongoClient.connect(
        process.env.MONGO_CONNECTION_STRING,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function(connectErr, client) {
          assert.equal(null, connectErr);
          const coll = client.db('escuela').collection('alumnos');
          coll.find({}).toArray()
            .then(resultados =>
                res.json(resultados) 
            )
            .catch(err => res.status(500).json(err))
            .finally(() => 
                client.close()
            );
      });
})

router.get('/:id', (req, res) => {
    const filter = {
        '_id': new ObjectId(req.params.id)
      };
    MongoClient.connect(
        process.env.MONGO_CONNECTION_STRING,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function(connectErr, client) {
          assert.equal(null, connectErr);
          const coll = client.db('escuela').collection('alumnos');
          coll.findOne(filter)
            .then(resultados =>
                res.json(resultados)
                
            )
            
            .catch(err => res.status(500).json(err))
            .finally(() => 
                client.close()
            );
      });
})



router.post('/', (req, res) => {
    MongoClient.connect(
        process.env.MONGO_CONNECTION_STRING,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function(connectErr, client) {
          assert.equal(null, connectErr);
          const coll = client.db('escuela').collection('alumnos');
          coll.insertOne(req.body)
            .then(resultados =>
                res.json(resultados)
            )
            .catch(err => res.status(500).json(err))
            .finally(() => 
                client.close()
            );
        });
})

router.put('/:id', (req, res) => {
    const filter = {
        '_id': new ObjectId(req.params.id)
      };
    MongoClient.connect(
       process.env.MONGO_CONNECTION_STRING,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function(connectErr, client) {
          assert.equal(null, connectErr);
          const coll = client.db('escuela').collection('alumnos');
          coll.updateOne(filter, { $set: req.body})
            .then(resultados =>
                res.json(resultados)
            )
            .catch(err => res.status(500).json(err))
           .finally(() => 
                client.close()
            );
        });    
})


router.delete('/:id', (req, res) => {
    const filter = {
        '_id': new ObjectId(req.params.id)
      };
    MongoClient.connect(
       process.env.MONGO_CONNECTION_STRING,
        { useNewUrlParser: true, useUnifiedTopology: true },
        function(connectErr, client) {
          assert.equal(null, connectErr);
          const coll = client.db('escuela').collection('alumnos');
          coll.deleteOne(filter)
            .then(resultados =>
                res.json(resultados)
            )
            .catch(err => res.status(500).json(err))
           .finally(() => 
                client.close()
            );
        });    
})



module.exports = router