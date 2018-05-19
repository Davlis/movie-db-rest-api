import { load as dotenvLoad } from 'dotenv';

export default function generateConfig(dotenvPath = '.env') {
  const env = dotenvLoad({ path: dotenvPath }).parsed || process.env;

  return {
    env: env.ENV || 'development',
    port: env.PORT || 3000,
    mongo: {
      url: env.MONGO_URL
    },
    omdbapi: {
      key: env.OMDB_API_KEY
    }
  };
}
