const express = require('express')
const userController = require('../controller/userController')
const router = express.Router()

router.get('/',userController.getUsers)
router.post('/add', userController.addUsers)

module.exports = router