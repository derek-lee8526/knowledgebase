let firebase = require('firebase')
let db = require('../utils/database')
let user = {};
//add user to the database
function addUser(data) {
    console.log("============= CREATE USER ===============");
    console.log(data)
    firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then((user) => {
            let sql = "Insert into Users (ID, first_name, last_name, email, password, imageurl, description, country, dateofbirth) values ('" + user.user.uid + "','" + data.fname + "','" + data.lname + "','" + data.email + "','" + data.password + "','" + data.img + "','" + data.desc + "','" + data.country + "','" + data.dob + "')";
            db.execute(sql)
            console.log('user:', user.user.uid);
            console.log('additionalinfo:', user.additionalUserInfo);
        })
        .catch(function(error) {
            // Handle Errors here.
            console.log(error)
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
}

//add data to user's profile
// function addProfile(data) {
//     let userUpdate = {
//         img: data.img,
//         desc: data.desc,
//         country: data.country,
//         dob: data.dob

//     }
//     db.execute("Update users SET imageurl = ?, description = ?, country = ?, dateofbirth = ? ORDER ID by DESC LIMIT 1", [userUpdate.img, userUpdate.desc, userUpdate.country,userUpdate.dob], function(err,result){
//         if(err) {
//             return console.log(err)
//         }
//     })
// }

async function login(data) {
    return await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then((user) => {
            console.log("user:", user.user.uid);

            return new Promise((resolve, reject) => {
                let sql = `SELECT ID,imageurl, first_name, last_name FROM Users WHERE ID = "${user.user.uid}";`;
                db.query(sql, (err, data) => {
                    if (err) {
                        reject(err);
                    }

                    console.log(data);
                    resolve(data);
                })
            });
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ...
            return false;
        });
}

function signout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        return true;
    }).catch(function(error) {
        // An error happened.
        return false;
    });


}

module.exports = {
    addUser: addUser,
    // updateUser: addProfile,
    signin: login,
    signout: signout

}