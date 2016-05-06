
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var compression = require('compression');

app.use(compression()); //use compression


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/bookevent',function(req,res,next){
  console.log(req.body);
  res.status(200);
  var email     = new sendgrid.Email({
    to:       req.body.email,
    toname : req.body.name,
    from:     'brook16haven@gmail.com',
    fromname: 'BrookHaven',
    subject:  'BrookHaven Booking Order Received',
    replyto : 'brook16haven@gmail.com',
    text:     'Hello '+req.body.name,
    html: '<h2> Hello '+req.body.name + '</h2>'
  });
  email.setFilters({"templates": {"settings":
  {"enabled": 1, "template_id": "66d56738-e156-43ae-8dff-915a5248af75"}}});
  email.addSubstitution('-name-', req.body.name);
  email.addSubstitution('-email-', req.body.email);
  email.addSubstitution('-contact_no-', req.body.contact_no);
  email.addSubstitution('-event-', req.body.event);
  email.addSubstitution('-subevent-', req.body.subevent);
  email.addSubstitution('-no-', req.body.no_of_people);
  email.addSubstitution('-venue-', req.body.venue);
  email.addSubstitution('-services-', req.body.addon_services);
  sendgrid.send(email, function(err, json) {
    if (err) { console.log(err);
      res.status = 500;
      res.send();
    }else{
      console.log(json);
      res.send();
    }

  });
});
//mailer function
var sendgrid  = require('sendgrid')('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');



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

module.exports = app;
