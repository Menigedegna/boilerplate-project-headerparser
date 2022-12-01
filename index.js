// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/whoami", function (req, res) {
  //A request to /api/whoami should return a JSON object = {ipaddress : your IP address, language: your preferred language, software: with your software }
  console.log("whoami - " +req.ip);
  var indexSoftware = req.rawHeaders.indexOf("User-Agent") + 1;
  var indexLanguage = req.rawHeaders.indexOf("Accept-Language") + 1
  var indexIp = req.rawHeaders.indexOf("X-Forwarded-For") + 1
  res.json({"ipaddress": req.rawHeaders[indexIp], 
            "language": req.rawHeaders[indexLanguage], 
            "software": req.rawHeaders[indexSoftware]});
});
