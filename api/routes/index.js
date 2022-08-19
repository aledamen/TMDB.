const express = require('express')
const router = express.Router()
const user = require('./user')
const media = require('./media')
const auth = require('./auth')

router.use('/user', user)
router.use('/media', media)
router.use('/auth', auth)

module.exports = router;
