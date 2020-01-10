/* file creates one review at a time and is called in writeReviews */
const faker = require('faker');

class ReviewGenerator {
  randomNum(min, max, places = 0) {
    return Number((Math.random() * (max - min) + min).toFixed(places));
  }

  generateCsvHeader() {
    return ['user_id', 'house_id', 'user_pic', 'user_name', 'review_date', 'review_text', 'review_language', 'Communication', 'Location', 'Value', 'Accuracy', 'Cleanliness', 'Check-in'];
  }

  generateReviews(reviewCount) {
    const reviews = [];
    for (let i = 0; i < reviewCount; i++) {
      const review = [
        this.randomNum(1000000000, 9999999999),
        this.randomNum(1, 10000),
        faker.image.avatar(),
        faker.name.firstName(),
        `${faker.date.month()} ${this.randomNum(2010, 2019)}`,
        faker.lorem.sentences(),
        'English',
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
        this.randomNum(1, 5, 1),
      ];
      reviews.push(review);
    }
    return reviews;
  }
}

module.exports = new ReviewGenerator();
