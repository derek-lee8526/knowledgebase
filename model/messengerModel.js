let db = require('../utils/database');
let firebase = require('firebase');
const uuidv1 = require('uuid/v1');

// Get messages with user ID
function getMessage(id) {
    console.log("============ GET MESSAGE =================");
    console.log("selecteUser: ", id);

    return new Promise((resolve, reject) => {
        const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        if (!userID) {
            reject("USER ID UNDEFINED");
        }

        let newID = id.replace(/\s+/, "");

        let sql = `SELECT sender_user.ID as sender_id, sender_user.imageurl as sender_pic, sender_user.first_name as sender_fname,` +
            `sender_user.last_name as sender_lname, receiver_user.ID as receiver_id, receiver_user.imageurl as receiver_pic,` +
            `receiver_user.first_name as receiver_fname, receiver_user.last_name as receiver_lname,` +
            `sender, receiver, messageTime, message.id as msg_id, message.body as body  FROM message ` +
            `JOIN Users AS sender_user ON message.sender = sender_user.ID JOIN Users AS receiver_user ` +
            `ON message.receiver = receiver_user.ID ` +
            `WHERE (sender="${newID}" and receiver="${userID}") OR (sender="${userID}" and receiver="${newID}") ORDER BY messageTime;`

        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            }

            console.log("messages:", data);

            resolve(data);
        })
    });
}

// Get all the data of messenger
function getUserList() {
    return new Promise((resolve, reject) => {
        const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        if (!userID) {
            reject("USER ID UNDEFINED");
        }
        let sql = `SELECT sender_user.ID as sender_id, sender_user.imageurl as sender_pic, sender_user.first_name as sender_fname,` +
            `sender_user.last_name as sender_lname, receiver_user.ID as receiver_id, receiver_user.imageurl as receiver_pic,` +
            `receiver_user.first_name as receiver_fname, receiver_user.last_name as receiver_lname,` +
            `sender, receiver, messageTime FROM message INNER JOIN Users AS sender_user ON sender_user.ID = sender INNER JOIN Users as receiver_user ON receiver_user.ID = receiver WHERE (sender = "${userID}" OR receiver = "${userID}") GROUP BY sender_user.ID ORDER BY messageTime;`;

        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            }

            console.log(data);
            let result = [];
            data.forEach((user, i) => {
                console.log(new Date(user.messageTime));
                console.log("user:222", user);
                let tempUser = {}
                if (user.sender == userID) {
                    tempUser = {
                        imageurl: user.receiver_pic,
                        first_name: user.receiver_fname,
                        last_name: user.receiver_lname,
                        messageTime: new Date(user.messageTime).toDateString(),
                        uid: user.receiver_id
                    };
                } else {
                    tempUser = {
                        imageurl: user.sender_pic,
                        first_name: user.sender_fname,
                        last_name: user.sender_lname,
                        messageTime: new Date(user.messageTime).toDateString(),
                        uid: user.sender_id
                    };
                }

                result.push(tempUser);
            })
            resolve(result);
        })
    });
}

function sendMessage(data) {
    console.log("============ SEND MESSAGE =============")
    return new Promise((resolve, reject) => {
        const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        if (!userID) {
            reject("USER ID UNDEFINED");
        }
        const msgID = uuidv1();
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let sql = `INSERT INTO message (id, sender, receiver, body, messageTime) VALUES ("${msgID}","${userID}", "${data.receiver}", "${data.body}","${date}");`;
        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            }

            console.log(data);
            resolve(data);
        })
    });

}

function sendMessagePageData(id) {
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
    send: sendMessage,
    getMessage: getMessage,
    getUserList: getUserList,
    sendMessage: sendMessage,
    sendMessagePageData: sendMessagePageData
}