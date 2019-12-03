let db = require('../utils/database');
let firebase = require('firebase');
const userID = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;

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

// Update user profile
function updateProfile(data){
    let sql = "UPDATE Users SET first_name='" + data.first_name + "'last_name='" + data.last_name + "'imageurl='" + data.imageurl + "'description='" + data.description + "'country='" + data.country + "'dateofbirth='" + data.dateofbirth + "' WHERE ID='"+ userID +"'";
    return db.execute(sql);
}

module.exports = {
    getUserProfile: getUserProfile,
    getUserPosts: getUserPosts,
    getUserMessages: getUserMessages,
    updateProfile: updateProfile,
}