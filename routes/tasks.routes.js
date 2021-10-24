const { ObjectId } = require("bson");
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const tasksRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require('mongodb').ObjectId;

tasksRoutes.route("/tasklist").get((req, res) => {
  let db_connect = dbo.getDb("tasklist");

  db_connect
    .collection("todo")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});
tasksRoutes.route("/tasklist").post((req, response) => {
  let db_connect = dbo.getDb();
  let taskObj = {
    value: req.body.value,
    date_added: req.body.date_added,
    completed: req.body.completed,
    date_completed: req.body.date_completed,
  };
  db_connect.collection("todo").insertOne(taskObj, (err, res) => {
    if (err) throw err;
    response.json(res.insertedId);
  });
});

tasksRoutes.route("/tasklist/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  db_connect.collection("todo").deleteOne(myQuery, (err, obj) => {
    if (err) throw err;
    response.status(204).end();
  });
});

tasksRoutes.route("/tasklist/:id").patch((req, response) => {
  let db_connect = dbo.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  let newValues = {
    $set: {
      value: req.body.value,
    },
  };
  db_connect.collection("todo").updateOne(myQuery, newValues, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});
tasksRoutes.route("/tasklist/done/:id").patch((req, response) => {
  let db_connect = dbo.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  let newValues = {
    $set: {
      completed: req.body.completed,
      date_completed: req.body.date_completed,
    },
  };
  db_connect.collection("todo").updateOne(myQuery, newValues, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

module.exports = tasksRoutes;
