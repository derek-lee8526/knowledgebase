let db = require('../utils/database');

// Get user profile with user ID
function getUserProfile(id){
    let sql = `SELECT * FROM profile where id="${id}"`;
    let profile = [{
        firstName: 'Sean',
        lastName: 'Williamson',
        imageURL: 'https://randomuser.me/api/portraits/med/men/62.jpg',
        description: '10 years of work experience in tech',
        likes: 10,
    }]
    return profile;
}

// Get total number of post(s) with user ID
function getUserPosts(id){
    let sql = `SELECT COUNT(postID) FROM post WHERE posterID="${id}"`;
    let posts = 3;
    return posts;
}

// Get total messages of post(s) with user ID
function getUserMessages(id){
    let sql = `SELECT COUNT(messageID) FROM message WHERE receiver="${id}"`;
    let messages = 5;
    return messages;
}

// Get latest posts by user in the database
function getPosts(id) {
    let sql = `SELECT * FROM post WHERE posterID="${id}" ORDER BY postTime DESC`;
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
            imageURL: 'https://randomuser.me/api/portraits/med/men/62.jpg',
            replies: 2,
        },
        {
            subject: 'Users setting deleted',
            detail: 'Test3',
            topic: 'nodejs',
            postTime: 'Sept 19th',
            imageURL: 'https://randomuser.me/api/portraits/med/men/62.jpg',
            replies: 3,
        },
        {
            subject: 'Users setting deleted',
            detail: 'Test4',
            topic: 'nodejs',
            postTime: 'Sept 19th',
            imageURL: 'https://randomuser.me/api/portraits/med/men/62.jpg',
            replies: 4,
        },
        {
            subject: 'Users setting deleted',
            detail: 'Test5',
            topic: 'nodejs',
            postTime: 'Sept 19th',
            imageURL: 'https://randomuser.me/api/portraits/med/men/62.jpg',
            replies: 5,
        },
    ];
    return posts;
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