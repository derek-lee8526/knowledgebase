const express = require('express');
const messengerController = require('../controller/messengerControl');
const loginController = require('../controller/loginController');
const homepageController = require('../controller/homepageController');
const postsController = require('../controller/postsController');
const editProfileController = require('../controller/editProfileController');
const router = express.Router();

router.get('/messenger', messengerController.getUserList)
router.get('/getMessage/:id', messengerController.getMessages)
router.get('/sendMessage/:id', messengerController.sendMessagePage)
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

router.get('/posts', postsController.getPostsData)

router.get('/editProfile', editProfileController.getEditProfileData)
router.post('/editProfile/update', editProfileController.updateProfile) 

module.exports = router;