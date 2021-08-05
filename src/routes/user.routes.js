const express = require('express')
const { postUser, loginUser, getAllUser } = require('../controller/user.controller.js')

const router = express.Router()

router.get('/', getAllUser)
router.post('/', postUser)
router.post('/login', loginUser)

module.exports = router
