require('dotenv').config()
const jwt = require('jsonwebtoken')

const validateToken = (token) => {
    return jwt.verify(token, process.env.SECRET_WORD)
}

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.SECRET_WORD, { expiresIn: '7d' })
}

module.exports = { validateToken, generateToken }
