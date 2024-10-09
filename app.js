const express = require("express")
const dbConnection = require("./config/db")
const cors = require("cors")
const dotenv = require("dotenv")
const authenticateToken = require("./middleware/authMiddleware")

//Configuring dotenv file to use the security keys
dotenv.config()

//connection to database
dbConnection()

const app = express()


app.use(express.json())

app.use(cors())


//Connection to all routes
app.use("/api/v1/user", require("./routes/user"))
app.use("/api/v1/admin", require("./routes/admin"))

app.post("/protected", authenticateToken, (req, res) => {
    res.json({ message: "token has been approved" })
})


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`)
})