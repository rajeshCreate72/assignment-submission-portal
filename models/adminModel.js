const mongoose = require("mongoose")


const adminModel = new mongoose.Schema({
    adminId: {
        type: String,
        required: true,
        unique: true,
    },
    adminName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        defalut: false,
    },
})

//Creates admin collection in database
const admin = mongoose.model('admin', adminModel)

module.exports = admin