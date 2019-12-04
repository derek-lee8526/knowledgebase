let db = require('../utils/database');
let firebase = require('firebase');
const userID = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
const uuidv1 = require('uuid/v1');

// Get user profile with user ID
function getUserProfile() {
    // console.log("========== GET PROFILE DATA ===============");
    return new Promise((resolve, reject) => {
        const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        if (!userID) {
            reject("USER ID UNDEFINED");
        }
        let sql = `SELECT * FROM Users where id="${userID}"`;

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
    return db.execute(sql).then(([Data, Metadata]) => {
        return Data[0].total;
    }).catch((error) => console.log(error));
}

// Get total messages of post(s) with user ID
function getUserMessages() {
    let sql = `SELECT COUNT(*) AS total FROM message WHERE receiver="${userID}"`;
    return db.execute(sql).then(([Data, Metadata]) => {
        console.log(Data[0].total);
        return Data[0].total;
    }).catch((error) => console.log(error));
}

// Add post to the database
function addPost(data) {
    return new Promise((resolve, reject) => {
        const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        if (!userID) {
            reject("USER ID UNDEFINED");
        }
        const posterID = uuidv1();
        let sql = `INSERT INTO post (id, posterID, subject, detail, topic) VALUES ("${posterID}","${userID}","${data.subject}","${data.detail}","${data.topic}")`;
        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            }
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
    console.log("======= GET LATEST POST ======");
    return new Promise((resolve, reject) => {
        const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        if (!userID) {
            reject("USER ID UNDEFINED");
        }
        let sql = `SELECT post.id as post_id, post.posterID AS post_posterID, post.subject AS post_subject, post.topic AS post_topic, post.detail post_detail, post.postTime post_postTime, users.imageurl users_imageURL FROM post INNER JOIN users ON post.posterID=users.ID ORDER BY postTime DESC`;
        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            }

            console.log(data);
            let result = [];
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                "July", "Aug", "Sept", "Oct", "Nov", "Dec"
            ];
            data.forEach((post, i) => {
                console.log(new Date(post.post_postTime));
                console.log("user:222", post);
                let tempPost = {}
                let tempDate = new Date(post.post_postTime);
                let date = monthNames[tempDate.getMonth()] + " " + tempDate.getDate();
                tempPost = {
                        id: post.post_id,
                        posterID: post.post_posterID,
                        subject: post.post_subject,
                        topic: post.post_topic,
                        detail: post.post_detail,
                        postTime: date,
                        imageurl: post.users_imageURL
                    };
                result.push(tempPost);
            })
            resolve(result);
        })
    });
}

// Get number of replies with post id
function getTotalReplies(id) {
    let sql = `SELECT COUNT(*) AS total FROM reply WHERE postID="${id}"`;
    //let sql = `SELECT COUNT(*) AS total FROM reply JOIN post ON reply.postID = post.id WHERE postID="${id}"`;
    return db.execute(sql).then(([Data, Metadata]) => {
        console.log(Data);
        return Data[0].total;
        
    }).catch((error) => console.log(error));
}

// Get replies with post id
function getReplies(id) {
    //let sql = `SELECT * FROM reply JOIN post ON reply.postID = post.id WHERE postID="${id}"`;
    // let replies = [{

    //     comment: 'comment test1',
    //     imageURL: 'https://randomuser.me/api/portraits/med/men/17.jpg',
    // },
    // {
    //     comment: 'comment test2',
    //     imageURL: 'https://randomuser.me/api/portraits/med/men/28.jpg',
    // },
    // ]
    //return db.execute(sql);

    console.log("======= GET LATEST POST ======");
    // return posts;
    return new Promise((resolve, reject) => {

    let sql = `SELECT * FROM reply JOIN post ON reply.postID = post.id WHERE postID="${id}"`;
        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            }
            // console.log(data);
            resolve(data);
        })
    });
}

function addReply(id, data) {
    return new Promise((resolve, reject) => {
        const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        if (!userID) {
            reject("USER ID UNDEFINED");
        }
        const replyID = uuidv1();
        let sql = `INSERT INTO reply (id, postID, replierID, comment) VALUES ("${replyID}","${id}","${userID}","${data.comment}")`;
        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data)
        });
    })
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