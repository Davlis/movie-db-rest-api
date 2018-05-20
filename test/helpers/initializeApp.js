import generateConfig from '../../src/config';
import initDatabase from '../../src/database';
import initApp from '../../src/server';
import omdbapi from '../stubs/providers/omdbapi';

export default function initializeApp() {
  const dotenvPath = `${__dirname}/../.env`;
  const config = generateConfig(dotenvPath);

  const { connection, models, mongoose } = initDatabase(config);
  const depedencies = { connection, models };
  const providers = { omdbapi };
  const app = initApp(config, depedencies, providers);

  return {
    depedencies,
    providers,
    mongoose,
    models,
    connection,
    app
  };
}
