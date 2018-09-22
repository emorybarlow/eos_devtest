const helpers = require('./helpers');
const db = require('./db');

db.query = jest.fn();
db.query
  .mockReturnValueOnce(
    {
      rows: [
        {
          blocknum: 5,
          hash: '000000058b14352b6dbc4f6c9edb9ba89fbb5db8beb22fbcf9667326b1c21646',
          actioncount: 0,
        },
      ],
    },
  )
  .mockReturnValueOnce(
    {
      rows: [
        {
          blocknum: 369,
          hash: '000000058b14352b6dbc4f6c9edb9ba89fbb5db8beb22fbcf9667326b1d21789',
          actioncount: 0,
        },
      ],
    },
  );

test('test fetching a particular block', async () => {
  const { blocknum, hash, actioncount } = await helpers.getBlock(5);
  expect(blocknum).toEqual(5);
  expect(hash).toEqual('000000058b14352b6dbc4f6c9edb9ba89fbb5db8beb22fbcf9667326b1c21646');
  expect(actioncount).toEqual(0);
});

test('test fetching the latest block', async () => {
  const { blocknum, hash, actioncount } = await helpers.getLatestBlock();
  expect(blocknum).toEqual(369);
  expect(hash).toEqual('000000058b14352b6dbc4f6c9edb9ba89fbb5db8beb22fbcf9667326b1d21789');
  expect(actioncount).toEqual(0);
});
