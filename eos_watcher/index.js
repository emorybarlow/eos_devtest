const EosApi = require('eosjs-api');
const db = require('./db');

const options = {
  httpEndpoint: 'http://eosio:8888',
};
const eos = EosApi(options);

const getLatestBlock = async function getLatestBlock() {
  const blockInfo = await eos.getInfo({});
  const blockNum = blockInfo.head_block_num;

  const block = await eos.getBlock(blockNum);
  const blockHash = block.id;
  const blockActionCount = block.input_transactions.length;

  db.query('INSERT INTO eos_blocks VALUES($1, $2, $3);', [blockNum, blockHash, blockActionCount]);
};

const run = function run(callback) {
  setInterval(() => {
    callback();
  }, 500);
};

run(getLatestBlock);

module.exports = {
  getLatestBlock,
  run,
  eos,
};
