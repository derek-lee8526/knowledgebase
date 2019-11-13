const express = require('express');
const messengerController = require('../controller/messengerControl');
const profileController = require('../controller/profileControl');
const router = express.Router();

router.get('/messenger', messengerController.getUserList)
router.get('/getMessage/:id', messengerController.getMessages)
router.get('/profile', profileController.getProfile)
module.exports = router;