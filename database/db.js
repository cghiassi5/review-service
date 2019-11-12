const mongoose = require('mongoose');
const uri = 'mongodb://localhost/reviews';
const model = require('./model.js');


//database related functions to be used by server


mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
  if (err) {
    console.log('error connecting to db -->', err);
  } else {
    console.log("Connected successfully to database");
  }
});

var reset = (callback) => {
  model.Review.deleteMany({},(err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
};

var accessOneHouse = (id, callback) => {
  model.Review.findOne({'house_id': id}, (err, house) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, house);
    }
  });
};


var addOneHouse = (house, callback) => {
  model.Review.create(house).then((result) => {
    callback(null, result);
  }).catch(function (err) {callback(err)});
};

var addOneReview = (review, house_id, callback) => {
  //access the house and the review totals
    //take the input review subcategories and add them to the total
    //replace the total star and the total subcategories
  model.Review.updateOne({'house_id': house_id}, {$push: {'user_reviews': review}, $inc: {user_reviews_count: 1}}, {safe: true, new: true}, (err, result) => {
    if (err) {
      callback(err);
    } else {
        callback(null, result);
    }
  })
}

module.exports = {
  'reset': reset,
  'accessOneHouse': accessOneHouse,
  'addOneHouse': addOneHouse,
  'addOneReview': addOneReview,
  'update'
};