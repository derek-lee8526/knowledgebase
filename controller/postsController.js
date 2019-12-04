let postsModel = require('../model/postsModel');

exports.getPostsData = async(req, res, next) => {
    let userData = await postsModel.getUserProfile();
    let userPosts = await postsModel.getUserPosts();
    let userMessages = await postsModel.getUserMessages();
    let postData = postsModel.getPosts();
    let postReplies = await postsModel.getReplies(req.params.id);
    postData.then((data) => {
        res.render('posts', { userProfile: userData, loggedin: true, userPosts: userPosts, userMessages: userMessages, postData: data, postReplies: postReplies, postsCSS: true })
    });
}
