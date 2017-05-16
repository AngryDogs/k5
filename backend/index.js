const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const bodyParser = require('body-parser');
const cors = require('cors');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });
const url = 'mongodb://swagger:GIswqksgMUhsfUhr@k5-cluster-shard-00-00-tfvxg.mongodb.net:27017,k5-cluster-shard-00-01-tfvxg.mongodb.net:27017,k5-cluster-shard-00-02-tfvxg.mongodb.net:27017/k5?ssl=true&replicaSet=k5-cluster-shard-0&authSource=admin';
const app = express();

app.use(cors());
// app.use(bodyParser.json());

app.get('/all', function (req, res) {
  connectToGetAll(function(data, db) {
    res.send(data);
    db.close();
  });
});

app.get('/public/uploads/:name', function (req, res, next) {
  var options = {
    root: __dirname + '/public/uploads',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });

});

app.post('/add', upload.single('blob'), function (req, res) {
  connectToAdd(req.file.originalname.toLowerCase(), req.file);
  res.send("Inserted");
});

app.listen(1335, function () {
  console.log('Listening on port 1335');
});

function connectToAdd(name, blob) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err.toString())
      return
    }
    addNewElementToData(db, name, blob, function() {
      db.close();
    });
  });
}


function connectToGetAll(callback) {
  return MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log(err.toString())
      return
    }
    getAll(db, function(doc) {
      callback(doc, db);
    });
  });
}


function addNewElementToData(db, name, blob, callback) {
  const payload = {};
  db.collection("elements").insert({ _id: name, name, blob }, function(err, result) {
    if (err) {
      console.log(err.toString())
      return
    }
    console.log("Inserted a new key-value to database");
    callback();
  });
}


function getAll(db, callback) {
  // db.collection('elements').remove({})
  db.collection('elements').find().toArray(function(err, data) {
    if (err) {
      console.log(err.toString())
      return
    }
    callback(data);
  });
}
