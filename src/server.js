import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import generateConfig from './config';
import initDatabase from './database';
import router from './routes';

import errorHandler from './middlewares/negativeResponse';
import noRouteHandler from './middlewares/noRoute';

const config = generateConfig();

const { connection, models } = initDatabase(config);
const depedencies = { connection, models };

const app = initApp(config, depedencies);

app.listen(config.port, () => {
  console.log(`Server listening on port: ${config.port}`);
});

export default function initApp(config, depedencies) {
  const app = express();

  app.set('config', config);
  app.set('connection', depedencies.connection);
  app.set('models', depedencies.models);

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(router);

  app.use(errorHandler);
  app.use(noRouteHandler);

  return app;
}
