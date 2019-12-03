let db = require('../utils/database');
let firebase = require('firebase');
const uuidv1 = require('uuid/v1');

function getSearch(topic) {
    console.log("=========== GET SEARCH MODEL ==========");

    return new Promise((resolve, reject) => {
        const userID = (firebase.auth().currentUser) ? firebase.auth().currentUser.uid : null;
        if (!userID) {
            reject("USER ID UNDEFINED");
        }
        console.log(topic);
        let sql = `SELECT * FROM post WHERE topic LIKE "${topic}";`;
        db.query(sql, (err, data) => {
            if (err) {
                reject(err);
            }

            console.log("post:", data);
            resolve(data);
        })
    });

}

module.exports = {
    getSearch: getSearch,
}