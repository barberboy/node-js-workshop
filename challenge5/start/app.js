var express = require('express'), 
    http = require('http'), 
    path = require('path');

var app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('ip', process.env.IP || "0.0.0.0");
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

// Set up express
var server = http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
    console.log("Express server listening on port " + app.get('port'));
});

// Set up socket.io
var io = require('socket.io').listen(server);

// Handle socket traffic
io.sockets.on('connection', function (socket) {
    
    socket.on('nickname', function(data) {
        console.log(data);
        socket.set('nickname', data.name);
    })
    
    // Relay chat data to all clients
    socket.on('chat', function(data) {
        socket.get('nickname', function(err, name) {
            
            var message = {
                name: name,
                message: data.message
            }
            socket.emit('chat', message);
            socket.broadcast.emit('chat', message);
        });
    });
});