const express = require('express');
const messengerController = require('../controller/messengerControl');
const loginController = require('../controller/loginController');
const router = express.Router();

router.get('/messenger', messengerController.getUserList)
router.get('/getMessage/:id', messengerController.getMessages)
router.post('/createUser', loginController.createUser)
router.post('/signInUser', loginController.signInUser)
module.exports = router;