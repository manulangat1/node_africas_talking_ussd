const User = require('../models/User')
const { postUser,getUser } = require('../controllers/User')
const tryCatchs = require('../middlewares/tryCatch')
const express = require('express')

const router = express.Router()

router.route('/').get(tryCatchs(getUser)).post(tryCatchs(postUser))

module.exports = router