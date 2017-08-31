const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./app/config/config.js').get(process.env.NODE_ENV);
const logger = require('./app/middleware/logging');

const app = express();
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(morgan('dev', { stream: logger.stream }));

mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri, { useMongoClient: true });

app.use('/player', require('./app/routes/player'));

const server = app.listen(config.port, () => {
  logger.info(`Listening on ${config.port}`);
});

module.exports = server;
