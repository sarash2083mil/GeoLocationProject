const express = require('express');
const url = require('url');
const app = express(),
  bodyParser = require("body-parser");
port = 3080;
var PgDatabase = require('./connectPg');
const popularSearch = require('./popularSearch');
var googleDistanceMetrixApi = require('./connectGoogleApi');
const connectPg = require('./connectPg');

const distances = [];
var queryParams = {};
var source;
var destination;

app.use(bodyParser.json());

app.get('/api/distance', (req, res) => {
  queryParams = url.parse(req.url, true).query;
  var ans;
  try {
    ans = PgDatabase.getDistance(queryParams);
    if (ans) {
      source = ans.source;
      destination = ans.destination;
      res.body = { distance: ans.distance };
    }
    else res.body = { distance: '123 km' };
  } catch (error) {
    console.log('error occured when Pgdatabase called' + error)
  }
  res.send(res.body)
});


app.get('/api/popular-search', (req, res) => {
  var ans = connectPg.getTopRows(1);
  res.body = ans;
  res.send(res.body)
});

app.get('/api/popular-search-list', (req, res) => {
  const listLimit = 5;
  var ans = connectPg.getTopRows(listLimit);
  res.body = ans;
  res.send(res.body)
});


app.get('/', (req, res) => {
  res.send('App Works !!!!');
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
