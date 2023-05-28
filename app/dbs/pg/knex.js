const driver = require('knex');
const knexFile = require('./knexfile');
const logger = require('../../lib/logger');

const knex = driver(knexFile);

knex.raw('SELECT 1')
  .then(() => logger.info('Postgres connection established'))
  .catch((err) => {
    logger.error('Postgres failed to connect', err);
    throw err;
  });

module.exports = knex;
