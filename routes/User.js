const User = require('../models/User')
const { postUser,getUser,usD } = require('../controllers/User')
const tryCatchs = require('../middlewares/tryCatch')
const express = require('express')

const router = express.Router()

router.route('/').get(tryCatchs(getUser)).post(tryCatchs(postUser))
router.route('/ussd/').post(tryCatchs(usD))
module.exports = router