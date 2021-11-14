const express = require("express");

const snippets_routes = express.Router();

var snippets_controller = require("../controllers/snippets.controller");

snippets_routes.route("/snippets").get(snippets_controller.get_snippets);
snippets_routes
  .route("/snippets/categories")
  .get(snippets_controller.get_categories);
snippets_routes.route("/snippets").post(snippets_controller.add_snippet);

// snippets_routes.route("/snippets").post(snippets_controller.add_snippet);

module.exports = snippets_routes;
