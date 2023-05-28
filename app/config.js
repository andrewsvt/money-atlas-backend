module.exports = {
  postgres: {
    connectionString: process.env.PG_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 20,
    },
  },
  host: process.env.HOST,
};
