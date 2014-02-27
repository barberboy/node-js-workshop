var twilio = require('twilio');

var client = twilio();

client.sendMessage({
    to: '+16512080532',
    from: '+18016917578',
    body: 'Hello from Nebrasksa'
}, function(err, message) {
    if (err) console.log(err);
    else console.log(message);
});