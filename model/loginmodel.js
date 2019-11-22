let firebase = require('firebase')
    //add user to the database
function addUser(data) {
    console.log("============= CREATE USER ===============");
    firebase.auth().createUserWithEmailAndPassword('leeyongl52633@gmail.com', '12341234')
        .then((user) => {
            console.log('user:', user.user.uid);
            console.log('additionalinfo:', user.additionalUserInfo);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
}

//add data to user's profile
function addProfile(data) {

}

function login(data) {
    firebase.auth().signInWithEmailAndPassword("leeyongl5263@gmail.com", "12341234")
        .then((user) => {
            console.log("user:", user.user.uid);
            return true;
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
    createUser: addUser,
    signin: login,
    signout: signout

}