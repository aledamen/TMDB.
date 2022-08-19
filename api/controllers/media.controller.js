const MediaService = require('../services/media.service')

class MediaController {
    static async getAllMovies(req, res) {
        
        try {
            const movies = await MediaService.getAllMovies()
            res.status(200).send(movies.data)
        } catch (err) {
            console.error(err)
        }
    }

    static async getAllSeries(req, res) {
        try {
            const series = await MediaService.getAllSeries()
            res.status(200).send(series.data)
        } catch (err) {
            console.error(err)
        }
    }

    static async getMovie(req, res) {
        try {
            const movie = await MediaService.getMovie(req.params.id)
            res.status(200).send(movie.data)
        } catch (err) {
            console.error(err)
        }
    }

    static async getSerie(req, res) {
        try {
            const serie = await MediaService.getSerie(req.params.id)
            res.status(200).send(serie.data)
        } catch (err) {
            console.error(err)
        }
    }

    static async searchMedia(req, res) {
        try {
            const media = await MediaService.searchMedia(req.params.search)
            res.status(200).send(media.data)
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = MediaController;
