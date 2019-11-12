const mysql = require('mysql2')

// Default setting for DB 
// (((((  Please delete your own db setting before push)))))
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'knowledgebase',
//     password: ''
// });

const pool = mysql.createPool({
    host: 'localhost',
    user: 'brandon',
    database: 'knowledgebase',
    password: 'brandon'
});


module.exports = pool.promise();