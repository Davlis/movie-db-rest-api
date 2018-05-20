import { notFound } from 'boom';
import { assertOrThrow } from '../utils';

export async function list(req, res) {
  const { offset, limit, sort } = req.query;
  const { Movie } = req.app.get('models');

  const movies = await Movie.paginate({}, { offset, limit, sort });

  res.json(movies);
}

export async function create(req, res) {
  const { Movie } = req.app.get('models');
  const { omdbapi } = req.app.get('providers');
  const { title } = req.body;

  const data = await omdbapi(title);
  assertOrThrow(data, notFound, 'Movie Not Found');

  const movie = await Movie.create({
    title,
    data
  });

  res.status(201).json(movie);
}

export async function one(req, res) {
  const { Movie } = req.app.get('models');
  const { id } = req.params;

  const movie = await Movie.findOne({ _id: id });
  assertOrThrow(movie, notFound, 'Movie Not Found');

  res.json(movie);
}
