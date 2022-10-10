const express = require('express')
const volleyball = require('volleyball')
const app = express()
const routes = require('./routes')
const cookieParser = require('cookie-parser')
const cors= require("cors")
require('dotenv').config()
require('./config/db')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(volleyball)
app.use(cors({
    origin: "http://localhost:3001",
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], credentials: true,
  }));

app.use('/api', routes)

app.listen(process.env.PORT || 3001, () => {
    console.log(`server on port ${process.env.PORT}`)
})
