let postsModel = require('../model/postsModel');

exports.getPostsData = (req, res, next) => {
    let userData = postsModel.getUserProfile(req.query.id);
    let userPosts = postsModel.getUserPosts(req.query.id);
    let userMessages = postsModel.getUserMessages(req.query.id);
    let postData = postsModel.getPosts();
    let postReplies = postsModel.getReplies(req.query.id);
    console.log(userPosts)
    res.render('posts', {userProfile: userData, userPosts: userPosts, userMessages: userMessages, latestPosts: postData, postReplies: postReplies, postsCSS: true})
}
