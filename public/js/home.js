document.addEventListener('DOMContentLoaded', function() {

    updateUser();
}, false);

function updateUser() {

    let update = document.getElementById('completeregistration')
    update.addEventListener("click", async function() {
        let first_name = JSON.parse(localStorage.getItem('userinfo'))[0].fname
        let last_name = JSON.parse(localStorage.getItem('userinfo'))[0].lname
        let email = JSON.parse(localStorage.getItem('userinfo'))[0].email
        let pass = JSON.parse(localStorage.getItem('userinfo'))[0].password
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
        if(empty()) {
            const response = await fetch('/home', {
                method: 'POST',
                body: JSON.stringify(userUpdate),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((data) => {
                window.location.href = '/homepage';
                localStorage.clear()
            })
        } else {
            if(!validateDate()){
                $("#dob").css("border", "2px solid #E34234");
            }
            alert("fields need to filled out")
        }

    })

}

function validateDate() {
    let dob = document.getElementById('dob').value
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ ;
    return date_regex.test(dob);
}

function empty(){
    let first_name = JSON.parse(localStorage.getItem('userinfo'))[0].fname
    let last_name = JSON.parse(localStorage.getItem('userinfo'))[0].lname
    let email = JSON.parse(localStorage.getItem('userinfo'))[0].email
    let pass = JSON.parse(localStorage.getItem('userinfo'))[0].password
    let img = document.getElementById('img').value
    let desc = document.getElementById('desc').value
    let country = document.getElementById('country').value
    let dob = document.getElementById('dob').value
    if(first_name === "" && last_name === "" && email === "" && pass === "" && img === "" && desc === ""  && country === "" && dob === "") {
        return false
    } else {
        return true
    }
}