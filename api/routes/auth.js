const express = require('express')
const router = express()
const AuthController = require('../controllers/auth.controller')
const { validateAuth } = require('../middleware/auth')

router.get('/me', validateAuth, (req, res) =>{res.send(req.user)})
router.post('/signup', AuthController.signUp)
router.post('/login', AuthController.logIn)
router.post('/logout', AuthController.logOut)

module.exports = router;
