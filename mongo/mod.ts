import { MongoClient } from "https://deno.land/x/mongo@v0.31.2/mod.ts";
import "https://deno.land/std@0.190.0/dotenv/load.ts";

const simpleClient = new MongoClient();

if (
  !Deno.env.get("MONGO_DB_NAME") || !Deno.env.get("MONGO_DB_HOST") ||
  !Deno.env.get("MONGO_DB_USER") || !Deno.env.get("MONGO_DB_PASSWORD")
) {
  throw new Error(
    "Please define MONGO_DB_NAME, MONGO_DB_HOST, MONGO_DB_USER and MONGO_DB_PASSWORD in your .env file",
  );
}

const bdd = Deno.env.get("MONGO_DB_NAME");
const host = Deno.env.get("MONGO_DB_HOST");
const user = Deno.env.get("MONGO_DB_USER");
const password = Deno.env.get("MONGO_DB_PASSWORD");

const url = `mongodb://${user}:${password}@${host}:27017/?authSource=${bdd}`;

await simpleClient.connect(url);

export default simpleClient;
