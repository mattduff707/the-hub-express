const fs = require('fs');

exports.getSnippetsList = function (req, res) {
  fs.readFile('./database/snippets.database.json', (err, data) => {
    if (err) throw err;
    const { snippetsList } = JSON.parse(data);
    console.log(snippetsList);
    res.json(snippetsList);
  });
};
