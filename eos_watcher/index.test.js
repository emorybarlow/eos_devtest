const db = require('./db');
const watcher = require('./index');

jest.useFakeTimers();

db.query = jest.fn();

watcher.eos.getInfo = jest.fn();
watcher.eos.getInfo.mockReturnValue({
  server_version: '367ada2d',
  head_block_num: 8,
  last_irreversible_block_num: 7,
  head_block_id: '000000088b2c64b6c11e0edcbc29e34141e8368778e1c07e0d8833e1a5cc499e',
  head_block_time: '2018-09-23T05:30:50',
  head_block_producer: 'eosio',
});

watcher.eos.getBlock = jest.fn();
watcher.eos.getBlock.mockReturnValue({
  previous: '000000088b2c64b6c11e0edcbc29e34141e8368778e1c07e0d8833e1a5cc499e',
  timestamp: '2018-09-23T05:30:51.000',
  transaction_mroot: '4a4884270c5682ecb6b31546108c5c9a03fb1fcd51ba8950a1a445cf9aa417a0',
  action_mroot: '5a6b20fe480e0da2a4e9bd5a26071e83321c858bc4bf10146a0590702d0c53d7',
  block_mroot: 'fb70545cf31e9f96185b80cb00e5264240732186c877560b558f2f620d657b43',
  producer: 'eosio',
  schedule_version: 0,
  new_producers: null,
  producer_signature: 'EOSJyv1j1tocfAJUbNZ14vwAJuKZp9YvX42wzPpdjNPqh5pYEP2BnZuoeCv75otmUJYcrkiW3pKK5UE6KMG6LihgpueQ2sDUg',
  regions: [{ region: 0, cycles_summary: [Array] }],
  input_transactions: [],
  id: '00000009ec9536cfcbce643b88e27480690b3dfdeed0bed3800d45d39739943e',
  block_num: 9,
  ref_block_prefix: 996462283,
});

test('waits 500ms before fetching a block', () => {
  const callback = jest.fn();
  watcher.run(callback);

  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 500);
});

test('test that callback is called properly in setInterval', () => {
  const callback = jest.fn();
  watcher.run(callback);

  expect(callback).not.toBeCalled();
  jest.advanceTimersByTime(750);
  expect(callback).toBeCalled();
});

test('test fetching the latest block using eosjs-api', async () => {
  await watcher.getLatestBlock();
  expect(db.query).toHaveBeenCalledWith(
    'INSERT INTO eos_blocks VALUES($1, $2, $3);', [8, '00000009ec9536cfcbce643b88e27480690b3dfdeed0bed3800d45d39739943e', 0],
  );
});
