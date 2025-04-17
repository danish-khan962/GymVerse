const express = require('express')
const router = express.Router();

const {sendMail}  = require("../controllers/mail.controllers")

router.get('/send-mail', sendMail);

module.exports = router;
 

