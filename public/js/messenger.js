document.addEventListener('DOMContentLoaded', function() {

    sendButtonTrigger();
}, false);


let tempReceiver = null;

async function getMessage(id) {
    console.log(id);
    receiver = id;
    tempReceiver = id;

    let curUser = JSON.parse(sessionStorage.getItem("user"))[0].ID;

    console.log(curUser);
    const response = await fetch(`/getMessage/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {

        return data.json();
    }).then((result) => {

        let container = document.getElementById('messageContainer');
        container.innerHTML = '';
        let lastID = ""
        let tempDate = null;

        result.forEach((item) => {
            console.log(item);
            let newDate = new Date(item.messageTime).toDateString();
            console.log(newDate);
            console.log(tempDate);
            if (newDate !== tempDate) {
                item.newDate = true;
            }
            if (item.sender_id == curUser) {
                createSender(item);
            } else {
                createSender(item);
            }
            tempDate = newDate;
            lastID = item.msg_id;

        });
        document.getElementById(lastID).scrollIntoView({
            behavior: 'smooth'
        });


    })
}

function createSender(item) {
    let container = document.getElementById('messageContainer');
    console.log(item);
    if (item.newDate) {
        let borderDiv = document.createElement('div');
        borderDiv.className = 'separator';
        borderDiv.innerText = new Date(item.messageTime).toDateString();
        container.append(borderDiv);
    }
    let msgContainer = document.createElement('div');
    msgContainer.className = 'msgContainer';
    msgContainer.id = item.msg_id;


    let msgImgContainer = document.createElement('div');
    msgImgContainer.className = 'msgImgContainer';

    let img = document.createElement('img');
    img.src = item.sender_pic;

    let msgBodyContainer = document.createElement('div');
    msgBodyContainer.className = 'msgBodyContainer';

    let msgNameContainer = document.createElement('div');
    msgNameContainer.className = 'msgNameContainer';

    let nameSpan = document.createElement('span');
    nameSpan.innerHTML = item.sender_fname + ' ' + item.sender_lname;

    let dateSpan = document.createElement('span');
    let tempDate = new Date(item.messageTime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    dateSpan.innerHTML = tempDate;

    let msgTextContainer = document.createElement('div');
    msgTextContainer.className = 'msgTextContainer';

    let message = document.createElement('p');
    message.innerHTML = item.body;


    msgImgContainer.appendChild(img);

    msgNameContainer.appendChild(nameSpan);
    msgNameContainer.appendChild(dateSpan);

    msgTextContainer.appendChild(message);

    msgBodyContainer.appendChild(msgNameContainer);
    msgBodyContainer.appendChild(msgTextContainer);

    msgContainer.appendChild(msgImgContainer);
    msgContainer.appendChild(msgBodyContainer);
    container.appendChild(msgContainer);
}

function sendButtonTrigger() {
    console.log("sEND");
    let sendButton = document.getElementById('sendButton');
    let curTime = new Date()

    sendButton.addEventListener("click", async function() {

        let text = document.getElementById('messageBox');
        const response = await fetch(`/sendMessage`, {
            method: 'POST',
            body: JSON.stringify({
                body: text.value,
                date: curTime,
                receiver: tempReceiver
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((result) => {
            return result.json()
        }).then((data) => {
            console.log(data);
            let curUser = JSON.parse(sessionStorage.getItem("user"))[0];
            console.log(curUser);
            let newMsg = {
                body: text.value,
                messageTime: curTime,
                sender_fname: curUser.first_name,
                sender_lname: curUser.last_name,
                sender_pic: curUser.imageurl,
                msg_id: data.msg_id

            };
            createSender(newMsg);
            document.getElementById(newMsg.msg_id).scrollIntoView({
                behavior: 'smooth'
            });
            text.value = "";


        }).catch((err) => {
            console.log(err);
        });
        console.log(text);
    });


}

sendMessage = async(id) => {
    // let nameOfFunction = this[event.target.name];
    // let arg1 = event.target.getAttribute('data-arg1');
    console.log("sending message...", id)
    let subject = document.getElementById('sendMessageSubject');
    let body = document.getElementById('sendMessagePageTextArea');
    if (id) {
        const response = await fetch(`/sendMessage`, {
            method: 'POST',
            body: JSON.stringify({
                subject: subject.value,
                body: body.value,
                date: new Date(),
                receiver: id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            console.log(data);
            window.location.href = "/homepage"
        }).catch((err) => {
            console.log(err);
        });
    }

}