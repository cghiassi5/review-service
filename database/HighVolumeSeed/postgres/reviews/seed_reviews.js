const { Pool } = require('pg');
const path = require('path');

(async () => {
  const pool = new Pool({
    user: 'cghiassi5',
    database: 'airbnb',
  });
  const client = await pool.connect();

  const file = path.join(__dirname, '/review.csv');
  console.log(file);
  try {
    console.log('connected');
    client.query(`COPY reviews (user_id, house_id, user_pic, user_name,review_date, review_text, review_language, communication, location, value, accuracy, cleanliness, check_in) FROM '${file}' CSV HEADER;`);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
    console.log('seeded');
  }
})();
