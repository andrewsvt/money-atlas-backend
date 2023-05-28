require('dotenv').config({ path: '../../../.env' });

const { isPlainObject, isArray } = require('lodash');
const changeCase = require('change-case');
const camelcaseKeys = require('camelcase-keys');
const config = require('../../config');

const { connectionString, pool } = config.postgres;

module.exports = {
  client: 'postgres',
  connection: connectionString,
  pool,
  wrapIdentifier: (value, origImpl) => origImpl(changeCase.snakeCase(value)),
  postProcessResponse: (result) => {
    const items = result && result.rows ? result.rows : result;

    if (isArray(items)) {
      return items.map((r) => {
        if (isPlainObject(r)) {
          return camelcaseKeys(r);
        }
        return r;
      });
    }
    if (isPlainObject(items)) {
      return camelcaseKeys(items);
    }
    return items;
  },
};
