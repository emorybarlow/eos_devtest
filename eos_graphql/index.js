const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const helpers = require('./helpers');

const port = 4000;

const schema = buildSchema(`
  type Query {
    block(num: Int!): Block
    latestBlock: Block
  }

  type Block {
    blocknum: Int!,
    hash: String!,
    actioncount: Int!,
  }
`);

const root = {
  block: helpers.getBlock,
  latestBlock: helpers.getLatestBlock,
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(port);

module.exports = app;
