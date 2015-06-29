
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Prints the payload to console and then returns a 204 response.  
function handlePayload(endpoint, req, res) {  
    var body = "";  
    req.on('data', function (chunk) {  
        body += chunk;  
    });  
    req.on('end', function () {  
        console.log('Payload from the '+endpoint+' endpoint:\n' + body);  
        res.writeHead(204);  
        res.end();  
    });  
}

app.get('/', routes.index);
app.get('/contextids', routes.getContextIds);
app.get('/contextmaps', routes.getContextMaps);  
  
// Handle the register request  
app.post('/'+registerEndpoint+'/', function(req, res) {  
  handlePayload(registerEndpoint, req, res);  
});  
  
// Handle the unregister request  
app.post('/'+unregisterEndpoint+'/', function(req, res) {  
  handlePayload(unregisterEndpoint, req, res);  
});  

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
