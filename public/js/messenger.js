document.addEventListener('DOMContentLoaded', function() {


    sendButtonTrigger();

}, false);

let receiver = null;

async function getMessage(id) {
    console.log(id);
    receiver = id;
    // let userItem = document.getElementById(id);
    // userItem.style.backgroundColor = "lightgray";
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

function sendButtonTrigger() {

    let sendButton = document.getElementById('sendButton');
    sendButton.addEventListener("click", function() {
        let text = document.getElementById('messageBox').value;

        console.log(text);
    });

}

async function sendMessage(id) {
    let subject = document.getElementById('sendMessageSubject');
    let body = document.getElementById('sendMessagePageTextArea');
    if (receiver) {
        const response = await fetch(`/sendMessage/${receiver}`, {
            method: 'POST',
            body: {
                subject: subject.value,
                body: body.value,
                date: new Date(),
                receiver: id
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });
    }

}