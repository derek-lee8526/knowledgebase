const express = require('express');
const messengerController = require('../controller/messengerControl');
const router = express.Router();

router.get('/messenger', messengerController.getAllMessenger)
module.exports = router;