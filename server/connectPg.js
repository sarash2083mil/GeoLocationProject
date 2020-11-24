const { Pool, Client } = require('pg')
const details = require('./connectionDetails');
const distanceMatrixApi = require('./connectGoogleApi');
const stringCare = require('./stringsCare');

const pool = new Pool(details);
pool.query('SELECT NOW()', (err, res) => {
  pool.end()
})

const client = new Client(details);
const connect = () => {
  try {
    client.connect();
  } catch (error) {
    console.log(' db isnt aviable or client refused connect' + error);
    throw error;
  }
}

//connect();


const getDistance = (condition, res) => {
  
  const conditionValues = [condition.source, condition.destination];
  const getDistanceText = `SELECT distance from distances where source=$1 and destination=$2 or where source=$2 and destination=$1`;
  client.query
    (getDistanceText, conditionValues, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        var ans;
        if (res.rows.length == 0) {
          ans = distanceMatrixApi.getDistanceFromGoogle(conditionValues);
          if (ans != {}) {
            ans.distance = stringCare.retrieveNumericPart(ans.distance.text);
            insertRow(ans);
          }
        }
        res.send(res.rows[0])
      }
    });
}

const insertRow = (data) => {
  const insertText = 'INSERT INTO distances(source, destination, distance) VALUES($1, $2, $3) RETURNING *';
  const values = [data.source, data.destination, data.distance];
  client.query(insertText, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  })
}




module.exports = {
  getDistance,
  insertRow
}

