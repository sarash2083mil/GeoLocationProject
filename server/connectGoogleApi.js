
const request = require('request');
const stringsCare = require('./stringsCare');
API_KEY = 'AIzaSyBxvqGxEvb6ZBnyRTM8isBU_6O-MAfuNiQ';
outputFormat = 'json';
var apiUrl = 'https://maps.googleapis.com/maps/api/distancematrix/' + outputFormat;

function avoidSecureProblems() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const careJsonReslt = (dataString) => {
  var json = JSON.parse(dataString);
  // distance: { text: '152 km', value: 151986 },
  // duration: { text: '1 hour 47 mins', value: 6400 },
  // status: 'OK'
  var origin = stringsCare.stringPartByChar(json.origin_addresses[0]);
  var dest = stringsCare.stringPartByChar(json.destination_addresses[0]);

  if (json.status == "REQUEST_DENIED")
    return {};
  if (json.rows.length) {
    returnedObject = {
      origin: origin,
      destination: dest,
      distance: json.rows[0].elements[0].distance
    }
  }
  return returnedObject;
}

const getDistanceFromGoogle = (origin, destination) => {
  avoidSecureProblems();

  apiUrl = apiUrl + '?origins=' + origin +
    '&destinations=' + destination +
    '&key=' + API_KEY;

  request.post(apiUrl, function (error, response) {
    if (!error && response.statusCode == 200)
      careJsonReslt(response.body);
  })
}



module.exports = {
  getDistanceFromGoogle
}

