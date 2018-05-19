import { notFound } from 'boom';
import { assertOrThrow } from '../utils';

export async function list(req, res) {
  const { offset, limit } = req.query;
  const { Comment } = req.app.get('models');
  const comments = await Comment.paginate({}, { offset, limit });
  res.json(comments);
}

export async function one(req, res) {
  const { Comment } = req.app.get('models');
  const { id } = req.params;
  const comment = await Comment.findOne({ _id: id });
  assertOrThrow(comment, notFound, 'Comment not found');
  res.json(comment);
}

export async function create(req, res) {
  const { Movie, Comment } = req.app.get('models');
  const { movieId, body } = req.body;

  const movie = await Movie.findOne({ _id: movieId });
  assertOrThrow(movie, notFound, 'Movie not found');

  const comment = await Comment.create({
    movieId,
    body
  });

  res.json(comment);
}
