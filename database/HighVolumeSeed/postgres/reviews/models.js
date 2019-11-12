const { Pool } = require('pg');

const pool = new Pool({
  user: 'cghiassi5',
  database: 'airbnb',
});

const reviewsModel = {
  selectOne: async (productId, callback) => {
    const client = await pool.connect();
    try {
      client.query('SELECT * FROM reviews WHERE house_id=1');
    } catch (err) {
      console.log(err);
    } finally {
      client.release();
    }
  },
}();
