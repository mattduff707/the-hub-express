const { ObjectId } = require('bson');
const express = require('express');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const tasksRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
// const ObjectId = require('mongodb').ObjectId;
let tasks_controller = require('../controllers/tasks.controller');

tasksRoutes.route('/tasklist').get(tasks_controller.getTasklist);
tasksRoutes.route('/tasklist').post(tasks_controller.addTask);
tasksRoutes.route('/tasklist/:id').delete(tasks_controller.removeTask);
tasksRoutes.route('/tasklist/:id').patch(tasks_controller.editTask);
tasksRoutes.route('/tasklist/done/:id').patch(tasks_controller.completeTask);

module.exports = tasksRoutes;
