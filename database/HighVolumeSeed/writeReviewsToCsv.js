/* this file is used to create reviews which are added to a csv to later be stored in database */
const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const ReviewGenerator = require('./reviewGenerator.js');
const batchWriter = require('./batchWriter.js');
const path = require('path');

let reviewData;
//calls function created in reviewGenerator file
let reviewHeader = ReviewGenerator.generateCsvHeader();
// determines location of csv being written to
const csvWriter = createCsvWriter({
  path: path.join(__dirname, '/data_generation/reviews', 'review.csv'),
  header: reviewHeader,
  alwaysQuote: true,
});

const writeReviewsToCsv = async () => {
  for (let i = 0; i < 10000; i++) {
    reviewData = ReviewGenerator.generateReviews(1000);
     await batchWriter(reviewData, i, csvWriter);
  }
};

writeReviewsToCsv();

module.exports = writeReviewsToCsv;
