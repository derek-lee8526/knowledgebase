let homepageModel = require('../model/homepageModel');

exports.getHomepageData = (req, res, next) => {
    let userData = homepageModel.getUserProfile(req.query.id);
    let userPosts = homepageModel.getUserPosts(req.query.id);
    let userMessages = homepageModel.getUserMessages(req.query.id);
    let postData = homepageModel.getLatestPosts();
    let postReplies = homepageModel.getReplies(req.query.id);
    console.log(userPosts)
    res.render('homepage', {userProfile: userData, userPosts: userPosts, userMessages: userMessages, latestPosts: postData, postReplies: postReplies, homepageCSS: true})
}

exports.postAddPost = (req,res,next) => {
    let p_subject = req.body.subject;
    let p_detail = req.body.detail;
    let p_topic = req.body.topic;
    
    let pOject = {
       subject: p_subject,
       detail: p_detail,
       topic: p_topic,
       //postTime: 
    }
 
    peopleModel.add(pOject);
    res.redirect(301, '/homepage');
}

exports.postAddReply = (req,res,next) => {
    let p_comment = req.body.comment;
    
    let pOject = {
       subject: p_comment,
       //postTime: 
    }
 
    peopleModel.add(pOject);
    res.redirect(301, '/homepage');
}

exports.getReplies = (req, res, next) => {
    console.log(req.query.id);
    let replyData = homepageModel.getReplies(req.query.id);

    res.send(JSON.stringify(replyData));
}