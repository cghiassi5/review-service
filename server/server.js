const express = require('express');
const app = express();
const port = 3000;
const db = require('../database/db.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get(`/rooms/:id`, (req, res) => {
  db.accessOneHouse(req.params.id, (err, house) => {
    if (err) {
      console.log('error accessing the data of one house:', err);
      res.end();
    } else {
      res.setHeader('Cache-Control', 'max-age=31536000');
      res.send(house);
    }
  })
})

app.put('/rooms', (req, res) => {
  db.addOneHouse(req.body, (err) => {
    if (err) {
      console.log('error adding house to database:', err);
      res.end();
    } else {
      console.log('house stored successfully!!!!');
      res.send(req.body);
    }
  })
})

app.post('/rooms/review', (req, res) => {
  db.addOneReview(req.body.review, req.body.house_id, (err) => {
    if (err) {
      console.log('error adding review to house in database:', err);
      res.end();
    } else {
      console.log('review stored in house database successfully!!!');
      res.send(req.body);
    }
  })
})

app.delete('/rooms', (req, res) => {
  db.reset((err) => {
    if (err) {
      console.log('error deleting all data in collection:', err);
    } else {
      console.log('all data in collection deleted');
    }
    res.end();
  })
});

app.post('/rooms', (req, res) => {
  db.addOneHouse(req.body, (err) => {
    if (err) {
      console.log('error adding house to database:', err);
      res.end();
    } else {
      console.log('house stored successfully!!!!');
      res.send(req.body);
    }
  })
})