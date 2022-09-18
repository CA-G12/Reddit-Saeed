const { Pool } = require('pg');
require('dotenv').config();

let ssl = false;
let db_url = '';
const { NODE_ENV, DATABASE_URL, DEV_DB_URL, TEST_DB_URL } = process.env;
switch (NODE_ENV) {
  case 'production':
    db_url = DATABASE_URL;
    ssl = { rejectUnauthorized: false };
    break;
  case 'development':
    db_url = DEV_DB_URL;
    break;
  case 'testing':
    db_url = TEST_DB_URL;
    break;
  default:
    throw new Error('undifind database url');
}

module.exports = new Pool({
  connectionString: db_url,
  ssl: ssl,
});
