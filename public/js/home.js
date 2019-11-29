document.addEventListener('DOMContentLoaded', function () {

    updateUser();
}, false);

function updateUser() {


    let update = document.getElementById('completeregistration')
    update.addEventListener("click", async function () {
        let first_name = JSON.parse(localStorage.getItem('userinfo'))[0].fname
        let last_name = JSON.parse(localStorage.getItem('userinfo'))[0].lname
        let email = JSON.parse(localStorage.getItem('userinfo'))[0].email
        let pass = JSON.parse(localStorage.getItem('userinfo'))[0].password
        console.log(email);
        let img = document.getElementById('img').value
        let desc = document.getElementById('desc').value
        let country = document.getElementById('country').value
        let dob = document.getElementById('dob').value
        let userUpdate = {
            fname: first_name,
            lname: last_name,
            email: email,
            password: pass,
            img: img,
            desc: desc,
            country: country,
            dob: dob
        }
        const response = await fetch('/home', {
            method: 'POST',
            body: JSON.stringify(userUpdate),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            console.log(data)
            document.getElementById('registration').addEventListener('submit', function (e) {
                e.preventDefault();
                window.location.href = '/home'
                // localStorage.clear()
            })
        })
    })
   
}