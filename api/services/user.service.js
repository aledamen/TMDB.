const User = require('../models/User')
const bcrypt = require('bcrypt')

class UserService {
    static async getAllUsers() {
        try {
            const resp = await User.find({ status: true }).select({ password: 0, salt: 0 })
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(error);
            return { error: true, data: error };
        }
    }

    static async getUser(id) {
        try {
            const resp = await User.findOne({ _id: id, status: true }).select({ password: 0, salt: 0 })
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(error);
            return { error: true, data: error };
        }
    }

    static async createUser(userBody) {

        try {
            const user = new User(userBody)
            const resp = await user.save()
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(error);
            return { error: true, data: error };
        }
    }

    static async getUserFavorites(id) {
        try {
            const resp = await User.find({ _id: id, status: true }).select({ favorites: 1 })
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(err)
            return { error: true, data: error };
        }
    }

    static async setFavorite(id, favoriteBody) {
        try {
            const resp = await User.findByIdAndUpdate(id,
                    {
                        $addToSet: {
                            favorites: favoriteBody,
                        },
                    },
                    { new: true }
            )
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(err)
            return { error: true, data: error };
        }
    }

    static async editUser(id, userBody) {
        try {
            const user = await User.find({ _id: id, status: true }).select({ password: 0, salt:0  })
            const username = userBody.username !== '' ?  userBody.username : user[0].username  
            const email = userBody.email !== '' ? userBody.email : user[0].email
            const password = userBody.password !== '' ? userBody.password : user[0].password
            const salt = bcrypt.genSaltSync()
            const resp = await User.findByIdAndUpdate(
                id,
                {
                    $set: { password: password && bcrypt.hashSync(password, salt), username , email, salt },
                },
                { new: true }
                
            )
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(err)
            return { error: true, data: error };
        }
    }

    static async deleteUser(id) {
        
        try {
            const resp = await User.findByIdAndUpdate(
                id,
                {
                    $set: { status: false },
                },
                { new: true }
            )
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(err)
            return { error: true, data: error };
        }
    }

    static async deleteFavorite(id, favoriteId) {
        
        try {
            const resp = await User.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        favorites: { id: favoriteId },
                    },
                },
                { new: true }
            )
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(err)
            return { error: true, data: error };
        }
    }

    static async searchUser(searchString) {
        try {
            const resp = await User.find({ username: searchString, status: true }).select({ password: 0, salt: 0 })
            return {
                error: false,
                data:resp
            }
        } catch (error) {
            console.error(err)
            return { error: true, data: error };
        }
    }
}

module.exports = UserService
