const express = require('express')
const router = express.Router()
const MediaController = require('../controllers/media.controller')

//get
router.get('/movie', MediaController.getAllMovies)
router.get('/serie', MediaController.getAllSeries)
router.get('/movie/:id', MediaController.getMovie)
router.get('/serie/:id', MediaController.getSerie)
router.get('/search/:search', MediaController.searchMedia)

module.exports = router;
