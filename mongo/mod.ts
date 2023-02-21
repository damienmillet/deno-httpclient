import { MongoClient, ObjectId } from "./deps.ts";

if (!Deno.env.get('MONGO_DB_HOST')) { throw new Error('MONGO_DB_HOST is not defined'); }
if (!Deno.env.get('MONGO_DB_NAME')) { throw new Error('MONGO_DB_NAME is not defined'); }
if (!Deno.env.get('MONGO_USER')) { throw new Error('MONGO_USER is not defined'); }
if (!Deno.env.get('MONGO_PASSWORD')) { throw new Error('MONGO_PASSWORD is not defined'); }

const dbHost = Deno.env.get('MONGO_DB_HOST');
const dbName = Deno.env.get('MONGO_DB_NAME');

const Mongo: MongoClient = new MongoClient();

await Mongo.connect({
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

const crud = {
  async c(db: string, col: string, msg: Record<never, never>) {
    await Mongo.database(db).collection(col).insertOne(msg);
  },
  async r(db: string, col: string, param: Record<never, never>) {
    const msg = param || {};
    await Mongo.database(db).collection(col).findOne(msg);
  },
  async u(db: string, col: string, id: number, msg: Record<never, never>) {
    await Mongo.database(db).collection(col).updateOne({ id: id }, {
      $set: msg,
    });
  },
  async d(db: string, col: string, msg: Record<never, never>) {
    await Mongo.database(db).collection(col).deleteOne(msg);
  },
};

export { Mongo, ObjectId, crud };
