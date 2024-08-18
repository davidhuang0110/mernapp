// 1. register / create user
// 2. log in
// 3. get the user's info.

const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController.js')
const {protect} = require('../middleware/authMiddleware.js')

// add a user, using POST
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router