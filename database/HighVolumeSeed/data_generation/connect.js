/* eslint-disable no-console */
const { Pool } = require('pg');

(async () => {
  const pool = new Pool({
    user: 'cghiassi5',
    database: 'airbnb',
  });

  const client = await pool.connect();
  // creates reviews table
  try {
    client.query(`CREATE TABLE IF NOT EXISTS reviews (
    review_id SERIAL PRIMARY KEY,
    user_id BIGINT,
    house_id BIGINT,
    user_pic TEXT,
    user_name TEXT,
    review_date TEXT,
    review_text TEXT,
    review_language TEXT,
    communication FLOAT,
    location FLOAT,
    value FLOAT,
    accuracy FLOAT,
    cleanliness FLOAT,
    check_in FLOAT
  )`);
    console.log('reviews table created');
  } catch (err) {
    console.log(err);
  }
  // creating houses table
  try {
    client.query(`CREATE TABLE IF NOT EXISTS houses (
    houses_id SERIAL PRIMARY KEY,
    host_pic TEXT,
    host_name TEXT,
    total_rating FLOAT,
    average_communication FLOAT,
    average_location FLOAT,
    average_value FLOAT,
    average_check_in FLOAT,
    average_accuracy FLOAT,
    average_cleanliness FLOAT
    )`);
    console.log('houses table created');
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
})();
