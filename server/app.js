const express = require('express');
const compression = require('compression');
const join = require('path').join;
const cookieParser = require('cookie-parser');
const router = require('./routes');

require('dotenv').config();

const app = express();

app.set('port', process.env.PORT);
app.disable('x-powered-by');

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(express.static(join(__dirname, '..', 'frontend', 'public')));

app.use('/api/v1', router);

module.exports = app;
