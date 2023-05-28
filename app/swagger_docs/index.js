const { cardsPaths, cardsDefinitions } = require('./cards');

const docs = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Api',
    description: 'An API specs',
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  servers: [
    {
      url: '/',
    },
  ],
  paths: {
    ...cardsPaths,
  },
  components: {
    schemas: {
      ...cardsDefinitions,
      ConflictError: {
        title: 'ConflictError',
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      ListsMeta: {
        type: 'object',
        properties: {
          total: { type: 'number' },
          limit: { type: 'number' },
          offset: { type: 'number' },
        },
      },
      ForbiddenError: {
        title: 'ForbiddenError',
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
      RequestValidationError: {
        title: 'RequestValidationError',
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                errorCode: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      NotFound: {
        title: 'Not found',
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
    },
  },
};

module.exports = docs;
