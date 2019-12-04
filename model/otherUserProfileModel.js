let db = require('../utils/database');
let firebase = require('firebase');
// Get user profile with user ID
function getOtherUserProfile(id) {
    console.log("================ GET OTHER USER PROFILE ===========")
    console.log("id:", id);

    return new Promise((resolve, reject) => {
        // const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        // if (!userID) {
        //     reject("USER ID UNDEFINED");
        // }
        let sql = `SELECT * FROM Users WHERE ID = "${id}";`;
        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            }

            console.log("user:", data);
            resolve(data);
        })
    });
    // return new Promise((resolve, reject) => {
    //     const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
    //     if (!userID) {
    //         reject("USER ID UNDEFINED");
    //     }
    //     let sql = 'SELECT * FROM Users';
    //     db.query(sql, (err, data) => {
    //         if (err) {
    //             reject(err);
    //         }

    //         console.log(data);
    //         let result = [];
    //         const monthNames =[];
    //         data.forEach((user, i) => {
                
    //         })
    //         resolve(result);
    //     })
    // });
    // let profile = [{
    //     firstName: 'Sean',
    //     lastName: 'Williamson',
    //     imageURL: 'https://randomuser.me/api/portraits/med/men/62.jpg',
    //     description: '10 years of work experience in tech',
    //     country: 'canada',
    //     likes: 10,
    //     ID: 'WBd4BBU2aOa26bJalenrZnW6Nh42'
    // }]
    // return profile;
}

// Get total number of post(s) with user ID
function getOtherUserPosts(id) {
    let sql = `SELECT COUNT(*) AS total FROM post WHERE posterID="${id}"`;
    return db.execute(sql).then(([Data, Metadata]) => {
        return Data[0].total;
    }).catch((error) => console.log(error));
}

// Get total messages of post(s) with user ID
// function getUserMessages(id){
//     let messages = 5;
//     return messages;
// }

// Add post to the database
// function addPost(data) {

// }

// Get posts with topic
// function getPosts(topic){

// }

// Get latest 5 posts in the database
function getOtherUserLatestPosts() {
    // let posts = [{
    //         subject: 'Users setting deleted',
    //         detail: 'Test1',
    //         topic: 'nodejs',
    //         postTime: 'Sept 19th',
    //         imageURL: 'https://randomuser.me/api/portraits/med/men/62.jpg',
    //         replies: 1,
    //     },
    //     {
    //         subject: 'Users setting deleted',
    //         detail: 'Test2',
    //         topic: 'nodejs',
    //         postTime: 'Sept 19th',
    //         imageURL: 'https://randomuser.me/api/portraits/med/men/63.jpg',
    //         replies: 2,
    //     },
    //     {
    //         subject: 'Users setting deleted',
    //         detail: 'Test3',
    //         topic: 'nodejs',
    //         postTime: 'Sept 19th',
    //         imageURL: 'https://randomuser.me/api/portraits/med/men/64.jpg',
    //         replies: 3,
    //     },
    //     {
    //         subject: 'Users setting deleted',
    //         detail: 'Test4',
    //         topic: 'nodejs',
    //         postTime: 'Sept 19th',
    //         imageURL: 'https://randomuser.me/api/portraits/med/men/65.jpg',
    //         replies: 4,
    //     },
    //     {
    //         subject: 'Users setting deleted',
    //         detail: 'Test5',
    //         topic: 'nodejs',
    //         postTime: 'Sept 19th',
    //         imageURL: 'https://randomuser.me/api/portraits/med/men/66.jpg',
    //         replies: 5,
    //     },
    // ];
    // return posts;
    console.log("============ GET LATEST POSTS =================");
    //console.log("selecteUser: ", id);

    return new Promise((resolve, reject) => {
        const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        if (!userID) {
            reject("USER ID UNDEFINED");
        }

        //let newID = id.replace(/\s+/, "");

        let sql = 'SELECT * FROM post'

        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            }

            console.log("messages:", data);

            resolve(data);
        })
    });
}

// Get replies with post id
function getOtherUserReplies(id) {
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

// function addReply(data){

// }

function otherSendMessagePageData(id) {
    console.log("=========== SEND MESSAGE PAGE ==========");

    console.log("id:", id);

    return new Promise((resolve, reject) => {
        const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        if (!userID) {
            reject("USER ID UNDEFINED");
        }
        let sql = `SELECT * FROM Users WHERE ID = "${id}";`;
        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            }

            console.log("user:", data);
            resolve(data[0]);
        })
    });

}

module.exports = {
    getOtherUserProfile: getOtherUserProfile,
    getOtherUserPosts: getOtherUserPosts,
    // getUserMessages: getUserMessages,
    //addPost: addPost,
    //getPosts: getPosts,
    getOtherUserLatestPosts: getOtherUserLatestPosts,
    getOtherUserReplies: getOtherUserReplies,
    //addReply: addReply
    getotherSendMessagePageData: otherSendMessagePageData
}