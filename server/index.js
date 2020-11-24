const express = require('express');
const url = require('url');
const app = express(),
  bodyParser = require("body-parser");
port = 3080;
var PgDatabase = require('./connectPg');
const popularSearch = require('./popularSearch');
var googleDistanceMetrixApi = require('./connectGoogleApi');

const distances = [];
var queryParams = {};
var source;
var destination;

app.use(bodyParser.json());

app.get('/api/distance', (req, res) => {
  queryParams = url.parse(req.url, true).query;
  popularSearch.pushInSearches(queryParams.source, queryParams.destination);
  var ans;
  ans = googleDistanceMetrixApi
    .getDistanceFromGoogle(queryParams.source, queryParams.destination);
  // source = ans.source;
  // destination = ans.destination;
  // res.body = {distance: ans.distance.text};
  console.log(ans);
  try {
    ans = PgDatabase.getDistance(queryParams);
    if(!ans){
     ans = googleDistanceMetrixApi
      .getDistanceFromGoogle(queryParams.source,queryParams.destination);
      console.log(ans);
      source = ans.source;
      destination = ans.destination;
      res.body = {distance: ans.distance.text};
    }
  } catch (error) {
    console.log('error occured when Pgdatabase called'+error)
  }
 // res.body = { distance: ans && ans.distance ? ans.distance.text : {} }
  res.body ={ distance: '123 km'};
  res.send(res.body)
});


app.get('/api/popular-search', (req, res) => {
  var ans = popularSearch.findMaxNumberOfHits();
  res.body = ans;
  res.send(res.body)
});

app.get('/api/popular-search-list', (req, res) => {

  var ans = popularSearch.findTopPopularSearches();
  // res.body = ans;
  res.send(res.body)
});


app.get('/', (req, res) => {
  res.send('App Works !!!!');
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
