import OmdbApi from 'omdb-api-pt';
import getConfig from '../config';

const omdb = new OmdbApi({
  apiKey: getConfig().omdbapi.key
});

export default async function searchByTitle(title) {
  const data = await omdb.byId({
    title
  });
  if (data.Error) {
    return {};
  }
  return data;
}
