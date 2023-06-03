const cardsPaths = {
  '/cards': {
    get: {
      tags: ['Cards'],
      summary: 'List cards',
      parameters: [
        {
          in: 'query',
          name: 'limit',
          schema: {
            type: 'integer',
            default: 10,
            maximum: 100,
          },
          required: false,
          description: 'Limit cards count in response',
        },
        {
          in: 'query',
          name: 'offset',
          schema: {
            type: 'integer',
            default: 0,
          },
          required: false,
          description: 'Offset',
        },
        {
          in: 'query',
          name: 'category',
          schema: {
            type: 'string',
            enum: [
              'Low Ongoing Rate', 'Cash Back', 'Travel Rewards',
              'Rewards', 'Balance Transfer', 'Gas',
              'Student', 'Small Business', '0% Intro APR',
              'No Annual Fee', 'Credit Card Deals',
              'Hotel', 'Miles',
              'Bad Credit ', 'No Foreign Transaction Fee',
              'Secured', 'Prepaid', 'Military',
              'Premium', 'Canadian', 'Fair Credit',
              'Best Cards', 'Visa', 'Mastercard',
              'Excellent Credit Needed', 'Good Credit Needed',
              'Limited Credit', 'Credit Builder',
            ]
          },
          required: false,
          description: 'Card category',
        },
        {
          in: 'query',
          name: 'issuer',
          schema: {
            type: 'string',
            enum: [
              'American Express', 'Applied Bank', 'Avant', 
              'Bank of America', 'Bilt', 'Brigit', 'Capital Bank', 
              'Capital One', 'Celtic Bank', 'Chase', 'Chime', 'Citi', 
              'Deserve', 'Discover', 'First Progress', 'Genesis Bankcard', 
              'Greenlight', 'Luxury Card', 'Marcus', 'Merrick Bank', 'Navy FCU', 
              'NetSpend', 'PenFed', 'Petal', 'Plains Commerce Bank', 'Prosper', 
              'Reliant Holdings', 'Self', 'SoFi', 'Synchrony', 'Synovus Bank', 
              'TD Bank', 'The Bank of Missouri', 'US Bank', 'Upgrade', 'Verizon', 
              'Wells Fargo'
            ]
          },
          required: false,
          description: 'Card issuer',
        },
        {
          in: 'query',
          name: 'cardProcessor',
          schema: {
            type: 'string',
            enum: [
              'Visa',
              'Mastercard',
              'Discover',
              'American Express'
            ]
          },
          required: false,
          description: 'Card processor',
        },
        {
          in: 'query',
          name: 'creditRange',
          schema: {
            type: 'string',
            enum: [
              'Excellent',
              'Good',
              'Average/Fair',
              'Poor',
              'None/Limited History',
            ],
          },
          required: false,
          description: 'Card processor',
        },
        {
          in: 'query',
          name: 'sort',
          schema: {
            type: 'string',
            enum: [
              'id',
              'rank'
            ],
            default: 'rank'
          },
          required: false,
          description: 'Sort',
        },
      ],
      responses: {
        200: {
          description: 'Cards data',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ListCards',
              },
            },
          },
        },
        400: {
          description: 'Request validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RequestValidationError',
              },
            },
          },
        },
        403: {
          description: 'Forbidden',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ForbiddenError',
              },
            },
          },
        },
        404: {
          description: 'Not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/NotFound',
              },
            },
          },
        },
      },
    },
  },
  '/cards/{id}': {
    get: {
      tags: ['Cards'],
      summary: 'Get cards data by card id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          schema: {
            type: 'integer',
          },
          required: true,
          description: 'Card id',
        },
      ],
      responses: {
        200: {
          description: 'Card data',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CardData',
              },
            },
          },
        },
        400: {
          description: 'Request validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RequestValidationError',
              },
            },
          },
        },
        403: {
          description: 'Forbidden',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ForbiddenError',
              },
            },
          },
        },
        404: {
          description: 'Not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/NotFound',
              },
            },
          },
        },
      },
    },
  },
};

const cardsDefinitions = {
  CreateCardData: {
    title: 'Card create data',
    type: 'object',
    additionalProperties: false,
    required: ['name'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
    },
  },
  ListCards: {
    title: 'List cards',
    type: 'object',
    additionalProperties: false,
    required: ['meta', 'data'],
    properties: {
      meta: {
        $ref: '#/components/schemas/ListsMeta',
      },
      data: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/CardData',
        },
      },
    },
  },
  cardBasicInfo: {
    title: 'Card basic data',
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: { type: 'integer' },
      name: { type: 'string' },
      description: { type: 'string' },
    },
  },
  CardData: {
    title: 'Card data',
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
      id: { type: 'integer' },
      serviceCardId: { type: 'integer' },
      displayName: { type: 'string' },
      cardName: { type: 'string' },
      rawLogoImageUrl: { type: 'string' },
      editorRating: { type: 'string' },
      termsAndConditionsLink: { type: 'string', nullable: true  },
      bonusMilesFull: { type: 'string', nullable: true  },
      rewardsDescriptionLong: { type: 'string', nullable: true },
      regApr: { type: 'string', nullable: true  },
      regAprType: { type: 'string', nullable: true  },
      annualFees: { type: 'string', nullable: true  },
      creditScoreNeeded: { type: 'string', nullable: true  },
      cardProcessorTypeName: { type: 'string' },
      introAprRate: { type: 'string', nullable: true  },
      introAprDuration: { type: 'string' },
      prosAndCons: { type: 'string', nullable: true },
      reviewSectionText: { type: 'string', nullable: true },
      ppcDescription: { type: 'string', nullable: true },
      lastUpdated: { type: 'string', nullable:  true }
    },
  },
};

module.exports = { cardsPaths, cardsDefinitions };
