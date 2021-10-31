const express = require('express');

const tasksRoutes = express.Router();

let tasks_controller = require('../controllers/tasks.controller');

tasksRoutes.route('/tasklist').get(tasks_controller.getTasklist);
tasksRoutes.route('/tasklist').post(tasks_controller.addTask);
tasksRoutes.route('/tasklist/:id').delete(tasks_controller.removeTask);
tasksRoutes.route('/tasklist/:id').patch(tasks_controller.editTask);
tasksRoutes.route('/tasklist/done/:id').patch(tasks_controller.completeTask);

module.exports = tasksRoutes;
