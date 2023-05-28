const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');
const OpenApiValidator = require('express-openapi-validator');
const express = require('express');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');

const logger = require('./app/lib/logger');
const swaggerDocument = require('./app/swagger_docs');
const routes = require('./app/routes');

const port = process.env.PORT || 3000;

const swaggerOptions = {
  swaggerOptions: {
    docExpansion: 'none',
  },
};

(async () => {
  const app = express();

  // app.use(helmet());

  app.use(express.static('public', {
    setHeaders: (res) => {
      res.set('Cross-Origin-Opener-Policy', 'same-origin');
      res.set('Cross-Origin-Embedder-Policy', 'require-corp');
    },
  }));

  app.use(express.static('/api-docs', {
    setHeaders: (res) => {
      res.set('Cross-Origin-Opener-Policy', 'same-origin');
      res.set('Cross-Origin-Embedder-Policy', 'require-corp');
    },
  }));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(cors({
    origin(origin, callback) {
      callback(null, true);
    },
  }));

  app.use(express.text());

  app.use(
    OpenApiValidator.middleware({
      apiSpec: swaggerDocument,
      validateRequests: true,
      validateResponses: true,
    }),
  );

  app.use('/', routes);

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const error = {
      message: err.message,
    };
    if (err.errors) {
      error.errors = err.errors;
    }
    logger.error({ err });
    res.status(err.status || 500).json(error);
  });

  app.listen(port, () => {
    logger.info(`Started listening port: ${port}`);
  });
})();
