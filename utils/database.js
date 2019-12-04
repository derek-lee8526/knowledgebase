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
    host: "192.168.64.2",
    user: 'brandon',
    database: 'knowledgebase',
    password: 'brandon',
    connectTimeout: 30000
});

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

pool.query('SHOW TABLES LIKE "post"', (error, results) => {
    if (error) {
        return console.log(error);
    }

    if (results.length <= 0) {
        console.log('success', results);
        pool.query('CREATE TABLE post ' +
            '(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,' +
            'posterID VARCHAR(30) NOT NULL, ' +
            'subject VARCHAR(30) NOT NULL, ' +
            'detail VARCHAR(50),' +
            'topic VARCHAR(10),' +
            'imgURL VARCHAR(10),' +
            'replies INT,' +
            'postTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)', (err, result) => {
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