const express = require('express')
const userExtractor = require('../middlewares/userExtractor.js')
const { getAllTask, postTask, putTask } = require('../controller/task.controller.js')

const router = express.Router()

router.get('/', getAllTask)
router.post('/', userExtractor, postTask)
router.put('/', putTask)

module.exports = router
