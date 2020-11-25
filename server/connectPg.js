const { Pool, Client } = require('pg')

const details = require('./connectionDetails');
const distanceMatrixApi = require('./connectGoogleApi');
const stringCare = require('./stringsCare');

var isConnected = false;

const pool = new Pool(details);
pool.query('SELECT NOW()', (err, res) => {
  pool.end()
})

const client = new Client(details);

client.connect()
  .then(() => {
    isConnected = true;
  }).catch((reason) => {
    console.log(reason);
    isConnected = false;
  });

const getDistance = (condition, callback) => {
  var ans = {};
  if (!isConnected)
    return false;
  const conditionValues = [condition.source, condition.destination];
  const getDistanceText = `SELECT id,distance,hits from distances where source=$1 and destination=$2`;
  client.query(getDistanceText, conditionValues, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      if (res.rowCount > 0) {
        updateRow(res.rows[0].id, res.rows[0].hits);
      ans = { distance: res.rows[0].distance };
      }
      else {
        ans = distanceMatrixApi.getDistanceFromGoogle(conditionValues);
        console.log(ans);
        if (ans != undefined && ans != {}) {
          ans.distance = stringCare.retrieveNumericPart(ans.distance.text);
          insertRow(ans);
        }
      }
    }callback(ans);
  });
}

const insertRow = (data) => {
  const insertText = 'INSERT INTO distances(source, destination, distance, hits) VALUES($1, $2, $3, $4) RETURNING *';
  const values = [data.source, data.destination, data.distance, 1];
  client.query(insertText, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    }
  })
}

const updateRow = (id, hits) => {
  hits = hits + 1;
  const updateText = `UPDATE distances set hits=${hits} WHERE id = ${id}`;
  client.query(updateText, (err, res) => {
    if (err) {
      console.log("error occured on updating" + err.message);
    }
    else {
      console.log('updating was successed' + res);
    }
  });
}

const getTopRows = (limit, callback) => {
  const text = `select source,destination,hits from distances order by hits desc limit ${limit}`;
  var ans = [];
  client.query(text, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      //console.log([res.rows[0]])
      ans = res.rows[0];
    }
    callback(ans);
  })

}



module.exports = {
  getDistance,
  insertRow,
  updateRow,
  getTopRows
}

