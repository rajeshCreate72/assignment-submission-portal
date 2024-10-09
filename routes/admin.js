const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Assignment = require("../models/assignmentModel")
const Admin = require("../models/adminModel")
const approveAdmin = require("../middleware/adminMiddleware")
const router = express.Router()


router.post("/register", async (req, res) => {
    const { id, name, password } = req.body

    try {
        const user = await Admin.findOne({ adminId: id })

        if(user) {
            return res.status(400).json({ message: "admin already exisits" })
        }

        const hashPasswd = await bcrypt.hash(password, 10)

        const newAdmin = {
            adminId: id,
            adminName: name,
            password: hashPasswd,
            isApproved: false,
        }

        await Admin.create(newAdmin)

        res.status(201).json({ message: "admin has been created, waiting for approval" })

    } catch (error) {
        console.log("error creating admin", error)
        res.status(500).json({ message: "internal server error" })
    }
})


router.post("/login", async (req, res) => {
    const { id, password } = req.body

    try {
        const user = await Admin.findOne({ adminId: id })

        if(!user) {
            res.status(404).json({ message: "admin not registered" })
        }

        if(!user.isApproved) {
            res.status(401).json({ message: "Admin not approved. Contact the adminstration for approval"})
        }

        const checkPasswd = await bcrypt.compare(password, user.password)

        if(!checkPasswd) {
            res.status(401).json({ message: "password is incorrect" })
        }

        const jwtToken = await jwt.sign(
            { userId: user.adminId, userName: user.adminName},
            process.env.JWT_SECRECT
        )

        res.status(201).json({ token: jwtToken})

    } catch (error) {
        console.log("error while logging in", error)

        res.status(500).json({ message: "internal server error" })
    }
})


router.get("/assignments", async (req, res) => {
    const { id } = req.query

    try {
        
        const assignments = await Assignment.find({ adminId: id })

        if(assignments.length === 0) {
            return res.status(404).json({ message: "no assignments found" })
        }

        res.status(200).json({ message: assignments })

    } catch (error) {
        console.log("error fetching assignments", error)
        res.status(500).json({ message: "error while fetching assignments"})
    }
})

// This route should be used to accept the assignment
router.post("/assignments/:id/accept", async (req, res) => {
    const { id } = req.params

    try {
        
        const assignment = await Assignment.findOne({ assignmentId: id })

        if(!assignment) {
            return res.status(404).json({ message: "assignment not found" })
        }

        if(assignment.status === "approved") {
            return res.status(400).json({ message: "assignment already approved" })
        }

        if(assignment.status === "approved") {
            return res.status(400).json({ message: "assignment already approved" })
        }

        assignment.status = "approved"
        await Assignment.save()

        res.status(200).json({ message: "Assignment has been approved" })

    } catch (error) {
        console.log("Error while approving the assignment", error)
        res.status(500).json({ message: "error whiroving the assignment" })
    }
})

// This route is used to reject the assignment
router.post("/assignments/:id/reject", async (req, res) => {
    const { id } = req.params

    try {
        
        const assignment = await Assignment.findOne({ assignmentId: id })

        if(!assignment) {
            return res.status(404).json({ message: "assignment not found" })
        }

        if(assignment.status === "approved") {
            return res.status(400).json({ message: "assignment already approved" })
        }

        if(assignment.status === "rejected") {
            return res.status(400).json({ message: "assignment already rejected" })
        }

        assignment.status = "rejected"
        await Assignment.save()

        res.status(200).json({ message: "assignment has been rejected" })

    } catch (error) {
        console.log("Error while rejecting the assignment", error)
        res.status(500).json({ message: "error while rejecting the assignment" })
    }
})

// Use this route to approve the admin to login
// This route should be used in the profile of a person that is higher than admin
router.post("/:adminId/approve", adminMiddleware, approveAdmin)


module.exports = router