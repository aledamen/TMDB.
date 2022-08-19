const axios = require('axios')
require('dotenv').config()

class MediaService {
    static async getAllMovies() {
        try {
            return await axios.get(`${process.env.API_MOVIE_URL}${process.env.API_KEY}`)
            
            // const popular = await axios.get(`${process.env.API_MOVIE_URL}popular${process.env.API_KEY}`)
            // return topRated.data.results.concat(popular.data.results)
        } catch (err) {
            console.error(err)
        }
    }

    static async getAllSeries() {
        try {
            return await axios.get(`${process.env.API_SERIE_URL}${process.env.API_KEY}`)
            // const popular = await axios.get(`${process.env.API_SERIE_URL}popular${process.env.API_KEY}`)
            // return topRated.data.results.concat(popular.data.results)
            
        } catch (err) {
            console.error(err)
        }
    }

    static async getMovie(movieId) {
        try {
            return await axios.get(`${process.env.API_MOVIE_ID_URL}${movieId}${process.env.API_KEY}`)
        } catch (err) {
            console.error(err)
        }
    }

    static async getSerie(serieId) {
        try {
            return await axios.get(`${process.env.API_SERIE_ID_URL}${serieId}${process.env.API_KEY}`)
        } catch (err) {
            console.error(err)
        }
    }

    static async searchMedia(searchString) {
        try {
            return await axios.get(
                `${process.env.API_SEARCH_MEDIA_URL}${process.env.API_KEY}${process.env.API_QUERIE}${searchString}`
            )
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = MediaService;
