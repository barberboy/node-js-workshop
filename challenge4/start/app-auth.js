var express = require('express'), 
    http = require('http'), 
    path = require('path'),
    Post = require('./Post'),
    marked = require('marked');

var app = express();

var auth = express.basicAuth(function(user, pass){
    console.log("Checking authentication");
    return 'admin' == user && 'admin' == pass;
});


app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('ip', process.env.IP || '0.0.0.0');
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(auth);
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

// Render our home page with all blog posts
app.get('/', function(request, response) {

    // TODO: How do we get a list of all model objects using a mongoose model?
    // http://mongoosejs.com/docs/queries.html
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Post.find(function(err, posts) {
        if (err) {
            response.send(500, 'There was an error - tough luck.');
        }
        else {
            response.render('index', {
                posts:posts
            });
        }
    });
});

// Render our home page with all blog posts
app.get('/posts.json', function(request, response) {

    // TODO: How do we get a list of all model objects using a mongoose model?
    // http://mongoosejs.com/docs/queries.html
    // http://mongoosejs.com/docs/api.html#query_Query-find
    Post.find(function(err, posts) {
        if (err) {
            response.send(500, 'There was an error - tough luck.');
        }
        else {
            response.send({
                success: true,
                posts: posts
            });
        }
    });
});

// Render a form to enter a new post
app.get('/new', function(request, response) {
    response.render('new', {});
});

// create a new blog post object
app.post('/create', function(request, response) {
    // TODO: Create and save a Post model
    // http://mongoosejs.com/docs/models.html
    var post = new Post({
        title: request.body.title,
        content: marked(request.body.content)
    });

    // TODO: Save the model
    // http://mongoosejs.com/docs/models.html
    post.save(function(err, model) {
        if (err) {
            response.send(500, 'There was an error - tough luck.');
        }
        else {
            response.redirect('/');
        }
    });
});

// Available at https://node-js-workshop-c9-barberboy.c9.io
http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
