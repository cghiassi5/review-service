const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const HouseGenerator = require('./houseGenerator.js');
const csvWriter = require('./CsvWriter.js');
const path = require('path');

let houseData;
let houseHeader = HouseGenerator.generateCsvHeader();
const csvWriter = createCsvWriter({
  path: path.join(__dirname, 'csvs', 'house.csv'),
  header: houseHeader,
});

const writeHousesToCsv = async () => {
  for (let i = 0; i <= 1000; i++) {
    houseData = HouseGenerator.generateHouses(100);
     await csvWriter(houseData, i, csvWriter);
  }
};

writeHousesToCsv();

module.exports = writeHousesToCsv;