const User = require('../models/User')
const bcrypt = require('bcrypt')

class UserService {
    static async getAllUsers() {
        try {
            return await User.find({ status: true }).select({ password: 0, salt:0 })
        } catch (err) {
            console.error(err)
        }
    }

    static async getUser(id) {
        try {
            return await User.findOne({ _id: id, status: true }).select({ password: 0, salt:0  })
        } catch (err) {
            console.error(error)
        }
    }

    static async createUser(userBody) {
        try {
            const user = new User(userBody)
            return await user.save()
        } catch (err) {
            console.error(err)
        }
    }

    static async getUserFavorites(id) {
        try {
            return await User.find({ _id: id, status: true }).select({ favorites: 1 })
        } catch (err) {
            console.error(err)
        }
    }

    static async setFavorite(id, favoriteBody) {
        try {
            // if (!favoriteBody.id) throw Error('no content')
            // const favorites = await this.getUserFavorites(id)
            // const includeFavorite = favorites[0].favorites.map((favorite) => favorite.id).includes(favoriteBody.id)
            // if (!includeFavorite) {
                return await User.findByIdAndUpdate(id,
                    {
                        $addToSet: {
                            favorites: favoriteBody,
                        },
                    },
                    { new: true }
                )
            // }else return await User.findOne({ _id: id, status: true }).select({ password: 0, salt:0  })
        } catch (err) {
            console.error(err)
        }
    }

    static async editUser(id, userBody) {
        try {
            const user = await User.find({ _id: id, status: true }).select({ password: 0, salt:0  })
            const username = userBody.username !== '' ?  userBody.username : user[0].username  
            const email = userBody.email !== '' ? userBody.email : user[0].email
            const password = userBody.password !== '' ? userBody.password : user[0].password
            const salt = bcrypt.genSaltSync()
            return await User.findByIdAndUpdate(
                id,
                {
                    $set: { password: password && bcrypt.hashSync(password, salt), username , email, salt },
                },
                { new: true }
            )
        } catch (err) {
            console.error(err)
        }
    }

    static async deleteUser(id) {
        
        try {
            await User.findByIdAndUpdate(
                id,
                {
                    $set: { status: false },
                },
                { new: true }
            )
        } catch (err) {
            console.error(err)
        }
    }

    static async deleteFavorite(id, favoriteId) {
        console.log("EL ID",id)
        try {
            return await User.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        favorites: { id: favoriteId },
                    },
                },
                { new: true }
            )
        } catch (err) {
            console.error(err)
        }
    }

    static async searchUser(searchString) {
        try {
            return await User.find({ username: searchString, status: true }).select({ password: 0, salt:0  })
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = UserService
