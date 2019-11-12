const createCsvWriter = require('csv-writer').createArrayCsvWriter;
const ReviewGenerator = require('./reviewGenerator.js');
const batchWriter = require('./batchWriter.js');
const path = require('path');

let reviewData;
let reviewHeader = ReviewGenerator.generateCsvHeader();
const csvWriter = createCsvWriter({
  path: path.join(__dirname, '/postgres/reviews', 'review.csv'),
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
