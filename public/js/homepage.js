var current_page = 1;
var records_per_page = 2;
var objJson = [];

function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

async function getPosts() {
    const response = await fetch(`/getPosts/`, {
        method: 'GET',
        // body: {name: nameInput.value, about: aboutInput.value, imgURL: imgInput.value},
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        // console.log(data);
        return data.json();
    }).then((result) => {
        objJson = result;
        console.log("==========objectJSON==============")
        console.log(objJson)
            // let container = document.getElementById('postsContainer');
            // container.innerHTML = '';
            // result.forEach((item) => {
            //     let postContainer = document.createElement('div');
            //     postContainer.className = 'replyContainer';

        //     let postImgContainer = document.createElement('div');
        //     postImgContainer.className = 'replyImgContainer';

        //     let img = document.createElement('img');
        //     img.src = item.imageURL;

        //     // let replyBodyContainer = document.createElement('div');
        //     // replyBodyContainer.className = 'replyBodyContainer';

        //     // let replyTextContainer = document.createElement('div');
        //     // replyTextContainer.className = 'replyTextContainer';

        //     // let reply = document.createElement('p');
        //     // reply.innerHTML = item.comment;

        //     postImgContainer.appendChild(img);
        //     // replyTextContainer.appendChild(reply);

        //     postContainer.appendChild(postImgContainer);
        //     // replyContainer.appendChild(replyTextContainer);
        //     container.appendChild(postContainer);

        // });
    });
}

function changePage(page) {
    getPosts();
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("postsContainer");
    //var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    //listing_table.innerHTML = "";
    console.log(objJson[i].subject);
    for (var i = (page - 1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
        listing_table.innerHTML += objJson[i].subject + "<br>";
    }
    // page_span.innerHTML = page + "/" + numPages();

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages() {
    return Math.ceil(objJson.length / records_per_page);
}

async function getReply(id) {
    //console.log(id);
    const response = await fetch(`/getReply/${id}`, {
        method: 'GET',
        // body: {name: nameInput.value, about: aboutInput.value, imgURL: imgInput.value},
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        //console.log(data);
        return data.json();
    }).then((result) => {
        let container = document.getElementById('postReplyContainer');
        container.innerHTML = '';
        result.forEach((item) => {
            let replyContainer = document.createElement('div');
            replyContainer.className = 'replyContainer';

            let replyImgContainer = document.createElement('div');
            replyImgContainer.className = 'replyImgContainer';

            let img = document.createElement('img');
            img.src = item.imageURL;

            let replyBodyContainer = document.createElement('div');
            replyBodyContainer.className = 'replyBodyContainer';

            let replyTextContainer = document.createElement('div');
            replyTextContainer.className = 'replyTextContainer';

            let reply = document.createElement('p');
            reply.innerHTML = item.comment;

            replyImgContainer.appendChild(img);
            replyTextContainer.appendChild(reply);

            replyContainer.appendChild(replyImgContainer);
            replyContainer.appendChild(replyTextContainer);
            container.appendChild(replyContainer);

        });
    })
    let container = document.getElementById('postReplyContainer');
    let replyFormConainer = document.createElement("div");
    replyFormConainer.className = "replyFormContainer";

    let div1 = document.createElement("div");
    div1.className = "form-control";

    let replyForm = document.createElement("form");
    replyForm.className = "replyForm";
    replyForm.action = "/homepage/addReply";
    replyForm.method = "POST";

    let replyInput = document.createElement("input");
    replyInput.type = "text";
    replyInput.className = "form-reply";
    replyInput.name = "reply";
    replyInput.value = "add your reply...";

    let commentBtn = document.createElement("button");
    commentBtn.className = "comment-btn";
    commentBtn.type = "submit";
    commentBtn.innerHTML = "comment";

    div1.appendChild(replyInput);
    replyForm.appendChild(div1);
    replyForm.appendChild(commentBtn);

    replyFormConainer.appendChild(replyForm);

    container.appendChild(replyFormConainer);
    displayReplies();
}

function displayReplies() {
    var x = document.getElementById("postReplyContainer");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

window.onload = function() {
    changePage(1);
    //console.log(this.objJson);
}