const express = require('express');

const {
  cards,
} = require('../controllers');

const router = express.Router();

router.get('/', (req, res) => res.send(200));

router.get('/cards', cards.list);
router.get('/cards/:id', cards.get);
router.get('/cards/slug/:slug', cards.getBySlug);

module.exports = router;
