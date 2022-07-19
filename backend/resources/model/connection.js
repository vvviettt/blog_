import mysql from "mysql";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Vovanviet14@",
  database: "viact",
});

export default pool;
