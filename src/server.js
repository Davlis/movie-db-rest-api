import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import generateConfig from './config';
import router from './routes';
import errorHandler from './middlewares/negativeResponse';

const config = generateConfig();

const app = initApp(config);

app.listen(config.port, () => {
  console.log(`Server listening on port: ${config.port}`);
});

export default function initApp(config) {
  const app = express();

  app.set('config', config);

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(router);
  app.use(errorHandler);

  return app;
}
