const createCsvWriter = require('csv-writer').createArrayCsvWriter;

module.exports = async (records, batchNumber, csvWriter) => {
  await csvWriter.writeRecords(records);
};