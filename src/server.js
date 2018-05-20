import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import generateConfig from './config';
import initDatabase from './database';
import { omdbapi } from './providers';
import router from './routes';

import errorHandler from './middlewares/negativeResponse';
import noRouteHandler from './middlewares/noRoute';
import swaggerInit from './middlewares/swagger';

import swaggerDocument from '../docs/swagger.json';

export default function initApp(config, depedencies, providers) {
  const app = express();

  app.set('config', config);
  app.set('router', router);
  app.set('connection', depedencies.connection);
  app.set('models', depedencies.models);

  app.set('providers', providers);

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(swaggerInit(router, '/docs', swaggerDocument));

  app.use(router);

  app.use(errorHandler);
  app.use(noRouteHandler);

  return app;
}

if (!module.parent) {
  const config = generateConfig();

  const { connection, models } = initDatabase(config);

  const depedencies = { connection, models };
  const providers = { omdbapi };

  const app = initApp(config, depedencies, providers);

  app.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`);
  });
}
