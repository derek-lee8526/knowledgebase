let otherUserProfileModel = require('../model/otherUserProfileModel');

exports.getOtherUserData = async (req, res, next) => {
    let userData = await otherUserProfileModel.getOtherUserProfile(req.params.id);
    let userPosts = otherUserProfileModel.getOtherUserPosts(req.params.id);
    console.log("asddsad",userData)
    // let userData = otherUserProfileModel.getOtherUserProfile(req.query.id);
    // let userPosts = otherUserProfileModel.getOtherUserPosts(req.query.id);
    // let userMessages = homepageModel.getUserMessages(req.query.id);
    let postData = otherUserProfileModel.getOtherUserLatestPosts();
    let postReplies = otherUserProfileModel.getOtherUserReplies(req.params.id);
    console.log(userPosts)
        // res.render('homepage', {userProfile: userData, userPosts: userPosts, userMessages: userMessages, latestPosts: postData, postReplies: postReplies, homepageCSS: true})
        //i need to change 'homepage'.
    res.render('otherUserProfile', { loggedin: true, userID: userData.ID, otherUserProfile: userData, otherUserPosts: userPosts, otherUserLatestPosts: postData, otheruserPostReplies: postReplies, otherUserProfileCSS: true })
}

// exports.postAddPost = (req,res,next) => {
//     let p_subject = req.body.subject;
//     let p_detail = req.body.detail;
//     let p_topic = req.body.topic;

//     let pOject = {
//        subject: p_subject,
//        detail: p_detail,
//        topic: p_topic,
//        //postTime: 
//     }

//     peopleModel.add(pOject);
//     res.redirect(301, '/homepage');
// }

// exports.postAddReply = (req,res,next) => {
//     let p_comment = req.body.comment;

//     let pOject = {
//        subject: p_comment,
//        //postTime: 
//     }

//     peopleModel.add(pOject);

//     // i need to change 'homepage' here.
//     res.redirect(301, '/homepage');
// }

exports.getOtherUserReplies = (req, res, next) => {
    console.log(req.query.id);
    let replyData = otherUserProfileModel.getOtherUserReplies(req.query.id);

    res.send(JSON.stringify(replyData));
}

exports.otherSendMessagePage = (req, res, next) => {
    console.log("queryid:", req.params.id);
    let receiverData = otherUserProfileModel.otherSendMessagePageData(req.params.id);
    console.log("lets see the receiverdata");
    console.log(receiverData);
    // receiverData.then((data) => {
    //     res.render("sendMessage", { receiver: data, sendMessageCSS: true, loggedin: true })
    // }).catch((err) => {
    //     if (err == "USER ID UNDEFINED") {
    //         res.redirect('/')
    //     }
    //     alert("An error occurred. Please try again later...");
    // });

}