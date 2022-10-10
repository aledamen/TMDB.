const axios = require('axios')
require('dotenv').config()

class MediaService {
    static async getAllMovies() {
        try {
            const resp = await axios.get(`${process.env.API_MOVIE_URL}${process.env.API_KEY}`)
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(error);
            return { error: true, data: error };
        }
    }

    static async getAllSeries() {
        try {
            const resp = await axios.get(`${process.env.API_SERIE_URL}${process.env.API_KEY}`)
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(error);
            return { error: true, data: error };
        }
    }

    static async getMovie(movieId) {
        try {
            const resp = await axios.get(`${process.env.API_MOVIE_ID_URL}${movieId}${process.env.API_KEY}`)
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(error);
            return { error: true, data: error };
        }
    }

    static async getSerie(serieId) {
        try {
            const resp = await axios.get(`${process.env.API_SERIE_ID_URL}${serieId}${process.env.API_KEY}`)
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(error);
            return { error: true, data: error };
        }
    }

    static async searchMedia(searchString) {
        try {
            const resp = await axios.get(
                `${process.env.API_SEARCH_MEDIA_URL}${process.env.API_KEY}${process.env.API_QUERIE}${searchString}`
            )
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(error);
            return { error: true, data: error };
        }
    }
}

module.exports = MediaService;
