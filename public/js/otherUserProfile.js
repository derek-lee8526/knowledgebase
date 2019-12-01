// async function getOtherUserProfileReply(id) {
//     console.log(id);
//     const response = await fetch(`/getOtherUserProfileReply/${id}`, {
//         method: 'GET',
//         // body: {name: nameInput.value, about: aboutInput.value, imgURL: imgInput.value},
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then((data) => {
//         console.log(data);
//         return data.json();
//     }).then((result) => {
//         let container = document.getElementById('otherUserProfilePostReplyContainer');
//         container.innerHTML = '';
//         result.forEach((item) => {
//             let replyContainer = document.createElement('div');
//             replyContainer.className = 'otherUserProfileReplyContainer';
  
//             let replyImgContainer = document.createElement('div');
//             replyImgContainer.className = 'otherUserProfileReplyImgContainer';
  
//             let img = document.createElement('img');
//             img.src = item.imageURL;
  
//             let replyBodyContainer = document.createElement('div');
//             replyBodyContainer.className = 'otherUserProfileReplyBodyContainer';
            
//             let replyTextContainer = document.createElement('div');
//             replyTextContainer.className = 'otherUserProfileReplyTextContainer';
  
//             let reply = document.createElement('p');
//             reply.innerHTML = item.comment;
  
//             replyImgContainer.appendChild(img);
//             replyTextContainer.appendChild(reply);
  
//             replyContainer.appendChild(replyImgContainer);
//             replyContainer.appendChild(replyTextContainer);
//             container.appendChild(replyContainer);
  
//         });
//     })
//     let container = document.getElementById('otherUserProfilePostReplyContainer');
//     let replyFormConainer = document.createElement("div");
//     replyFormConainer.className = "otherUserProfileReplyFormContainer";
  
//     let div1 = document.createElement("div");
//     div1.className = "otherUserProfileForm-control";
  
//     let replyForm = document.createElement("form");
//     replyForm.className = "otherUserProfileReplyForm";
//     replyForm.action = "/reply/add";
//     replyForm.method = "POST";
  
//     let replyInput = document.createElement("input");
//     replyInput.type = "text";
//     replyInput.className = "otherUserProfileForm-reply";
//     replyInput.name = "reply";
//     replyInput.value = "add your reply...";
  
//     let commentBtn = document.createElement("button");
//     commentBtn.className = "otherUserProfileComment-btn";
//     commentBtn.type = "submit";
//     commentBtn.innerHTML = "comment";
  
//     div1.appendChild(replyInput);
//     replyForm.appendChild(div1);
//     replyForm.appendChild(commentBtn);
  
//     replyFormConainer.appendChild(replyForm);
  
//     container.appendChild(replyFormConainer);
//     displayReplies();
//   }
  
//   function displayReplies() {
//     var x = document.getElementById("otherUserProfilePostReplyContainer");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }

async function getReply(id) {
    console.log(id);
    const response = await fetch(`/getReply/${id}`, {
        method: 'GET',
        // body: {name: nameInput.value, about: aboutInput.value, imgURL: imgInput.value},
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        console.log(data);
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
    replyForm.action = "/reply/add";
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