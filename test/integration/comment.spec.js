import request from 'supertest';
import { expect } from 'chai';

import generateConfig from '../../src/config';
import initDatabase from '../../src/database';
import initApp from '../../src/server';

import omdbapi from '../stubs/providers/omdbapi';

const config = generateConfig();
const { connection, models } = initDatabase(config);
const depedencies = { connection, models };
const providers = { omdbapi };
const app = initApp(config, depedencies, providers);

const { Movie, Comment } = models;

const mocks = {};

beforeAll(async () => {
  mocks.movie = await Movie.create({ title: 'Nice-title' });
  mocks.comment = await Comment.create({ movieId: mocks.movie._id, body: 'Nice' });
});

afterAll(async () => {
  connection.close();
});

describe('GET /comments', () => {
  it('should return 200 OK', async () => {
    await request(app)
      .get('/comments')
      .expect(200);
  });
  it('should have proper default offset and limit', async () => {
    const response = await request(app)
      .get('/comments');
    expect(response.body.offset).equal(0);
    expect(response.body.limit).equal(20);
  });
  it('should return proper total', async () => {
    const response = await request(app)
      .get('/comments');
    expect(response.body.total).equal(1);
  });

  it('should return proper documents #1', async () => {
    const response = await request(app)
      .get('/comments');
    expect(response.body.docs[0].body).equal(mocks.comment.body);
    expect(response.body.docs[0].movieId).equal(mocks.comment.movieId);
  });

  it('should return proper documents #2', async () => {
    const response = await request(app)
      .get(`/comments?movieId=${mocks.movie._id}`);
    expect(response.body.docs[0].body).equal(mocks.comment.body);
    expect(response.body.docs[0].movieId).equal(mocks.comment.movieId);
  });
});

describe('POST /comments', () => {
  it('should return 400 Bad request #1', async () => {
    await request(app)
      .post('/comments')
      .send({ movieId: mocks.movie._id })
      .expect(400);
  });
  it('should return 400 Bad request #2', async () => {
    await request(app)
      .post('/comments')
      .send({ body: 'Cool movie' })
      .expect(400);
  });
  it('should return 200 OK', async () => {
    await request(app)
      .post('/comments')
      .send({ movieId: mocks.movie._id, body: 'Cool movie' })
      .expect(200);
  });
});
