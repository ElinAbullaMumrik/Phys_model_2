var fs = require('fs'),
    http = require('http');

http.createServer(function (req, res) {
  if(req.url.endsWith( '/physics301') || req.url.endsWith( '/physics301/')){
      req.url = '/physics301/index.html'
  }
  console.log(req.url)
  fs.readFile(__dirname + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(9124);