require('newrelic');
const express = require('express');

const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('../database/HighVolumeSeed/data_generation/models.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../client/dist`));

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/rooms/:id', (req, res) => {
  db.selectReviews(req.params.id, (err, house) => {
    if (err) {
      console.log('error accessing the reviews of one house:', err);
      res.end();
    } else {
      res.setHeader('Cache-Control', 'max-age=31536000');
      res.status(200);
      res.send(house);
    }
  });
});

app.post('/rooms', (req, res) => {
  const newReview = req.body;
  db.addReview(newReview, (err) => {
    if (err) {
      console.log('error adding house to database:', err);
      res.end();
    } else {
      console.log('house stored successfully!!!!');
      res.send(req.body);
    }
  });
});

app.delete('/rooms', (req, res) => {
  const reviewId = req.body.reviewId;
  db.deleteReview(Number(reviewId), (err) => {
    if (err) {
      console.log('error deleting review in question:', err);
    } else {
      console.log('review deleted');
      res.send(200);
    }
    res.end();
  });
});

app.put('/rooms', (req, res) => {
  const newReview = req.body;
  db.updateReview(newReview, (err) => {
    if (err) {
      console.log('error updating review:', err);
      res.end();
    } else {
      console.log('review updated successfully!!!!');
      res.send(req.body);
    }
  });
});
