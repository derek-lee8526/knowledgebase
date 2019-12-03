const express = require('express');
const messengerController = require('../controller/messengerControl');
const profileController = require('../controller/profileControl');
const loginController = require('../controller/loginController');
const homepageController = require('../controller/homepageController');
const otherUserProfileController = require('../controller/otherUserProfileController');
const postsController = require('../controller/postsController');
const editProfileController = require('../controller/editProfileController');
const searchController = require('../controller/searchController');
const router = express.Router();

router.get('/messenger', messengerController.getUserList)
router.get('/getMessage/:id', messengerController.getMessages)
router.get('/profile', profileController.getProfile)
router.get('/sendMessage/:id', messengerController.sendMessagePage)
router.post('/sendMessage', messengerController.sendMessage)

router.get('/search/:topic', searchController.getSearch)

router.get('/home', loginController.home)
router.post('/createuser', loginController.createUser)
    // router.get('/home', loginController.home);
router.post('/signInUser', loginController.signInUser)
router.post('/signOutUser', loginController.signOutUser)
router.post('/home', loginController.updateUser)

router.get('/homepage', homepageController.getHomepageData)
router.post('/homepage/addPost', homepageController.postAddPost)
router.post('/homepage/addReply', homepageController.postAddReply)
router.get('/getReply/:id', homepageController.getReplies)

router.get('/otherUserProfile', otherUserProfileController.getOtherUserData)
    // router.post('/homepage', otherUserProfileController.postAddPost)
    // router.post('/homepage', otherUserProfileController.postAddReply)
    //i need to change this.
router.get('/getReply/:id', otherUserProfileController.getOtherUserReplies)


router.get('/posts', postsController.getPostsData)

router.get('/editProfile', editProfileController.getEditProfileData)
router.post('/editProfile/update', editProfileController.updateProfile)

module.exports = router;