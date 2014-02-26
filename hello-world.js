// Import the "http" module from the node.js standard library
var http = require('http');
 
// Create a simple HTTP server, which will execute a function
// when it receives an incoming request
var server = http.createServer(function (request, response) {
  // Set the Content-Type HTTP header on your response to indicate
  // You are going to return plain text to the client 
  response.writeHead(200, {'Content-Type': 'text/plain'});
  
  // Supply the text content you'll send back in the body
  // of the HTTP response
  response.end('Hello Frontend Master!\n');
});
 
// Have the HTTP server start listening for HTTP requests
// on port 3000 on your local machine
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  // Once your server is started, this function is called
  console.log('Server running at http://localhost:3000/');
});