const mongoose = require("mongoose")
const Schema = mongoose.Schema

const assignmentModel = new mongoose.Schema({
    assignmentId: {
        type: String,
        required: true,
        unique: true,
    },
    assignmentLink: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.objectId,
        ref: "users",
    },
    adminId: {
        type: Schema.Types.objectId,
        ref: "admin"
    },
    dateOfSubmission: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["approved", "pending", "rejected"],
        default: "pending"
    }
})


//Creates assignment collection in database
const assignment = mongoose.model('assignments', assignmentModel)

module.exports = assignment