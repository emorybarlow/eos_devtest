const db = require('./db');

module.exports = {
  getBlock: async function getBlock({ num }) {
    const results = await db.query('SELECT * FROM eos_blocks WHERE blockNum = $1;', [num]);
    return results.rows[0];
  },
  getLatestBlock: async function getLatestBlock() {
    const results = await db.query('SELECT * FROM eos_blocks ORDER BY blockNum DESC LIMIT 1;');
    return results.rows[0];
  },
};
