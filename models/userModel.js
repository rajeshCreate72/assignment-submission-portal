const mongoose = require("mongoose")


const userModel = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})


const user = mongoose.model('users', userModel)

module.exports = user