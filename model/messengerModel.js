let db = require('../utils/database');

// Send messages with ID
function sendMessage(id) {

}

// Get messages with user ID
function getMessage(id) {
    console.log(id);
    let sql = `SELECT * FROM message WHERE sender="${id}" AND receiver="${id}"`;
    let messages = [{
            firstName: 'bran',
            lastName: 'Lee',
            message: 'Test',
            messageTime: 'Sept 19th',
            imageURL: 'https://randomuser.me/api/portraits/med/men/62.jpg'
        },
        {
            firstName: 'bran',
            lastName: 'Lee',
            message: 'Test',
            messageTime: 'Sept 19th',
            imageURL: 'https://randomuser.me/api/portraits/med/men/62.jpg'
        },
        {
            firstName: 'bran2',
            lastName: 'Lee',
            message: 'Test',
            messageTime: 'Sept 19th',
            imageURL: 'https://randomuser.me/api/portraits/med/men/62.jpg'
        },

    ];
    return messages;
}

// Get the list of users
function getList() {

}

// Get all the data of messenger
function getUserList() {
    let data = [{
            id: 1,
            firstName: 'bran',
            lastName: 'Lee',
            lastMsg: 'Test',
            lastMsgDate: 'Sept 19th',
            imageURL: 'https://randomuser.me/api/portraits/med/men/65.jpg'

        },
        {
            id: 2,
            firstName: 'bran2',
            lastName: 'Lee',
            lastMsg: 'Test',
            lastMsgDate: 'Sept 19th',
            imageURL: 'https://randomuser.me/api/portraits/med/men/65.jpg'

        },
    ];

    return data;
}

function sendMessage(data) {


    let result = db.execute(
        'INSERT INTO table_name (id, sender, receiver, body, messageTime) VALUES (1, test1, test2, "testbody", "sept 1st 2019");');

    return result;
}

function sendMessagePageData(id) {
    let user = {
        id: 2,
        firstName: 'bran2',
        lastName: 'Lee',
        lastMsg: 'Test',
        lastMsgDate: 'Sept 19th',
        imageURL: 'https://randomuser.me/api/portraits/med/men/65.jpg'

    };
    return user;
}

module.exports = {
    send: sendMessage,
    getMessage: getMessage,
    getList: getList,
    getUserList: getUserList,
    sendMessage: sendMessage,
    sendMessagePageData: sendMessagePageData
}