const dbo = require('../db/conn');
const { ObjectId } = require('bson');
const bookmarksCollection = 'bookmarks';
exports.getBookmarks = (req, res) => {
  let db_connect = dbo.getDb('hub');
  db_connect
    .collection(bookmarksCollection)
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
};
exports.addBookmark = (req, response) => {
  let db_connect = dbo.getDb();
  let taskObj = {
    title: req.body.title,
    base_url: req.body.base_url,
    search_url: req.body.search_url,
    favorite: req.body.favorite,
  };
  db_connect.collection(bookmarksCollection).insertOne(taskObj, (err, res) => {
    if (err) throw err;
    response.json(res.insertedId);
  });
};
exports.removeBookmark = (req, response) => {
  let db_connect = dbo.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  db_connect.collection(bookmarksCollection).deleteOne(myQuery, (err, obj) => {
    if (err) throw err;
    response.status(204).end();
  });
};
exports.editBookmark = (req, response) => {
  let db_connect = dbo.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  let newValues = {
    $set: {
      title: req.body.title,
      base_url: req.body.base_url,
      search_url: req.body.search_url,
      favorite: req.body.favorite,
    },
  };
  db_connect.collection(bookmarksCollection).updateOne(myQuery, newValues, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
};
