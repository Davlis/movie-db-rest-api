import request from 'supertest';
import { expect } from 'chai';

import initalizeApp from '../helpers/initializeApp';

const {
  mongoose,
  models,
  connection,
  providers,
  app
} = initalizeApp();

const { Movie } = models;
const { omdbapi } = providers;

const mocks = {};

beforeAll(async () => {
  const titles = ['xxx', 'b'];
  mocks.movies = await Promise.all(titles.map(title => Movie.create({ title })));
});

afterAll(async () => {
  await connection.db.dropDatabase();
  await connection.close();
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

  it('should return 201 CREATED', async () => {
    await request(app)
      .post('/movies')
      .send({ title: 'The Green Mile' })
      .expect(201);
  });

  it('should return object with title', async () => {
    const response = await request(app)
      .post('/movies')
      .send({ title: 'Shrek' });
    expect(response.body.title).equal('Shrek');
  });

  it('should return 404 NOT FOUND when couldnt fetch movie information', async () => {
    await request(app)
      .post('/movies')
      .send({ title: 'Qweq' })
      .expect(404);
  });

  it('should return object with additional data', async () => {
    const response = await request(app)
      .post('/movies')
      .send({ title: 'Titanic' });
    expect(response.body.data).deep.equal(await omdbapi('Titanic'));
  });
});
