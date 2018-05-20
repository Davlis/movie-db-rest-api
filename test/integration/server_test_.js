import request from 'supertest';

import generateConfig from '../../src/config';
import initDatabase from '../../src/database';
import { omdbapi } from '../../src/providers';
import initApp from '../../src/server';

const config = generateConfig();
const { connection, models } = initDatabase(config);
const depedencies = { connection, models };
const providers = { omdbapi };
const app = initApp(config, depedencies, providers);

afterAll(async () => {
  await connection.close();
});

describe('Server must be defined', () => {
  it('should be exported and be instance of express', () => {
    expect(app).toBeDefined();
    expect(app.listen).toBeInstanceOf(Function);
  });

  it('should expose all dependencies to controllers', async () => {
    app.get('router').get('/test-controller-internals', (req, res) => {
      expect(app.get('config')).toBeDefined();
      expect(app.get('models')).toEqual(models);
      expect(app.get('connection')).toEqual(connection);
      expect(app.get('providers')).toBeDefined();

      res.json({ all: 'ok' });
    });

    const response = await request(app)
      .get('/test-controller-internals')
      .expect(200);

    expect(response.body).toMatchObject({ all: 'ok' });
  });

  it('should respond with proper 404 error', async () => {
    const response = await request(app)
      .get('/some-route-that-will-never-be-defined')
      .expect(404);

    const { body } = response;

    expect(body.statusCode).toEqual(404);
    expect(body.error).toEqual('Not Found');
  });
});
