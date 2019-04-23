const fs = require('fs');
const http = require('http');

let filenames = ['comments.json', 'albums.json', 'photos.json',
                 'posts.json', 'todos.json'];

let server = http.createServer( function (request, response) {

  response.writeHead(200, {'Access-Control-Allow-Origin': '*'});

  let randomIndex = Math.floor(Math.random() * filenames.length);
  let currentFile = './fakeDate/' + filenames[randomIndex];

  let date;
  fs.readFile(currentFile, 'utf8', function (error, text) {
    if (error) {
      throw error;
    } else {
      date = text;
    }
  });

  setTimeout( function () {
    response.write(date);
    response.end();
  }, Math.random() * 1000);

});

server.listen(2323);