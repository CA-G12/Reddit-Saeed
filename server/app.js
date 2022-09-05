const express = require('express')
const compression = require('compression')
require('dotenv').config()
const join = require('path').join

const app = express()

app.set('port', process.env.PORT)
app.use(compression())
app.use(express.static(join(__dirname, '..', 'frontend', 'public')))

module.exports = app
