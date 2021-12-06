const fs = require("fs");
const dbo = require("../db/conn");
const { ObjectId } = require("bson");

const snippets_tag = "snippets";
const snippets_categories_tag = "snippets_categories";

exports.get_snippets = function (req, res) {
  let db_connect = dbo.getDb("hub");
  db_connect
    .collection(snippets_tag)
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
};

exports.add_snippet = (req, response) => {
  let db_connect = dbo.getDb();
  let snippet_obj = {
    value: req.body.snippet,
  };
  db_connect.collection(snippets_tag).insertOne(snippet_obj, (err, res) => {
    if (err) throw err;
    // response.json(res.insertedId);
  });
};
