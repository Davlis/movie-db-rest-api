import { notFound } from 'boom';
import { assertOrThrow } from '../utils';

export async function list(req, res) {
  const { offset, limit, movieId } = req.query;
  const { Comment } = req.app.get('models');

  const query = {};
  if (movieId) {
    Object.assign(query, { movieId });
  }

  const comments = await Comment.paginate(query, { offset, limit });
  res.json(comments);
}

export async function create(req, res) {
  const { Movie, Comment } = req.app.get('models');
  const { movieId, body } = req.body;

  const movie = await Movie.findOne({ _id: movieId });
  assertOrThrow(movie, notFound, 'Movie Not Found');

  const comment = await Comment.create({
    movieId,
    body
  });

  res.status(201).json(comment);
}

export async function one(req, res) {
  const { Comment } = req.app.get('models');
  const { id } = req.params;

  const comment = await Comment.findOne({ _id: id });
  assertOrThrow(comment, notFound, 'Comment Not Found');

  res.json(comment);
}
