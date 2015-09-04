// Required Modules
var express    = require("express");
var morgan     = require("morgan");
var app        = express();

var port = process.env.PORT || 3000;

// set morgan to log differently depending on your environment
if (app.get('env') == 'production') {
  app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
} else {
  app.use(morgan('dev'));
}

app.use(express.static("./app"));

app.get("/", function(req, res) {
    res.sendFile("./app/index.html");
});

// Handle 404
  app.use(function(req, res) {
     res.send('404: Page not Found', 404);
  });
  
  // Handle 500
  app.use(function(error, req, res, next) {
     res.send('500: Internal Server Error', 500);
  });

// Start Server
app.listen(port, function () {
    console.log( "HANDS frontend server listening on port " + port);
});