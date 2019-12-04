let editProfileModel = require('../model/editProfileModel');

// get data for profile
exports.getEditProfileData = (req, res, next) => {
    let userData = editProfileModel.getUserProfile(req.query.id);
    let userPosts = editProfileModel.getUserPosts(req.query.id);
    let userMessages = editProfileModel.getUserMessages(req.query.id);
    console.log(userPosts)
    res.render('editProfile', {userProfile: userData, userPosts: userPosts, userMessages: userMessages, editProfileCSS: true})
}

// update profile in database
exports.updateProfile = (req, res, next) => {
    let pObject = {
        first_name: req.body.fname,
        last_name: req.body.lname,
        description: req.body.desc,
        dateofbirth: req.body.dob,
        country: req.body.country,
        imageurl: req.body.img,
    }
    console.log(req.body);
    editProfileModel.updateProfile(pObject);
    res.redirect(301, '/editProfile');
}