const fs = require('fs');
const http = require('http');

let date;

fs.readFile('data.json', 'utf8', function (error, text) {
  if (error) {
    throw error;
  } else {
    date = text;
  }
});

let server = http.createServer( function (request, response) {

  response.writeHead(200, {'Access-Control-Allow-Origin': '*'});



  setTimeout( function () {
    response.write(date);
    response.end();
  }, Math.random() * 1000);

});

server.listen(2323);