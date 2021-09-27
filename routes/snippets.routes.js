var express = require('express');
var router = express.Router();

var snippets_controller = require('../controllers/snippets.controller');

router.get('/snippets', snippets_controller.getSnippetsList);

module.exports = router;
