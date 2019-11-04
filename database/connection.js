const Connection = require('tedious').Connection;

require('dotenv').config()
// Create connection to database
var config = {
    authentication: {
        options: {
            userName: process.env.DB_USER, // update me
            password: process.env.DB_PASS // update me
        },
        type: 'default'
    },
    server: process.env.DB_HOST, // update me
    options: {
        database: process.env.DB_NAME, //update me
        encrypt: true
    }
}

module.exports = new Connection(config);

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