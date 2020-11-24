
const retrieveNumericPart = (str) => {
    return str.match(/\d+/)[0];
}

const stringPartByChar = (str) => {
    if (str == undefined)
        return;
    var pos = str.search(',');
    return str.slice(0, pos);
}

module.exports = {
    retrieveNumericPart,
    stringPartByChar
}