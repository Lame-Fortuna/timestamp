// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Functions 
const dateToSeconds = (dateStr) => {
  const date = new Date(dateStr);
  return date.getTime(); 
};

app.get("/api/:time?", (req, res) => {
  const time = req.params.time;
  let unix = null;
  let utc = null;

  if (!time) {
    // If no input, return current time
    unix = Date.now();
    utc = new Date(unix).toUTCString();
  } else if (time.includes('-')) {
    // If string
    unix = dateToSeconds(time);
    if (isNaN(unix)) {
      res.json({ error: "Invalid Date" });
      return;
    }
    utc = new Date(unix).toUTCString();
  } else {
    // If Unix timestamp
    unix = parseInt(time);  
    if (isNaN(unix)) {
      res.json({ error: "Invalid Date" });
      return;
    }
    utc = new Date(unix).toUTCString();
  }

  res.json({ unix: unix, utc: utc });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
