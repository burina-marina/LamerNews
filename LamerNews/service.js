var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

var port = process.env.PORT || 3001;

console.log('start server on ' + port);
app.listen(port);


var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lamer');

var userRouter = require('./app/routers/user.router');
app.use('/app/user', userRouter);

var articleRouter = require('./app/routers/article.router');
app.use('/app', articleRouter);

var commentRouter = require('./app/routers/comment.router');
app.use('/app/comment', commentRouter);

app.use(function(req, res) {
    // Use res.sendfile, as it streams instead of reading the file into memory.
    res.sendFile(__dirname + '/public/index.html');
});
