// import { updateUser } from "../../controller/logincontroller";

document.addEventListener('DOMContentLoaded', function() {

    // createUser()
    signInButton();
}, false);
var userData = []

async function getMessage(id) {
    console.log(id);
    const response = await fetch(`/getMessage/${id}`, {
        method: 'GET',
        // body: {name: nameInput.value, about: aboutInput.value, imgURL: imgInput.value},
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        console.log(data);
        return data.json();
    }).then((result) => {
        let container = document.getElementById('messageContainer');
        container.innerHTML = '';
        result.forEach((item) => {
            let msgContainer = document.createElement('div');
            msgContainer.className = 'msgContainer';

            let msgImgContainer = document.createElement('div');
            msgImgContainer.className = 'msgImgContainer';

            let img = document.createElement('img');
            img.src = item.imageURL;

            let msgBodyContainer = document.createElement('div');
            msgBodyContainer.className = 'msgBodyContainer';

            let msgNameContainer = document.createElement('div');
            msgNameContainer.className = 'msgNameContainer';

            let nameSpan = document.createElement('span');
            nameSpan.innerHTML = item.firstName + ' ' + item.lastName;

            let dateSpan = document.createElement('span');
            dateSpan.innerHTML = item.messageTime;

            let msgTextContainer = document.createElement('div');
            msgTextContainer.className = 'msgTextContainer';

            let message = document.createElement('p');
            message.innerHTML = item.message;


            msgImgContainer.appendChild(img);

            msgNameContainer.appendChild(nameSpan);
            msgNameContainer.appendChild(dateSpan);

            msgTextContainer.appendChild(message);

            msgBodyContainer.appendChild(msgNameContainer);
            msgBodyContainer.appendChild(msgTextContainer);

            msgContainer.appendChild(msgImgContainer);
            msgContainer.appendChild(msgBodyContainer);
            container.appendChild(msgContainer);

        });
    })
}

function signInButton() {

    let sendButton = document.getElementById('loginSubmit');
    sendButton.addEventListener("click", async function() {
        console.log("adfsasadf");
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
        });

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
        //use only for submitting it as a form 
    // let create = document.getElementById('submit');
    // create.addEventListener("click", async function() {

    //     let user = {
    //         fname: first_name,
    //         lname: last_name,
    //         email: email,
    //         password: password
    //     }
    //     const response = await fetch (`/createuser` , {
    //         method: 'POST',
    //         body: JSON.stringify(user),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((data) => {
    //         console.log(data)
    //     })
    // })
    localStorage.setItem("userinfo", JSON.stringify(userData))
    window.location.href = '/completeregistration'
        //prevents form from submitting twice
    // document.getElementById('signupForm').addEventListener('submit', function(e) {
    //     e.preventDefault();
    // })
}
