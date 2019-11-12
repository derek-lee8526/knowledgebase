let db = require('../utils/database');

// Send messages with ID
function sendMessage(id) {

}

// Get messages with user ID
function getMessage(id) {

}

// Get the list of users
function getList() {

}

// Get all the data of messenger
function getAllMsgData() {
    let data = [{
        firstName: 'bran',
        lastName: 'Lee',
        lastMsg: 'Test',
        lastMsgDate: 'Sept 19th',
        imageURL: 'https://randomuser.me/api/portraits/med/men/65.jpg'

    }];

    return data;
}


module.exports = {
    send: sendMessage,
    getMessage: getMessage,
    getList: getList,
    getAllMsgData: getAllMsgData
}