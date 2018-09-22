const request = require('supertest');
const eosgraphql = require('./index');
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

test('a GET on the root path should fail', () => request(eosgraphql).get('/graphql').expect(400));

test('a POST on the block route should return a valid block', async () => {
  const response = await request(eosgraphql).post('/graphql')
    .send({ query: '{ block(num: 5) { blocknum, hash, actioncount } }' });
  expect(response.statusCode).toBe(200);
  expect(response.body.data.block.blocknum).toBe(5);
  expect(response.body.data.block.hash).toBe('000000058b14352b6dbc4f6c9edb9ba89fbb5db8beb22fbcf9667326b1c21646');
  expect(response.body.data.block.actioncount).toBe(0);
});

test('a POST on the latestBlock route should return a valid block', async () => {
  const response = await request(eosgraphql).post('/graphql')
    .send({ query: '{ latestBlock { blocknum, hash, actioncount } }' });
  expect(response.statusCode).toBe(200);
  expect(response.body.data.latestBlock.blocknum).toBe(369);
  expect(response.body.data.latestBlock.hash).toBe('000000058b14352b6dbc4f6c9edb9ba89fbb5db8beb22fbcf9667326b1d21789');
  expect(response.body.data.latestBlock.actioncount).toBe(0);
});
