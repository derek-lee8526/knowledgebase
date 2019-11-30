let homepageModel = require('../model/homepageModel');

// get data for profile
exports.getHomepageData = (req, res, next) => {
    let userData = homepageModel.getUserProfile(req.query.id);
    let userPosts = homepageModel.getUserPosts(req.query.id);
    let userMessages = homepageModel.getUserMessages(req.query.id);
    let postData = homepageModel.getLatestPosts();
    let postReplies = homepageModel.getReplies(req.query.id);
    console.log(userPosts)
    res.render('homepage', {userProfile: userData, userPosts: userPosts, userMessages: userMessages, latestPosts: postData, postReplies: postReplies, homepageCSS: true})
}

// post new data to post table
exports.postAddPost = (req,res,next) => {
    let profileData = homepageModel.getUserProfile(req.query.id);

    let pOject = {
       subject: req.body.subject,
       detail: req.body.detail,
       topic: req.body.topic,
    //    postTime:
       imgURL: profileData.imgURL,
       replies: homepageModel.getTotalReplies()
    }
 
    homepageModel.addPost(pOject);
    res.redirect(301, '/homepage');
}

// post new data to reply table
exports.postAddReply = (req,res,next) => {
    let profileDate = homepageModel.getUserProfile(req.query.id);
    
    let pOject = {
       comment: req.body.comment,
       imgURL: profileDate.imgURL 
    }
 
    homepageModel.addReply(pOject);
    res.redirect(301, '/homepage');
}

// get replies from table
exports.getReplies = (req, res, next) => {
    console.log(req.query.id);
    let replyData = homepageModel.getReplies(req.query.id);

    res.send(JSON.stringify(replyData));
}