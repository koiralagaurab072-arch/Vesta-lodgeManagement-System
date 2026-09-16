const mysql = require('mysql2');

const dbConfig = {
    host: "localhost",
    user: 'root',
    password: ""
}

const conn = mysql.createConnection(dbConfig)
conn.query("CREATE DATABASE IF NOT EXISTS Vesta", (err) => {
    if (err) {
        console.log("Database creation Failed", err);
        return;
    }
    console.log("Database created sucessfully");
    conn.end();
})

const db = mysql.createPool({
    ...dbConfig,
    database: "Vesta"
})
module.exports = db;