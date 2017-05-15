const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const cors = require('cors');

const url = 'mongodb://swagger:GIswqksgMUhsfUhr@k5-cluster-shard-00-00-tfvxg.mongodb.net:27017,k5-cluster-shard-00-01-tfvxg.mongodb.net:27017,k5-cluster-shard-00-02-tfvxg.mongodb.net:27017/k5?ssl=true&replicaSet=k5-cluster-shard-0&authSource=admin';
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/all', function (req, res) {
  connectToGetAll(function(data, db) {
    res.send(data);
    db.close();
  });
});

app.post('/add', function (req, res) {
  connectToAdd(req.body.newAudioName, req.body.blob);
  res.send("Inserted");
});

app.listen(1335, function () {
  console.log('Listening on port 1335');
});

function connectToAdd(name, blob) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    addNewElementToData(db, name, blob, function() {
        db.close();
    });
  });
}


function connectToGetAll(callback) {
  return MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    getAll(db, function(doc) {
      callback(doc, db);
    });
  });
}


function addNewElementToData(db, name, blob, callback) {
  const payload = {};
  db.collection("elements").insert({ name, blob }, function(err, result){
    assert.equal(err, null);
    console.log("Inserted a new key-value to database");
    callback();
  });
}


function getAll(db, callback) {
  db.collection('elements').find().toArray(function(err, data) {
    assert.equal(err, null);
    callback(data);
  });
}
