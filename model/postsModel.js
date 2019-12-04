let db = require('../utils/database');
let firebase = require('firebase');
const userID = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
const uuidv1 = require('uuid/v1');

// Get user profile with user ID
function getUserProfile(id){
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
function getUserPosts(id){
    let sql = `SELECT COUNT(*) AS total FROM post WHERE posterID="${userID}"`;
    return db.execute(sql).then(([Data, Metadata]) => {
        return Data[0].total;
    }).catch((error) => console.log(error));
}

// Get total messages of post(s) with user ID
function getUserMessages(id){
    let sql = `SELECT COUNT(*) AS total FROM message WHERE receiver="${userID}"`;
    return db.execute(sql).then(([Data, Metadata]) => {
        console.log(Data[0].total);
        return Data[0].total;
    }).catch((error) => console.log(error));
}

// Get latest posts by user in the database
function getPosts() {
    console.log("======= GET USER POST ======");
    return new Promise((resolve, reject) => { 
        const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        // if (!userID) {
        //     reject("USER ID UNDEFINED");
        // }
        let sql = `SELECT post.id as post_id, post.posterID AS post_posterID, post.subject AS post_subject, post.topic AS post_topic, post.detail post_detail, post.postTime post_postTime, users.imageurl users_imageURL FROM post INNER JOIN users ON post.posterID=users.ID WHERE posterID = "${userID}"ORDER BY postTime DESC`;
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
function getTotalReplies(id){
    let sql = `SELECT COUNT(replyID) FROM reply WHERE postID="${id}"`;
    return db.execute(sql);
}

// Get replies with post id
function getReplies(id){
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

function addReply(data){
    let sql = "INSERT INTO reply (comment, imageURL) VALUES ('" + data.comment + "','" + data.imageURL + "',)";
    return db.execute(sql);
}

module.exports = {
    getUserProfile: getUserProfile,
    getUserPosts: getUserPosts,
    getUserMessages: getUserMessages,
    getPosts: getPosts,
    getReplies: getReplies,
    getTotalReplies: getTotalReplies,
    addReply: addReply
}