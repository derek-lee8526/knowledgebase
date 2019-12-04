let homepageModel = require('../model/homepageModel');

// get data for homepage
exports.getHomepageData = async (req, res, next) => {
    let userData =  await homepageModel.getUserProfile();
    let userPosts = await homepageModel.getUserPosts();
    let userMessages = await homepageModel.getUserMessages();
    let latestPosts = await homepageModel.getLatestPosts();
    let postReplies = await homepageModel.getReplies(req.query.id);
    console.log(userPosts);
    //latestPosts.then((data) => {
        //console.log(data);
        res.render('homepage', { userProfile: userData, loggedin: true, userPosts: userPosts, userMessages: userMessages, postData: latestPosts, postReplies: postReplies, homepageCSS: true })
    // }).catch((err) => {
    //     console.log(err);
    //     if (err == "USER ID UNDEFINED") {
    //         res.redirect('/')
    //     }
    //     alert("An error occurred. Please try again later...");

    // });
}

// get data for homepage with filtered topic
exports.getFilteredHomepageData = (req, res, next) => {
    let userData = homepageModel.getUserProfile();
    let userPosts = homepageModel.getUserPosts();
    let userMessages = homepageModel.getUserMessages();
    let filteredPosts = homepageModel.getPosts();
    let postReplies = homepageModel.getReplies(req.query.id);
    console.log(req.body.topics)
    filteredPosts.then(([data, metadata]) => {
        console.log(data);
        res.render('homepage', { userProfile: userData, loggedin: true, userPosts: userPosts, userMessages: userMessages, postData: data, postReplies: postReplies, homepageCSS: true })
    });
}

// post new data to post table
exports.postAddPost = (req, res, next) => {
    //let profileData = homepageModel.getUserProfile(req.query.id);

    let pOject = {
        subject: req.body.subject,
        detail: req.body.detail,
        topic: req.body.topic,
        //    postTime:
        //    imgURL: profileData.imgURL,
        //replies: homepageModel.getTotalReplies()
    }
    console.log(pOject);
    homepageModel.addPost(pOject);
    console.log(pOject);
    // console.log(req.body.subject);
    // console.log(req.body.topics);
    // console.log(req.body.detail);

    homepageModel.addPost(pOject);
    res.redirect(301, '/homepage');
}

// post new data to reply table
exports.postAddReply = (req, res, next) => {
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
    //console.log(req.query.id);
    let replyData = homepageModel.getReplies(req.query.id);

    res.send(JSON.stringify(replyData));
}

// get posts from
exports.getPosts = (req, res, next) => {
    //console.log(req.query.id);
    let postData = homepageModel.getLatestPosts(req.query.id);
    //console.log(postData);
    res.send(JSON.stringify(postData));
}