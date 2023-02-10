import { MongoClient } from "./deps.ts";

if (!Deno.env.get('MONGO_DB_HOST')) { throw new Error('MONGO_DB_HOST is not defined'); }
if (!Deno.env.get('MONGO_DB_NAME')) { throw new Error('MONGO_DB_NAME is not defined'); }
if (!Deno.env.get('MONGO_USER')) { throw new Error('MONGO_USER is not defined'); }
if (!Deno.env.get('MONGO_PASSWORD')) { throw new Error('MONGO_PASSWORD is not defined'); }

const dbHost = Deno.env.get('MONGO_DB_HOST');
const dbName = Deno.env.get('MONGO_DB_NAME');

const client: MongoClient = new MongoClient();

await client.connect({
  db: dbName as string,
  tls: false,
  servers: [
    {
      host: dbHost as string,
      port: 27017,
    },
  ],
  credential: {
    username: Deno.env.get('MONGO_USER'),
    password: Deno.env.get('MONGO_PASSWORD'),
    db: dbName,
    mechanism: "SCRAM-SHA-1",
  },
});

export { client };
