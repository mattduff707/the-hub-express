const fs = require("fs");

exports.get_snippets = function (req, res) {
  fs.readFile("./markdown/test.md", "utf8", (err, data) => {
    res.json(data);
  });
};
