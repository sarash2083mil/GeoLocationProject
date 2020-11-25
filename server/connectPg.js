const { Pool, Client } = require('pg')

const details = require('./connectionDetails');
const distanceMatrixApi = require('./connectGoogleApi');
const stringCare = require('./stringsCare');

var isConnected = false;

const pool = new Pool(details);
pool.query('SELECT NOW()', (err, res) => {
  console.log(res.rows);
  pool.end()
})

const client = new Client(details);

client.connect()
  .then(() => {
    isConnected = true;
    console.log(getTopRows(1));
  }).catch((reason) => {
    console.log(reason);
    isConnected = false;
  });

const getDistance = (condition, res) => {
  var ans = {};
  if (!isConnected)
    return false;
  const conditionValues = [condition.source, condition.destination];
  const getDistanceText = `SELECT id,distance,hits from distances where source=$1 and destination=$2`;
  client.query(getDistanceText, conditionValues, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res);
      if (res.rowCount > 0) {
        console.log(res.rows);
        updateRow(res.rows[0].id, res.rows[0].hits);
        ans = res.rows[0];
      }
      else {
        ans = distanceMatrixApi.getDistanceFromGoogle(conditionValues);
        if (ans != undefined && ans != {}) {
          ans.distance = stringCare.retrieveNumericPart(ans.distance.text);
          insertRow(ans);
        }
      }
    }
  });
  return ans;
}

const insertRow = (data) => {
  const insertText = 'INSERT INTO distances(source, destination, distance, hits) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [data.source, data.destination, data.distance, 1];
  client.query(insertText, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  })
}

const updateRow = (id, hits) => {
  const updateText = `UPDATE distances set { hits=${hits}+1 } WHERE id = ${id} RETURNING *`;
  client.query(updateText, data, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
  })
}

const getTopRows = (limit) => {
  const text = `select * from distances order by hits desc limit ${limit}`;
  var ans =[];
   client.query(text, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log([res.rows[0]])
      ans = res.rows[0];
    } 
  })
 
}



module.exports = {
  getDistance,
  insertRow,
  updateRow,
  getTopRows
}

