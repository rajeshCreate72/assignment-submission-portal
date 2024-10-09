const mongoose = require("mongoose")

const connectToDatabse = async () => {
    try {
        mongoose.connect(process.env.DB_URI, { serverSelectionTimeoutMS: 5000 })
        console.log("Connected to DB - MongoDB Atlas")
    } catch (error) {
        console.log("Error Connecting to Database", error)
    }
}


module.exports = connectToDatabse