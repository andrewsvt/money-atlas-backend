const createError = require('http-errors');
const { wrapAsyncRoute, formatReponse } = require('../lib/helpers');
const { cardsService } = require('../services');

const get = wrapAsyncRoute(async (req, res) => {
  const { id } = req.params;

  const card = await cardsService.get({ id });

  if (!card) {
    throw createError(404);
  }


  return res.status(200).json({
    ...card,
    serviceCardId: Number(card.serviceCardId)
  });
});

const list = wrapAsyncRoute(async (req, res) => {
  const { limit, offset, category, issuer, cardProcessor, creditRange, sort } = req.query;

  const filters = {category, issuer, cardProcessor, creditRange, sort };

  const [cards, total] = await Promise.all([
    cardsService.list({ limit, offset, filters, sort }),
    cardsService.count({ filters }),
  ]);

  const result = cards.map(({ serviceCardId, ...rest}) => ({
    ...rest,
    serviceCardId: Number(serviceCardId),
  }))

  return res.status(200).json(formatReponse({
    data: result,
    limit,
    offset,
    total: +total,
  }));
});

module.exports = {
  list,
  get,
};
