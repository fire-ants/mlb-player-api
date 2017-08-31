const winston = require('winston');

winston.emitErrs = true;

let logger = null;

if (process.env.NODE_ENV === 'test') {
  logger = new winston.Logger();
} else {
  logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
      })
    ],
    exitOnError: false
  });
}

module.exports = logger;
module.exports.stream = {
  write: (message) => {
    logger.info(message.slice(0, -1));
  }
};
