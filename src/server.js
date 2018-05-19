import express from 'express';
import generateConfig from './config';

const config = generateConfig();

const app = initApp(config);

app.listen(config.port, () => {
  console.log(`Server listening on port: ${config.port}`);
});

export default function initApp(config) {
  const app = express();

  app.set('config', config);

  app.get('/', (req, res) => res.send('Hello World!'));

  return app;
}
