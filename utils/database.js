const mysql = require('mysql2')

// Default setting for DB 
// (((((  Please delete your own db setting before push)))))
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'knowledgebase',
    password: ''
});

// const pool = mysql.createPool({
//     host: "192.168.64.2",
//     user: 'brandon',
//     database: 'knowledgebase',
//     password: 'brandon',
//     connectTimeout: 30000
// });

pool.query('SHOW TABLES LIKE "message"', (error, results) => {
    if (error) {
        return console.log(error);
    }

    if (results.length <= 0) {
        console.log('success', results);
        pool.query('CREATE TABLE message ' +
            '(id VARCHAR(50) PRIMARY KEY,' +
            'sender VARCHAR(30) NOT NULL, ' +
            'receiver VARCHAR(30) NOT NULL, ' +
            'body VARCHAR(50),' +
            'messageTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)', (err, result) => {
                if (err) {
                    return console.log(err);
                }
                console.log(result);
            });
    } else if (results) {
        console.log(results);
    }

});

module.exports = pool.promise();