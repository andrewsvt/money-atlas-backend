const createError = require('http-errors');
const knex = require('../dbs/pg/knex');
const { CARDS_TABLE } = require('../constants/tables');

const defaultColumns = [ 
  'id', 'display_name', 'card_name', 'raw_logo_image_url', 'editor_rating', 'terms_and_conditions_link',
'bonus_miles_full', 'rewards_description_long', 'reg_apr', 'reg_apr_type', 'annual_fees', 'credit_score_needed',
'card_processor_type_name', 'intro_apr_rate', 'intro_apr_duration', 'service_card_id'];

const get = async ({ id, columns = defaultColumns }) => {
  const card = await knex(CARDS_TABLE)
    .select(columns)
    .where({
      id,
    })
    .limit(1)
    .first();

  return card;
};

const list = async ({ limit, offset, columns = defaultColumns, filters, sort }) => {
  const query = knex(CARDS_TABLE)
    .select(columns)
    .limit(limit)
    .offset(offset);

  if(filters.category) {
    query.where({ credit_card_type: filters.category })
  }

  if(filters.issuer) {
    query.where({ displayName: filters.issuer })
  }

  if(filters.cardProcessor) {
    query.where({ cardProcessorTypeName: filters.cardProcessor })
  }

  if(filters.creditRange) {
    const parts = filters.creditRange.split('/').join(")|(");
    query.whereRaw(`credit_score_needed  ~* '(${parts})'`)
  }

  if(sort) {
    query.orderBy(sort, 'desc');
  }


  console.log(query.toString());

  const results = await query;



    // .where('email', 'like', `${q}%`)

  return results;
};

const count = async ({ filters }) => {
  const query = knex(CARDS_TABLE)
    .count('id');

  if(filters.category) {
    query.where({ creditCardType: filters.category })
  }

  if(filters.issuer) {
    query.where({ displayName: filters.issuer })
  }

  if(filters.cardProcessor) {
    query.where({ cardProcessorTypeName: filters.cardProcessor })
  }

  if(filters.creditRange) {
    const parts = filters.creditRange.split('/').join(")|(");
    query.whereRaw(`credit_score_needed  ~* '(${parts})'`)
  }

  const results = await query;

  return results[0].count;
};

module.exports = {
  count,
  list,
  get,
};
