const UserService = require('../services/user.service')

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers()
            if (users) return res.status(200).send(users) //{}
            return res.status(404).send('Users not found')
        } catch (err) {
            console.error(err)
        }
    }

    static async getUser(req, res) {
        try {
            const user = await UserService.getUser(req.params.id)
            if (user) return res.status(200).send(user) // {}
            return res.status(404).send('User not found')
        } catch (err) {
            console.error(err)
        }
    }

    static async createUser(req, res) {
        try {
            const user = UserService.createUser(req.body)
            return res.status(201).send(user) // {}
        } catch (err) {
            console.error(err)
        }
    }

    static async getUserFavorites(req, res) {
        try {
            const user = await UserService.getUserFavorites(req.params.id)
            return res.status(200).send(user)
        } catch (err) {
            console.error(err)
        }
    }

    static async setFavorite(req, res) {
        try {
            const user = await UserService.setFavorite(req.params.id, req.body)
            res.status(201).send(user)
        } catch (err) {
            console.error(err)
        }
    }

    static async editUser(req, res) {
        try {
            const user = await UserService.editUser(req.params.id, req.body)
            console.log("ESTE ES EL USUARIO", user)
            res.status(201).send(user)
        } catch (err) {
            console.error(err)
        }
    }

    static async deleteUser(req, res) {
        try {
            await UserService.deleteUser(req.params.id)
            res.status(204).send('user deleted')
        } catch (err) {
            console.error(err)
        }
    }

    static async deleteFavorite(req, res) {
        try {
            const user = await UserService.deleteFavorite(req.params.id, req.body.id)

            res.status(200).send(user)
        } catch (err) {
            console.error(err)
        }
    }

    static async searchUser(req, res) {
        try {
            const user = await UserService.searchUser(req.params.search)
            if (user) return res.status(200).send(user)
            return res.status(404).send('User not found')
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = UserController;
