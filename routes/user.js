const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Users = require("../models/userModel")
const Assignment = require("../models/assignmentModel")
const Admin = require("../models/adminModel")
const router = express.Router()


router.post("/register", async (req, res) => {
    const { id, name, password } = req.body

    try {
        const userId = await Users.findOne({ userId: id })

        if(userId) {
            return res.status(400).json({ message: "user already registered"})
        }

        const hashPwd = await bcrypt.hash(password, 10)

        const userData = {
            userId: id,
            userName: name,
            password: hashPwd,
        }

        await Users.create(userData)

        const jwtToken = await jwt.sign(
            { userId: id, userName: name},
            process.env.JWT_SECRET
        )

        res.status(201).json({ token: jwtToken})

    } catch (error) {
        console.log("Error while registering", error)
        res.status(500).json({ message: "internal server error", error: error })
    }
})

router.post("/login", async(req, res) => {
    const { id, password } = req.body

    try {
        const user = await Users.findOne({ userId: id })

        if(!user) {
            return res.status(400).json({ message: "user not registered" })
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword) {
            return res.status(400).json({ message: "wrong password" })
        }

        const jwtToken = await jwt.sign(
            {userId: user.userId, userName: user.userName},
            process.env.JWT_SECRET
        )

        res.status(200).json({ token: jwtToken })


    } catch (error) {
        console.log("Error while logging in", error)
        res.status(500).json({ message: "internal server error", error: error })
    }

})

router.post("/upload", async(req, res) => {
    const { id, assignLink, user, admin, date } = req.body

    try {
        const assignment = await Assignment.findOne({ assignmentId: id, userId: user })

        if(assignment) {
            return res.status(400).json({ message: "assignment already submitted" })
        }

        const data = {
            assignmentId: id,
            assignmentLink: assignLink,
            userId: user,
            adminId: admin,
            dateofSubmission: date
        }

        await Assignment.create(data)

        res.status(200).json({ message: "assignment submitted successfully" })

    } catch (error) {
        console.log("Error occured while submitting assignment", error)
        res.status(500).json({ message: "error while uploading", error: error })
    }
})


router.get("/admins", async (req, res) => {

    try {
        const adminArray = await Admin.find({})

        if(adminArray.length === 0) {
            return res.status(404).json({ message: "no admin found" })
        }

        res.status(200).json({ admins: adminArray })

    } catch(error) {
        console.log("Error fetching admins", error)

        res.status(500).json({ message: "error fetching admins", error: error })
    }
})


module.exports = router