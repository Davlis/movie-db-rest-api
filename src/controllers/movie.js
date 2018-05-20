import { notFound } from 'boom';
import { assertOrThrow } from '../utils';

export async function list(req, res) {
  const { offset, limit } = req.query;
  const { Movie } = req.app.get('models');
  const movies = await Movie.paginate({}, { offset, limit });
  res.json(movies);
}

export async function one(req, res) {
  const { Movie } = req.app.get('models');
  const { id } = req.params;
  const movie = await Movie.findOne({ _id: id });
  assertOrThrow(movie, notFound, 'Movie not found');
  res.json(movie);
}

export async function create(req, res) {
  const { Movie } = req.app.get('models');
  const { omdbapi } = req.app.get('providers');
  const { title } = req.body;
  const data = await omdbapi(title);
  const movie = await Movie.create({
    title,
    data
  });
  res.json(movie);
}
