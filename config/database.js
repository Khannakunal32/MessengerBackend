const { createPool } = require("mysql");

const pool = createPool({
  port:process.env.MYSQL_PORT,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  charset : 'utf8mb4',
  
  connectionLimit: 10
});

module.exports = pool;
