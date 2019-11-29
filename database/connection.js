const sql = require('mssql');

require('dotenv').config()
// Create connection to database
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST, // You can use 'localhost\\instance' to connect to named instance
    database: process.env.DB_NAME,
};


module.exports = {
    Connection : new sql.ConnectionPool(config).connect(),
    sql: sql
}

// Attempt to connect and execute queries if connection goes through




// const sql = require('mssql')

// const config = {
//     user: 'volkankahraman',
//     password: '1234Root1234',
//     server: 'bookaddict.database.windows.net',
//     database: 'BookAddict',

//     options: {
//         encrypt: true
//     }
// };


// (async function () {
//     try {
//         let pool = await sql.connect(config)
//         console.log("Bağlandı")
//     } catch (err) {
//         console.log("Hata", err)
//     }
// })()

// sql.on('error', err => {
//     // ... error handler
// })