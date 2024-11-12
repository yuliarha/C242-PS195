const mysql = require('mysql2/promise')

const { USERNAME, PASSWORD, DATABASE } = process.env

const dbConfig = mysql.createPool({
  host: 'localhost',
  user: USERNAME,
  password: PASSWORD,
  database: DATABASE,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
})

module.exports = dbConfig
