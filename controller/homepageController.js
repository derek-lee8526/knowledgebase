let homepageModel = require('../model/homepageModel');

// get data for homepage
exports.getHomepageData = (req, res, next) => {
    let userData = homepageModel.getUserProfile(req.query.id);
    let userPosts = homepageModel.getUserPosts(req.query.id);
    let userMessages = homepageModel.getUserMessages(req.query.id);
    let latestPosts = homepageModel.getLatestPosts();
    let postReplies = homepageModel.getReplies(req.query.id);
    latestPosts.then(([data, metadata]) => {
        //res.render('people', {people: data[0], peopleCSS: true});
        console.log(data);
        res.render('homepage', { userProfile: userData, userPosts: userPosts, userMessages: userMessages, postData: data, postReplies: postReplies, homepageCSS: true })
    });
}

// get data for homepage with filtered topic
exports.getFilteredHomepageData = (req, res, next) => {
    let userData = homepageModel.getUserProfile(req.query.id);
    let userPosts = homepageModel.getUserPosts(req.query.id);
    let userMessages = homepageModel.getUserMessages(req.query.id);
    let filteredPosts = homepageModel.getPosts(req.body.topics);
    let postReplies = homepageModel.getReplies(req.query.id);
    console.log(req.body.topics)
    filteredPosts.then(([data, metadata]) => {
        console.log(data);
        res.render('homepage', { userProfile: userData, userPosts: userPosts, userMessages: userMessages, postData: data, postReplies: postReplies, homepageCSS: true })
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