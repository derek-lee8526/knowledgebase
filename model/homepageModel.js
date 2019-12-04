let db = require('../utils/database');
let firebase = require('firebase');
const userID = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
const uuidv1 = require('uuid/v1');

// Get user profile with user ID
function getUserProfile() {
    //let sql = `SELECT * FROM profile where id="${id}"`;
    // let profile = [{
    //     firstName: 'Sean',
    //     lastName: 'Williamson',
    //     imageURL: 'https://randomuser.me/api/portraits/med/men/62.jpg',
    //     description: '10 years of work experience in tech',
    //     likes: 10,
    // }]
    //return profile;
    // console.log("========== GET PROFILE DATA ===============");
    return new Promise((resolve, reject) => {
        const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        if (!userID) {
            reject("USER ID UNDEFINED");
        }
        let sql = `SELECT * FROM users where id="${userID}"`;

        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            }
            console.log(data);
            resolve(data);
        })
    });
}

// Get total number of post(s) with user ID
function getUserPosts() {
    let sql = `SELECT COUNT(*) AS total FROM post WHERE posterID="${userID}"`;
    // let posts = 3;
    // return posts;
    return db.execute(sql).then(([Data,Metadata]) => {
        console.log(Data[0].total);
        return Data[0].total;
    }).catch((error) => console.log(error));
}

// Get total messages of post(s) with user ID
function getUserMessages() {

    let sql = `SELECT COUNT(id) FROM message WHERE receiver="${userID}"`;
    // let messages = 5;
    // return messages;
    return db.execute(sql);

}

// Add post to the database
function addPost(data) {
    //let sql = `INSERT INTO post (posterID, subject, detail, topic, imgURL, replies) VALUES ('${userID}', "test", "test", "test","test", 2)`;
    //let sql = "INSERT INTO post (posterID, subject, detail, topic, imgURL, replies) VALUES ('"${userID}"','" + data.subject + "','" + data.detail + "','" + data.topic + "', 2)";
    return new Promise((resolve, reject) => {

        const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        if (!userID) {
            reject("USER ID UNDEFINED");
        }
        const posterID = uuidv1();

        let sql = `INSERT INTO post (id, posterID, subject, detail, topic, replies) VALUES ("${posterID}","${userID}","${data.subject}","${data.detail}","${data.topic}", 2)`;
        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            }
            //return db.execute(sql);
            resolve(data)
        });
    })
}

// Get posts with topic
function getPosts(topic) {
    let sql = `SELECT * FROM post WHERE topic="${topic}"`;
    return db.execute(sql);
}

// Get latest posts in the database
function getLatestPosts() {
    let sql = `SELECT * FROM post ORDER BY postTime DESC`;
    let posts = [{
        subject: 'Users setting deleted',
        detail: 'Test1',
        topic: 'nodejs',
        postTime: 'Sept 19th',
        imageURL: 'https://randomuser.me/api/portraits/med/men/62.jpg',
        replies: 1,
    },
    {
        subject: 'Users setting deleted',
        detail: 'Test2',
        topic: 'nodejs',
        postTime: 'Sept 19th',
        imageURL: 'https://randomuser.me/api/portraits/med/men/63.jpg',
        replies: 2,
    },
    {
        subject: 'Users setting deleted',
        detail: 'Test3',
        topic: 'nodejs',
        postTime: 'Sept 19th',
        imageURL: 'https://randomuser.me/api/portraits/med/men/64.jpg',
        replies: 3,
    },
    {
        subject: 'Users setting deleted',
        detail: 'Test4',
        topic: 'nodejs',
        postTime: 'Sept 19th',
        imageURL: 'https://randomuser.me/api/portraits/med/men/65.jpg',
        replies: 4,
    },
    {
        subject: 'Users setting deleted',
        detail: 'Test5',
        topic: 'nodejs',
        postTime: 'Sept 19th',
        imageURL: 'https://randomuser.me/api/portraits/med/men/66.jpg',
        replies: 5,
    },
    ];
    // return posts;
    return db.execute(sql);
}

// Get number of replies with poster id
function getTotalReplies(id) {
    let sql = `SELECT COUNT(replierID) FROM reply WHERE posterID="${id}"`;
    return db.execute(sql);
}

// Get replies with poster id
function getReplies(id) {
    let sql = `SELECT * FROM reply WHERE id="${id}"`;
    let replies = [{

        comment: 'comment test1',
        imageURL: 'https://randomuser.me/api/portraits/med/men/17.jpg',
    },
    {
        comment: 'comment test2',
        imageURL: 'https://randomuser.me/api/portraits/med/men/28.jpg',
    },
    ]
    return replies;
}

function addReply(id, data) {
    let sql = "INSERT INTO reply (posterID, replierID, comment, imageURL) VALUES (1, 2, '" + data.comment + "','" + data.imageURL + "')";
    return db.execute(sql);
}

module.exports = {
    getUserProfile: getUserProfile,
    getUserPosts: getUserPosts,
    getUserMessages: getUserMessages,
    addPost: addPost,
    getPosts: getPosts,
    getLatestPosts: getLatestPosts,
    getTotalReplies: getTotalReplies,
    getReplies: getReplies,
    addReply: addReply
}