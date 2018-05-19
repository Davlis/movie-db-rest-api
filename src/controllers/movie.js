import omdbapi from '../providers/omdbapi';

export async function list(req, res) {
  res.json('Not Implemented');
}

export async function one(req, res) {
  res.json('Not Implemented');
}

export async function create(req, res) {
  const { Movie } = req.app.get('models');
  const { title } = req.body;
  const data = await omdbapi(title);
  const movie = await Movie.create({
    title,
    data
  });
  res.json(movie);
}
