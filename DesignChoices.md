# Design

### Docker
1. For all docker containers I tried to use community images (`eosio`, `node`, `python`, `postgres`).
2. The database container was seeded with the appropriate schema for my application.

### eos_graphql
* An Express API was used due to simplicty and the fact that it had built in support for GraphQL
* All GraphQL endpoints query the database that is populated by the `eos_watcher`. I made that choice to reduce redundancy. One flaw in this design is that if the `eos_watcher` misses a block then it would be unavailable to the user.
* Originally all functions were included in `index.js` but I chose to pull out the primary functions in to their own file (`helpers.js`) to allow for easy unit testing. This could have also been achieved by exporting them along with the app using `module.exports` but in a larger application with more routes this would be cumbersome.
* The main express app was exported to allow for easy unit testing.
* In the unit tests all database calls were mocked because I felt that database testing was outside the scope of unit tests.

### eos_watcher
1. Rather than implement something like demux I was advised that simple polling functionality would satisfy the requirements for the dev test.
2. Initially the polling feature was not wrapped in a function but by wrapping it in a function and exporting it as part of the module it allowed it to be unit tested easily.
3. By passing the run function a callback I was able to test that the callback was being executed.
4. In the unit tests all calls to `eosjs` were mocked because, once again, I felt that testing these calls were outside the scope of unit tests.

### web
1. For the web interface I chose a python flask application. This choice was made due to familiarity and ease of dockerizing.
