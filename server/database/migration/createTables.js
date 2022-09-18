const connection = require('../config/connection');
const join = require('path').join;
const { readFileSync } = require('fs');

const createTablesQuery = readFileSync(
  join(__dirname, '..', 'queries', 'createTables.sql'),
  'utf-8'
);
module.exports = function createTable() {
  connection.query(createTablesQuery);
};
