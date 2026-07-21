import { Client } from "pg";

async function getnewclient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl:
      process.env.POSTGRES_SSL === "true"
        ? { rejectUnauthorized: false }
        : false,
    ca: process.env.CA_PRODUCTION || undefined,
  });

  await client.connect();
  return client;
}

async function query(queryobject, values) {
  const client = await getnewclient();
  try {
    const result = await client.query(queryobject, values);
    return result.rows;
  } catch (error) {
    throw error;
  } finally {
    await client.end(); 
  }
}

export default { query, getnewclient };
