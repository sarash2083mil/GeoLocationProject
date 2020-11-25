const express = require('express');
const url = require('url');
const app = express(),
  bodyParser = require("body-parser");
port = 3080;

var googleDistanceMetrixApi = require('./connectGoogleApi');
const connectPg = require('./connectPg');

var queryParams = {};
var source;
var destination;

app.use(bodyParser.json());

app.get('/api/distance', (req, res) => {
  queryParams = url.parse(req.url, true).query;
  var result;
  try {
    connectPg.getDistance(queryParams, (ans) => {
      if (ans) {
        result = ans;
        res.body = ans;
      } else res.body = {};
      res.send(res.body)
    });
  } catch (error) {
    console.log('error occured when Pgdatabase called' + error)
  }
});


app.get('/api/popular-search', (req, res) => {
  var ans;
  connectPg.getTopRows(1, (res) => {
    if (res && res.length)
      ans = res[0];
  });
  res.body = ans;
  res.send(res.body)
});

app.get('/api/popular-search-list', (req, res) => {
  const listLimit = 5;
  var ans;
  connectPg.getTopRows(listLimit, (res) => {
    ans = res;
  });
  res.body = ans;
  res.send(res.body)
});


app.get('/*', (req, res) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,Authorization,X-Requested-With,Origin,Access-Control-Allow-Origin,Access-Control-Allow-Credentials');
  //  res.send('App Works !!!!');
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
