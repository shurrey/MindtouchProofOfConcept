
/*
 * GET home page.
 */
var https = require('https');

var host ="blackboard-en-us-sandbox.mindtouch.us";
var username = "shurrey";
var password = "J@ckson8";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

exports.index = function(req,res){
  
	var endpoint = "/@api/deki/users/authenticate?dream.out.format=json";
	var method = "GET";
	var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
	var headers = {
		    'Authorization': auth
	};
	
	var options = {
		    host: host,
		    path: endpoint,
		    method: method,
		    headers: headers
		  };

		  var req = https.request(options, function(res) {
		    res.setEncoding('utf-8');

		    var responseString = '';

		    res.on('data', function(data) {
		      responseString += data;
		    });

		    res.on('end', function() {
		      console.log(responseString);
		    });
		  });

		  req.write("");
		  req.end();
};

exports.getContextMaps = function (req, res) {
	
	var endpoint = "/@api/deki/contextmaps?dream.out.format=json";
	var method = "GET";
	var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
	var headers = {
			'Authorization': auth
	};

	var options = {
			host: host,
			path: endpoint,
			method: method,
			headers: headers
	};

	var req = https.request(options, function(response) {
		response.setEncoding('utf-8');

		var responseString = '';

		response.on('data', function(data) {
			responseString += data;
		});

		response.on('end', function() {
			console.log(responseString);
			
			res._write(responseString, 'utf-8', function (err) {
			    if (err) {
			    	console.log(err);
			    }
			});
			res.end;
		});
	});

	req.write("");
	req.end();	
};

exports.getContextIds = function (req,res) {
	
	var endpoint = "/@api/deki/contexts?dream.out.format=json";
	var method = "GET";
	var auth = 'Basic ' + new Buffer(username + ':' + password).toString('base64');
	var headers = {
			'Authorization': auth
	};

	var options = {
			host: host,
			path: endpoint,
			method: method,
			headers: headers
	};

	var req = https.request(options, function(response) {
		response.setEncoding('utf-8');

		var responseString = '';

		response.on('data', function(data) {
			responseString += data;
		});

		response.on('end', function() {
			console.log(responseString);
			var responseObject = responseString;
			console.log(responseObject);
			res.write(responseObject);
			res.end;
		});
	});

	req.write("");
	req.end();	
};