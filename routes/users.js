const router = require('express').Router()
const {verifyToken} = require('../auth')
const {emailExists} = require('../validation')

const {registerUser, loginUser, userDetails, updateUserDetails, setProfilePic} = require('../controllers/userController.js')


router.post('/register', emailExists, registerUser)

router.post('/login', loginUser)

router.get('/profile', verifyToken, userDetails)

router.post('/update-profile', verifyToken, updateUserDetails)

router.post('/setProfilePic', verifyToken, setProfilePic)

module.exports = router