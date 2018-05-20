import request from 'supertest';
import { expect } from 'chai';

import generateConfig from '../../src/config';
import initDatabase from '../../src/database';
import initApp from '../../src/server';

import omdbapi from '../stubs/providers/omdbapi';

const config = generateConfig();
const { connection, models, mongoose } = initDatabase(config);
const depedencies = { connection, models };
const providers = { omdbapi };
const app = initApp(config, depedencies, providers);

const { Movie } = models;

const mocks = {};

beforeAll(async () => {
  const titles = ['ABC', 'DEF'];
  mocks.movies = await Promise.all(titles.map(title => Movie.create({ title })));
});

afterAll(async () => {
  connection.close();
});

describe('GET /movies', () => {
  it('should return 200 OK', async () => {
    await request(app)
      .get('/movies')
      .expect(200);
  });

  it('should have proper response structure', async () => {
    const response = await request(app)
      .get('/movies');
    expect(response.body).to.have.all.keys('offset', 'limit', 'total', 'docs');
  });

  it('should have proper default offset and limit', async () => {
    const response = await request(app)
      .get('/movies');
    expect(response.body.offset).equal(0);
    expect(response.body.limit).equal(20);
  });

  it('should return proper total', async () => {
    const response = await request(app)
      .get('/movies');
    expect(response.body.total).equal(mocks.movies.length);
  });

  it('should return proper documents', async () => {
    const response = await request(app)
      .get('/movies');
    expect(response.body.docs).to.have.length(2);
  });

  it('should return 400 Bad Request when given id not ObjectId', async () => {
    await request(app)
      .get(`/movies/${'123'}`)
      .expect(400);
  });

  it('should return 404 Not Found', async () => {
    const id = new mongoose.Types.ObjectId();
    await request(app)
      .get(`/movies/${id}`)
      .expect(404);
  });

  it('should return details of movie', async () => {
    const response = await request(app)
      .get(`/movies/${mocks.movies[0]._id}`);
    expect(response.body.title).equal(mocks.movies[0].title);
  });
});

describe('POST /movies', () => {
  it('should return 400 Bad request #1', async () => {
    await request(app)
      .post('/movies')
      .send({})
      .expect(400);
  });

  it('should return 200 OK', async () => {
    await request(app)
      .post('/movies')
      .send({ title: 'Somemoooooovie' })
      .expect(200);
  });

  it('should return object with title', async () => {
    const response = await request(app)
      .post('/movies')
      .send({ title: 'Custom' });
    expect(response.body.title).equal('Custom');
  });

  it('should return object without additional data', async () => {
    const response = await request(app)
      .post('/movies')
      .send({ title: 'Qweq' });
    expect(response.body.data).equal(null);
  });

  it('should return object with additional data', async () => {
    const response = await request(app)
      .post('/movies')
      .send({ title: 'Titanic' });
    expect(response.body.data).deep.equal(await omdbapi('Titanic'));
  });
});
