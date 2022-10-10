const UserService = require('../services/user.service')

class UserController {
    static async getAllUsers(req, res) {
        const {error, data} = await UserService.getAllUsers()
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(200).send(data)
    }

    static async getUser(req, res) {
        const {error, data} = await UserService.getUser(req.params.id)
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(200).send(data)
    }

    static async createUser(req, res) {
        const { error, data } = await UserService.createUser(req.body)
        console.log(data)
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(201).send(data)
    }

    static async getUserFavorites(req, res) {
        const {error, data} = await UserService.getUserFavorites(req.params.id)
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(200).send(data)
    }

    static async setFavorite(req, res) {
        const {error, data} = await UserService.setFavorite(req.params.id, req.body)
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(201).send(data)
    }

    static async editUser(req, res) {
        const {error, data} = await UserService.editUser(req.params.id, req.body)
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(201).send(data)
    }

    static async deleteUser(req, res) {
        const {error, data} = await UserService.deleteUser(req.params.id)
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(204).send('User deleted', data)
    }

    static async deleteFavorite(req, res) {
        const {error, data} = await UserService.deleteFavorite(req.params.id, req.body.id)
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(200).send(data)
    }

    static async searchUser(req, res) {
        const {error, data} = await UserService.searchUser(req.params.search)
        if (error) {
            return res.status(404).send(error._message)
        }
        res.status(200).send(data)
    }
}

module.exports = UserController;
