const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'eos_blocks',
  password: 'supersecretpassword',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
