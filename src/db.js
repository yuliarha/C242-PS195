const mysql = require('mysql2/promise');



const dbConfig = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'travel',
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});



module.exports = dbConfig;