import express from 'express';
import generateConfig from './config';
import router from './routes';

const config = generateConfig();

const app = initApp(config);

app.listen(config.port, () => {
  console.log(`Server listening on port: ${config.port}`);
});

export default function initApp(config) {
  const app = express();

  app.set('config', config);

  app.use(router);

  app.get('/', (req, res) => res.send('Hello World!'));

  return app;
}
