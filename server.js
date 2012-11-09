var deployd = require('deployd')
  , options = {port: 3000}
  , server = deployd(options)
  , my_http = require("http");  

server.listen();
server.on('listening', function() {
  console.log(server.options.port); // 2403
});

