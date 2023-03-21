const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const router = express.Router();

const url = process.env['mongodb'];
const dbName = 'catalog';

function queryProduct(query) {

    console.log('Opening db');

    return MongoClient
        .connect(url)
        .then((client) => {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            const collection = db.collection('entries');

            return collection.find(query).toArray().then((docs) => {

                client.close();

                return docs;
            });
        });
}

router.get('/product', async function (req, res) {

    const query = req.query;
    console.log('query', query);

    queryProduct(query).then((products) => {
        res.json({products})
    })

});