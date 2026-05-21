import pg from "pg";
import env from "dotenv";

env.config();

const requireEnvVars = [
  "PG_USER",
  "PG_HOST",
  "PG_DATABASE",
  "PG_PORT",
  "PG_PASSWORD",
];

requireEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.log(`missing required env var: ${varName}`);
    process.exit(1);
  }
});

const db = new pg.Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect()
  .then(() => console.log("db connect"))
  .catch((err) => {
    console.log("db connet denied", err);
    process.exit(1);
  });

db.on("error", (err) => {
  console.log("db error", err);
});

export const query = (text, params) => db.query(text, params);
