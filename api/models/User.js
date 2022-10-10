const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
{
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    },
    favorites: {
        type: Array,
        default: [],
    },
},
{ timestamps: true }
)

UserSchema.pre('save', async function () {
this.salt = bcrypt.genSaltSync()
return (this.password = await bcrypt.hash(this.password, this.salt))
})

module.exports = mongoose.model('User', UserSchema)
