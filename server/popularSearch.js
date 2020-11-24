const { default: SearchObj } = require("./searchObject");
const fs = require('fs')
var searchesFile = require('./searches.json');
path = './searches.json'
var searches = [];


const storeData = (data) => {
  // searches.push(data);
  try {
    //   fs.writeFile(path,)
    // searchesFile.searches.push({"source": "beer sheva", "destination": "tel-aviv"});
    fs.writeFileSync(path, JSON.stringify([data], null, 2))
  } catch (err) {
    console.error(err)
  }
}

const loadData = () => {
  fs.readFile(path, 'utf8', function (err, data) {
    //  return fs.readFileSync(path, 'utf8')
    if (err) {
      console.error(err)
      return false;
    }
    return data;

  });
}

const pushInSearches = (source, destination) => {
  //isexists 
  //else
  //push

  obj = { source: source, destination: destination, hits: 1 };
  //first time to push search
  if (!isSearchExists(obj)) {
    storeData(obj);
  }
}

const isSearchExists = (search) => {
  for (let index = 0; index < searches.length; index++) {
    let element = searches[index];
    if (element["source"] == search["source"] && element["destination"] == search["destination"]) {
      element["hits"] = element["hits"] + 1;
      return true;
    }
  }
  return false;
  // console.log(loadData(search));

}

const findMaxNumberOfHits = () => {
  var max = 0;
  var returnedObj = {};
  for (let index = 0; index < searches.length; index++) {
    let element = searches[index];
    if (element["hits"] > max) {
      max = element["hits"];
      returnedObj = element;
    }
  }
  console.log(returnedObj);
  return returnedObj;
}

const findTopPopularSearches = () => {
  //1. get the list from the file 
  //2. sort it desc
  //3. return the 5 first results;
}

// for (let index = 0; index < 3; index++) {

//   pushInSearches("haifa","tel-aviv");
// }
// for (let index = 0; index < 2; index++) {

//   pushInSearches("bnei brak","tel-aviv");
// }

//storeData({source:"haifa",destination:"yafo",hits:1});
storeData({ source: "haifa", destination: "netanya", hits: 1 });
storeData({ source: "haifa", destination: "tel-aviv", hits: 1 });
storeData({ source: "ramat-gan", destination: "yafo", hits: 1 });
storeData({ source: "haifa", destination: "yafo", hits: 1 });

console.log(loadData());



module.exports = {
  findMaxNumberOfHits,
  findTopPopularSearches,
  pushInSearches
}