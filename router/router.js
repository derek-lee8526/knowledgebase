const express = require('express');
const messengerController = require('../controller/messengerControl');
const router = express.Router();

router.get('/messenger', messengerController.getUserList)
router.get('/getMessage/:id', messengerController.getMessages)
module.exports = router;