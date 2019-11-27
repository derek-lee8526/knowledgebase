document.addEventListener('DOMContentLoaded', function() {

    updateUser();
}, false);

function updateUser() {
    let update = document.getElementById('completeregistration')
    update.addEventListener("click", async function() {
        let img = document.getElementById('img').value
        let desc = document.getElementById('desc').value
        let country = document.getElementById('country').value
        let dob = document.getElementById('dob').value
        let userUpdate = {
            img: img,
            desc: desc,
            country: country,
            dob: dob
        }
        const response = await fetch (`/home` , {
            method: 'POST',
            body: JSON.stringify(userUpdate),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            console.log(data)
        })
    })
    document.getElementById('registration').addEventListener('submit', function(e) {
        e.preventDefault();
        window.location.href = '/messenger'
    })
}