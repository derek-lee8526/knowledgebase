const express = require('express');
const messengerController = require('../controller/messengerControl');
const profileController = require('../controller/profileControl');
const loginController = require('../controller/loginController');
const router = express.Router();

router.get('/messenger', messengerController.getUserList)
router.get('/getMessage/:id', messengerController.getMessages)
router.get('/profile', profileController.getProfile)
router.get('/sendMessage/:id', messengerController.sendMessagePage)
router.get('/home', loginController.home)
router.post('/createuser', loginController.createUser)
router.post('/signInUser', loginController.signInUser)
router.post('/signOutUser', loginController.signOutUser)
router.post('/home', loginController.updateUser)
module.exports = router;