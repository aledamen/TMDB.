const MediaService = require('../services/media.service')

class MediaController {
    static async getAllMovies(req, res) {
        const {error, data} = await MediaService.getAllMovies()
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(200).send(data.data)
    }

    static async getAllSeries(req, res) {
        const {error, data} = await MediaService.getAllSeries()
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(200).send(data.data)
    }

    static async getMovie(req, res) {
        const {error, data} = await MediaService.getMovie(req.params.id)
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(200).send(data.data)
    }

    static async getSerie(req, res) {
        const {error, data} = await MediaService.getSerie(req.params.id)
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(200).send(data.data)
    }

    static async searchMedia(req, res) {
        const {error, data} = await MediaService.searchMedia(req.params.search)
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(200).send(data.data)
    }
}

module.exports = MediaController;
