const dbo = require('../db/conn');
const { ObjectId } = require('bson');

const tasklistCollection = 'tasklist';
exports.getTasklist = (req, res) => {
  let db_connect = dbo.getDb('hub');
  db_connect
    .collection(tasklistCollection)
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
};
exports.addTask = (req, response) => {
  let db_connect = dbo.getDb();
  let taskObj = {
    value: req.body.value,
    date_added: req.body.date_added,
    completed: req.body.completed,
    date_completed: req.body.date_completed,
  };
  db_connect.collection(tasklistCollection).insertOne(taskObj, (err, res) => {
    if (err) throw err;
    response.json(res.insertedId);
  });
};
exports.removeTask = (req, response) => {
  let db_connect = dbo.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  db_connect.collection(tasklistCollection).deleteOne(myQuery, (err, obj) => {
    if (err) throw err;
    response.status(204).end();
  });
};
exports.editTask = (req, response) => {
  let db_connect = dbo.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  let newValues = {
    $set: {
      value: req.body.value,
    },
  };
  db_connect.collection(tasklistCollection).updateOne(myQuery, newValues, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
};
exports.completeTask = (req, response) => {
  let db_connect = dbo.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  let newValues = {
    $set: {
      completed: req.body.completed,
      date_completed: req.body.date_completed,
    },
  };
  db_connect.collection(tasklistCollection).updateOne(myQuery, newValues, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
};
