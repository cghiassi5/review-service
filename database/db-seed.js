const model = require('./model.js');
const db = require('./db.js');
const faker = require('faker');

var randomNum = (min, max, places = 0) => {
  return Number((Math.random() * (max - min) + min).toFixed(places));
}

var createReview = () => {
  var review = {
    user_id: randomNum(1000, 9999),
    user_pic: faker.image.avatar(),
    user_name: faker.name.firstName(),
    review_date: `${faker.date.month()} ${randomNum(2010, 2019)}`,
    review_text: faker.lorem.sentences(),
    review_language: "English",
    review_ratings: {
      Communication: randomNum(1, 5, 1),
      Location: randomNum(1, 5, 1),
      Value: randomNum(1, 5, 1),
      'Check-in': randomNum(1, 5, 1),
      Accuracy: randomNum(1, 5, 1),
      Cleanliness: randomNum(1, 5, 1)
    }
  };
  return review;
}

var createHouse = (id) => {
  var house = {
    house_id: id,
    host_name: faker.name.firstName(),
    total_rating: randomNum(1, 5, 2),
    total_rating_categories: {
      Communication: randomNum(1, 5, 1),
      Location: randomNum(1, 5, 1),
      Value: randomNum(1, 5, 1),
      'Check-in': randomNum(1, 5, 1),
      Accuracy: randomNum(1, 5, 1),
      Cleanliness: randomNum(1, 5, 1)
    },
    user_reviews_count: 0,
    user_reviews: []
  };
  return house;
}

var addHouses = (num) => {
  for (var i = 1; i <= num; i++) {
    var house = createHouse(i);
    db.addOneHouse(house, (err, result) => {
      if (err) {
        console.log(`err seeding house (${i}) to db:`, err);
      }
    })
  }
}

var addReviews = (num) => {
  for (var i = 0; i < num; i++) {
    var rando = randomNum(0, 300);
    for (var j = 0; j < rando; j++) {
      var review = createReview();
      if (rando % 2 === 0) {
        review.text = faker.lorem.paragraphs();
      }
      if (rando % 10 === 0) {
        review.text = review.text + ' ' + faker.lorem.paragraphs();
      }
      db.addOneReview(review, i, (err, result) => {
        if (err) {
          console.log('error adding review to house during seeding:', err);
        }
      })
    }
  }
}

db.reset((err) => {
  if (err) {
    console.log('error deleting old records when seeding db:', err);
  } else {
    addHouses(100);
    setTimeout(addReviews, 4000, 100);
    console.log('completed seeding DB :D');
  }
})

module.exports = {
  'randomNum': randomNum,
  'createReview': createReview,
  'createHouse': createHouse,
  'addHouses': addHouses,
  'addReviews': addReviews
}
