// import { updateUser } from "../../controller/logincontroller";

document.addEventListener('DOMContentLoaded', function() {

    // createUser()
    signInButton();
}, false);
var userData = []

function signInButton() {

    let sendButton = document.getElementById('loginSubmit');
    sendButton.addEventListener("click", async function() {

        let id = document.getElementById('loginEmail').nodeValue;
        let password = document.getElementById('loginPassword').nodeValue;
        let user = {
            id: id,
            password: password
        }
        const response = await fetch(`/signInUser`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            console.log(data);
            return data.json();
        }).then((user) => {
            console.log(user);
            return sessionStorage.setItem("user", JSON.stringify(user));
        }).then((user) => {
            window.location.href = "/homepage";
        })

    });

}


function createUser() {
    let first_name = document.getElementById('fname').value
    let last_name = document.getElementById('lname').value
    let email = document.getElementById('email').value
    let pass = document.getElementById('password').value

    let userinfo = {
        fname: first_name,
        lname: last_name,
        email: email,
        password: pass
    }
    userData.push(userinfo)

    localStorage.setItem("userinfo", JSON.stringify(userData))
    window.location.href = '/completeregistration'

}