const fs = require('fs');

async function saveData(data) {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

module.exports = saveData;
