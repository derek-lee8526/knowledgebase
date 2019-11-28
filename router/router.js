const express = require('express');
const messengerController = require('../controller/messengerControl');
const loginController = require('../controller/loginController');
const router = express.Router();

router.get('/messenger', messengerController.getUserList)
router.get('/getMessage/:id', messengerController.getMessages)
// router.get('/home', loginController.home);
router.post('/signInUser', loginController.signInUser)
router.post('/signOutUser', loginController.signOutUser)
router.post('/home', loginController.updateUser)
module.exports = router;