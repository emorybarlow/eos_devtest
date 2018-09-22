# eos_devtest
EOS Dev Test

# Usage
* docker-compose up

This will spin up an instance of eosio and the supporting containers detailed below.

### Web Interface
* Navigate to http://localhost:8080

### GraphQL API
* Exposed at http://localhost:4000/graphql
#### Routes
1. `block (id)`
2. `latestBlock`
#### Properties
1. `blocknum`
2. `hash`
3. `actioncount`
##### Example queries
```
curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "{ block(num: 10) { blocknum, hash, actioncount } }" }' \
  http://localhost:4000/graphql

curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{ "query": "{ latestBlock { blocknum, hash, actioncount } }" }' \
  http://localhost:4000/graphql
```
**Note** graphiql is enabled and can be accesed [here](http://localhost:4000/graphql) for testing queries

### eos_watcher
* Simple node application that polls the chain every 500ms using [eosjs-api](https://github.com/eosio/eosjs-api) and updates a postgres database

# Testing

### eos_graphql
```
cd eos_graphql

# Make sure you have dependencies installed
npm install

# lint --- you'll need to have eslint installed globally for this to work
npm run lint

# test --- you'll need to have jest installed globally for this to work
npm run coverage
```

### eos_watcher
```
cd eos_watcher

# Make sure you have dependencies installed
npm install

# lint --- you'll need to have eslint installed globally for this to work
npm run lint

# test --- you'll need to have jest installed globally for this to work
npm run coverage
```
