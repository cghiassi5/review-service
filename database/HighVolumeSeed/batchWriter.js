module.exports = async (records, batchNumber, csvWriter) => {
  await csvWriter.writeRecords(records);
};
