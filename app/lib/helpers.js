const Crypto = require('crypto');
const bcrypt = require('bcryptjs');

const wrapAsyncRoute = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const randomString = (size = 21) => Crypto
  .randomBytes(size)
  .toString('hex')
  .slice(0, size);

const formatReponse = ({
  data, limit, offset, total,
}) => ({
  meta: { limit, offset, total },
  data,
});

const generatePassword = async (password) => bcrypt.genSalt(10)
  .then((salt) => bcrypt.hash(password, salt));

module.exports = {
  wrapAsyncRoute,
  randomString,
  formatReponse,
  generatePassword,
};
