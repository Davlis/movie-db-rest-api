import OmdbApi from 'omdb-api-pt';

const omdb = new OmdbApi({
  apiKey: process.env.OMDB_API_KEY
});

export default function searchByTitle(title) {
  return omdb.byId({
    title
  });
}
