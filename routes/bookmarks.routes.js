const express = require('express');

const bookmarksRoutes = express.Router();

let bookmarks_controller = require('../controllers/bookmarks.controller');

bookmarksRoutes.route('/bookmarks').get(bookmarks_controller.getBookmarks);
bookmarksRoutes.route('/bookmarks').post(bookmarks_controller.addBookmark);
bookmarksRoutes.route('/bookmarks/:id').delete(bookmarks_controller.removeBookmark);
bookmarksRoutes.route('/bookmarks/:id').patch(bookmarks_controller.editBookmark);

module.exports = bookmarksRoutes;
