import request from 'supertest';

import generateConfig from '../../src/config';
import initDatabase from '../../src/database';
import initApp from '../../src/server';

import omdbapi from '../stubs/providers/omdbapi';

const config = generateConfig();
const { connection, models } = initDatabase(config);
const depedencies = { connection, models };
const providers = { omdbapi };
const app = initApp(config, depedencies, providers);

beforeAll(async () => {
});

afterAll(async () => {
  connection.close();
});

describe('GET /comments', () => {
  it('should return 200', async () => {
    await request(app)
      .get('/comments')
      .expect(200);
  });
});

describe('POST /comments', () => {
  it('should be true', () => {
    expect(true).toBe(true);
  });
});
