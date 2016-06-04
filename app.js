
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
var sendgrid  = require('sendgrid')('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');
var sendmail = function(){};
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


var getstring = function(id){
  	return id.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
};
app.use('/', routes);
app.use('/users', users);
app.post('/bookwithoutquote',function(req,res,next){
  console.log(req.body);
  var a = parseInt(req.body.checkHuman_a);
  var b = parseInt(req.body.checkHuman_b);
  var c = parseInt(req.body.senderHuman);
  var message = '<h2> Booking Order Received </h2> <br> Name : '+req.body.name +
                '<br> Email : '+req.body.email +
                '<br> Contact Number : ' + req.body.contact_no;
  if(a+b == c){
    var email = new sendgrid.Email({
      to:      'brook16haven@gmail.com',
      toname : 'BrookHaven',
      from:     req.body.email,
      fromname: req.body.name,
      subject:  'BrookHaven Booking Order Without Quote Received',
      replyto : req.body.email,
      text:     'Booking Order Received Name : '+req.body.name+" Email : "+
                  req.body.email + " Phone : "+req.body.contact_no,
      html: message
    });
    sendgrid.send(email,function(err,json){
      if(err){
        console.log(err);
        res.status = 500;
        res.send("There was some problem in sending email. Please try again later.");
      }else{
        console.log(json);
        message = "<h1>Thank You for booking with BrookHaven.</h1><br> Your request has been recorded. We will contact you shortly."
        var email     = new sendgrid.Email({
          to:       req.body.email,
          toname : req.body.name,
          from:     'brook16haven@gmail.com',
          fromname: 'BrookHaven',
          subject:  'Thank You for Booking in BrookHaven',
          replyto : 'brook16haven@gmail.com',
          text:     'Thank You for booking with BrookHaven. Your request has been recorded. We will contact you shortly.',
          html: message
        });
        sendgrid.send(email,function(err,json){
          if(err){
            console.log(err);
            res.status = 500;
            res.send("There was some problem in sending email. Please try again later.");
          }else{
            res.status=200;
            res.send("Mail succesfully sent.");
          }
        });
      }
    });
  }else{
    res.status = 500;
    res.send('Not Human ?');
  }
});
app.post('/bookwithquote',function(req,res,next){
  console.log(req.body);
  var response ={
    success : true,
    msg : "",
  };
  var a = parseInt(req.body.checkHuman_a);
  var b = parseInt(req.body.checkHuman_b);
  var c = parseInt(req.body.senderHuman);
  var message = '<h2> Booking Order Received </h2> <br> Name : '+req.body.name +
                '<br> Email : '+req.body.email +
                '<br> Contact Number : ' + req.body.contact_no+
                '<br> Price is '+req.body.price;
  if(1){
    var message = "<h1>Thank You for booking with BrookHaven.</h1><br>"+
                    "Receipt will be attached here"
    var email = new sendgrid.Email({
      to:      'brook16haven@gmail.com',
      toname : 'BrookHaven',
      from:     req.body.email,
      fromname: req.body.name,
      subject:  'BrookHaven Booking Order With Quote Received',
      replyto : req.body.email,
      text:     'Booking Order Received Name : '+req.body.name+" Email : "+
                  req.body.email + " Phone : "+req.body.contact_no+
                  "Price : "+req.body.price,
      html: message
    });
    sendgrid.send(email,function(err,json){
      if(err){
        console.log(err);
        res.status=500;
        response.success=false;
        response.msg = "Mail sending error";
        res.send(response);
      }else{
        console.log(json);
        message = '<h2> Booking Order Received </h2> <br> Name : '+req.body.name +
                      '<br> Email : '+req.body.email +
                      '<br> Contact Number : ' + req.body.contact_no+
                      '<br> Price is '+req.body.price;
        email     = new sendgrid.Email({
          to:      req.body.email,
          toname : req.body.name,
          from:     'brook16haven@gmail.com',
          fromname: 'BrookHaven',
          subject:  'Thank You for Booking in BrookHaven',
          replyto : 'brook16haven@gmail.com',
          text:     'Thank You for booking with BrookHaven. Your price is '+req.body.price,
          html: message
        });
        sendgrid.send(email,function(err,json){
          if(err){
            res.status=500;
            response.success=false;
            response.msg="Mail sent to brookhaven but user mail error";
            res.send(response);
          }else{
            console.log(json);
            res.status=200;
            response.success=true;
            response.msg="Mails sent succesfully";
            res.send(response);
          }
        });
      }
    });
  }else{
    res.status=500;
    response.success=false;
    response.msg = "Not Human";
    res.send(response);
  }
});
app.post('/calculatePrice',function(req,res,next){
  console.log(req.body);
  var response = {
    success : true ,
    price : 0
  };
  response.price=200;
  res.status=200;
  res.send(response);
});
app.post('/bookevent',function(req,res,next){
  console.log(req.body);
  res.status(200);
  var a = parseInt(req.body.checkHuman_a);
  var b = parseInt(req.body.checkHuman_b);
  var c = parseInt(req.body.senderHuman);
  console.log(a + ' + '+b+ ' == '+c);
  if(a+b == c){
    //mail construction for Admin
    var subevent;
    if(!req.body.subevent){
      subevent = req.body.otherevent;
    }else{
      subevent= req.body.subevent;
    }
    var email     = new sendgrid.Email({
      to:       'brook16haven@gmail.com',
      toname : 'BrookHaven',
      from:     req.body.email,
      fromname: req.body.name,
      subject:  'BrookHaven Booking Order Received',
      replyto : req.body.email,
      text:     'Booking Order Received',
      html: '<h2> Booking Order Received </h2>'
    });
    email.setFilters({"templates": {"settings":
    {"enabled": 1, "template_id": "66d56738-e156-43ae-8dff-915a5248af75"}}});
    email.addSubstitution('-name-', req.body.name);
    email.addSubstitution('-email-', req.body.email);
    email.addSubstitution('-contact_no-', req.body.contact_no);
    email.addSubstitution('-event-', getstring(req.body.event));
    email.addSubstitution('-subevent-', getstring(subevent));
    email.addSubstitution('-no-', req.body.no_of_people);
    email.addSubstitution('-venue-', req.body.venue);
    email.addSubstitution('-services-', req.body.addon_services);
    //send mail to user
    sendgrid.send(email, function(err, json) {
      if (err) { console.log(err);
        res.status = 500;
        res.send('There was some problem. Please try again later.');
      }else{
        //Mail to Admin Sent...Now mail to User
        console.log(json);
        var email     = new sendgrid.Email({
          to:       req.body.email,
          toname : req.body.name,
          from:     'brook16haven@gmail.com',
          fromname: 'BrookHaven',
          subject:  'BrookHaven Booking Order Received',
          replyto : 'brook16haven@gmail.com',
          text:     'Hello '+req.body.name+',',
          html: '<h2> Hello '+req.body.name + ',</h2>'
        });
        email.setFilters({"templates": {"settings":
        {"enabled": 1, "template_id": "66d56738-e156-43ae-8dff-915a5248af75"}}});
        email.addSubstitution('-name-', req.body.name);
        email.addSubstitution('-email-', req.body.email);
        email.addSubstitution('-contact_no-', req.body.contact_no);
        email.addSubstitution('-event-', getstring(req.body.event));
        email.addSubstitution('-subevent-', getstring(subevent));
        email.addSubstitution('-no-', req.body.no_of_people);
        email.addSubstitution('-venue-', req.body.venue);
        email.addSubstitution('-services-', req.body.addon_services);
        //send mail to user
        sendgrid.send(email, function(err, json) {
          if (err) { console.log(err);
            res.status = 500;
            res.send('There was some problem. Please try again later.');
          }else{
            console.log(json);
            res.send('Booking succesfully received. Please check your email.');
          }
        });
      }
    });
  }else{
    res.status = 500;
    res.send('Not Human ?');
  }
});

app.post('/contactus',function(req,res,next){
  console.log(req.body);
  //Email construction for brookhaven
  var a = parseInt(req.body.checkHuman_a);
  var b = parseInt(req.body.checkHuman_b);
  var c = parseInt(req.body.senderHuman);
  console.log(a + ' + '+b+ ' == '+c);
  if(a+b !== c){
    console.log("Captcha check failed");
    res.satus = 500;
    res.send("Not human ?");
  }else{
    var email     = new sendgrid.Email({
      to:       'brook16haven@gmail.com',
      toname : 'BrookHaven',
      from:     req.body.email,
      fromname: req.body.name,
      subject:  'Contact Us from BrookHaven',
      replyto : req.body.email,
      text:     'Message from '+ req.body.name+' < '+req.body.email+ ' > '
      + ' : ' + req.body.message,
      html: '<h3> Message from ' + req.body.name + ' < '+req.body.email+ ' > '
      + ' : </h3> <br><h2>'+req.body.message+ '</h2>'
    });
    //sending email to brookhaven
    sendgrid.send(email, function(err, json) {
      if (err) { console.log(err);
        res.status = 500;
        res.send('There was some problem. Please try again later.');
      }else{
        console.log(json);
        //if succesfully sent the mail , send an email to the user
        //mail construction for user
        var email     = new sendgrid.Email({
          to:       req.body.email,
          toname : req.body.name,
          from:     'brook16haven@gmail.com',
          fromname: 'BrookHaven',
          subject:  'Contact Us from BrookHaven',
          replyto : 'brook16haven@gmail.com',
          text:     'Thank You for contacting us. We will get back to you shortly.',
          html: '<h1> Thank You for contacting us. We will get back to you shortly.</h1> '
        });

        //If the server does not get any route , it will redirect to 404 page.
        app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

        //send mail to user
        sendgrid.send(email, function(err, json) {
          if (err) { console.log(err);
            res.status = 500;
            res.send('There was some problem. Please try again later.');
          }else{
            //if succesfull , send success message
            console.log(json);
            res.send({'status' : 'success'});
          }
        });
      }
    });
  }
});


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
