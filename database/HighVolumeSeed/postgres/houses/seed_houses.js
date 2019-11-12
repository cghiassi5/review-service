const { Pool } = require('pg');
const path = require('path');

(async () => {
  const pool = new Pool({
    user: 'cghiassi5',
    database: 'airbnb',
  });
  const client = await pool.connect();

  const file = path.join(__dirname, '/house.csv');
  console.log(file);
  try {
    console.log('connected');
    client.query(`COPY houses (host_pic, host_name, total_rating, communication, location, value, check_in, accuracy, cleanliness) FROM '${file}' CSV HEADER;`);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
    console.log('houses seeded');
  }
})();
