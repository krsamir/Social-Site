// eslint-disable-next-line
import mysql from "mysql";

import { config } from "dotenv";
config();
const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_DB,
  DATABASE_PORT,
} = process.env;
const db = mysql.createPool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_DB,
  port: DATABASE_PORT,
});
// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("My SQL Connected.");
// });
db.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) {
    console.log(error);
  } else {
    console.log(`Database connection has been established.`);
  }
});
export default db;
