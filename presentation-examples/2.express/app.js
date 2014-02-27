var express = require('express');

var app = express();
app.use(express.urlencoded())

function authUser(request, response, next) {
    var user = {
        name: 'Kevin',
        admin: true
    };

    request.user = user;
    next();
}

// Apply the authUser for all requests.
// app.use(authUser);

app.get('/', function(request, response) {
    // console.log(request.user);
    response.send({
        foo: 'bar'
    });
});

app.post('/doStuff', authUser, function(request, response /* ,next */) {
    var param = request.param('foo');
    response.send({
        foo: param,
        isAdmin: request.user.admin
    });
});

// Running at https://node-js-workshop-c9-barberboy.c9.io
app.listen(process.env.PORT, process.env.IP);