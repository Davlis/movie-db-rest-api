import generateConfig from '../config';
import initDatabase from '../database';

const config = generateConfig();

setup().catch(console.error);

async function setup() {
  const { connection, connect } = await initDatabase(config);
  await connect;
  await connection.db.dropDatabase();
  await connection.close();
}
