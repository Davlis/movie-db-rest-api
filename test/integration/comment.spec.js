import request from 'supertest';
import { expect } from 'chai';

import initalizeApp from '../helpers/initializeApp';

const {
  mongoose,
  models,
  connection,
  app
} = initalizeApp();

const { Movie, Comment } = models;

const mocks = {};

beforeAll(async () => {
  mocks.movie = await Movie.create({ title: 'Nice-title' });
  mocks.comment = await Comment.create({ movieId: mocks.movie._id, body: 'Nice' });
});

afterAll(async () => {
  await connection.db.dropDatabase();
  await connection.close();
});

describe('GET /comments', () => {

  it('should return 200 OK', async () => {
    await request(app)
      .get('/comments')
      .expect(200);
  });

  it('should have proper response structure', async () => {
    const response = await request(app)
      .get('/comments');
    expect(response.body).to.have.all.keys('offset', 'limit', 'total', 'docs');
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
  });

  it('should return details of comment', async () => {
    const response = await request(app)
      .get(`/comments/${mocks.comment._id}`);
    expect(response.body.body).equal(mocks.comment.body);
  });

  it('should return 400 Bad request when given is not ObjectId #1', async () => {
    await request(app)
      .get(`/comments?movieId=${'123'}`)
      .expect(400);
  });

  it('should return proper documents #2', async () => {
    const response = await request(app)
      .get(`/comments?movieId=${mocks.movie._id}`);
    expect(response.body.docs[0].body).equal(mocks.comment.body);
  });

  it('should return 400 Bad request when given is not ObjectId #2', async () => {
    await request(app)
      .get(`/comments/${'123'}`)
      .expect(400);
  });

  it('should return 400 Not Found', async () => {
    const id = new mongoose.Types.ObjectId();
    await request(app)
      .get(`/comments/${id}`)
      .expect(404);
  });

  it('should return details of comment', async () => {
    const response = await request(app)
      .get(`/comments/${mocks.comment._id}`);
    expect(response.body.body).equal(mocks.comment.body);
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

  it('should return 201 CREATED', async () => {
    await request(app)
      .post('/comments')
      .send({ movieId: mocks.movie._id, body: 'Cool movie' })
      .expect(201);
  });
});
