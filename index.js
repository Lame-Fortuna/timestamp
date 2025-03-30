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

app.get("/api/:time?", (req, res) => {
  const time = req.params.time;

  let unix, utc;

  // If no input, return current time
  if (!time) {
    unix = Date.now();
    utc = new Date(unix).toUTCString();
    return res.json({ unix, utc });
  }

  // Check if input is a Unix timestamp (only digits)
  const isUnix = /^[0-9]+$/.test(time);

  if (isUnix) {
    // Convert seconds to milliseconds if necessary
    unix = parseInt(time.length === 10 ? time * 1000 : time);
    utc = new Date(unix).toUTCString();
  } else {
    const parsedDate = new Date(time);
    
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid Date" });
    }

    unix = parsedDate.getTime();
    utc = parsedDate.toUTCString();
  }

  res.json({ unix, utc });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
