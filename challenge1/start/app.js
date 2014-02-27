// Load module dependencies
var http = require('http'),
    fs = require('fs');

http.createServer(function(request, response) {

    // TODO: Find the ASYNCHRONOUS, NON-BLOCKING API for reading in a file.
    // http://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback
    fs.readFile('./data.csv', 'utf-8', function(err, data) {
        var responseData = {};

        // Basic JS: Work with the data in the file, and create the response
        var lines = data.split('\n');

        // Note the native forEach support in Arrays in node.js!
        lines.forEach(function(line) {
            var parts = line.split(',');
            responseData[parts[0]] = parts[1];
        });

        // TODO: How do we set the content type we're sending back?
        // http://nodejs.org/api/http.html#http_response_writehead_statuscode_reasonphrase_headers
        // http://www.ietf.org/rfc/rfc4627.txt
        response.writeHead(200, {
            'Content-Type': 'application/json'
        });

        // TODO: How do we serialize responseData to a JSON string?
        // http://ecma-international.org/ecma-262/5.1/#sec-15.12.3
        response.end(JSON.stringify(responseData));
    });

// NOTE: Cloud9 IDE requires using the PORT and IP environment variables.
// https://docs.c9.io/writing_nodejs_hello_world.html
}).listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0');

console.log('node server running on port 3000');