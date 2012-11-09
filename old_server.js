// Include http module.
var http = require("http");
var Sandbox = require("./lib/sandbox")
, s = new Sandbox()

var util = require("util"),
    http = require('http'),
     url = require('url'),
      qs = require('querystring');

// Create the server. Function passed as parameter is called on every request made.
// request variable holds all request parameters
// response variable allows you to do anything with response sent to the client.
http.createServer(function (request, response) {
   // Attach listener on end event.
   // this is inside path which handles your HTTP POST method request
   if(request.method === "POST") {
    var data = "";

    request.on("data", function(chunk) {
        data += chunk;
    });

    request.on("end", function() {
      s.run( data, function( output ) {
        console.log("running");
        console.log(output.result);
        response.end(output.result);
      })
        util.log("raw: " + data);

        var json = qs.parse(data);

        util.log("json: " + json);
    });
   }
   // This event is called when client sent all data and is waiting for response.
   request.on("end", function () {
      // Write headers to the response.
      // 200 is HTTP status code (this one means success)
      // Second parameter holds header fields in object
      // We are sending plain text, so Content-Type should be text/plain
      response.writeHead(200, {
         'Content-Type': 'text/plain',
         'Access-Control-Allow-Origin' : '*'
      });
      // Send data and end response.
      response.write(data);
      response.addTrailers({'Content-MD5': "7895bf4b8828b55ceaf47747b4bca667"});
      response.end();
   });
// Listen on the 8080 port.
}).listen(8080);


