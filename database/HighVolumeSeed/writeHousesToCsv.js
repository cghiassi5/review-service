const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const path = require('path');
const HouseGenerator = require('./houseGenerator.js');
const batchWriter = require('./batchWriter.js');

let houseData;
const houseHeader = HouseGenerator.generateCsvHeader();
const csvWriter = createCsvWriter({
  path: path.join(__dirname, '/postgres/houses', 'house.csv'),
  header: houseHeader,
  alwaysQuote: true,
});

const writeHousesToCsv = async () => {
  for (let i = 0; i <= 1000; i++) {
    houseData = HouseGenerator.generateHouses(100);
    await batchWriter(houseData, i, csvWriter);
  }
};

writeHousesToCsv();

module.exports = writeHousesToCsv;
