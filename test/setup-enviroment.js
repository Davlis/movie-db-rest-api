const generateConfig = require('../dist/config').default;
const initDatabase = require('../dist/database').default;

const dotenvPath = `${__dirname}/.env`;
const config = generateConfig();

setup().catch(console.error);

async function setup() {
  const { connection, connect } = await initDatabase(config);
  await connect;
  await connection.db.dropDatabase();
  await connection.close();
}
