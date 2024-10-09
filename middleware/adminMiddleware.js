const Admin = require("../models/adminModel")

const approveAdmin = async (req, res) => {
    const { id } = req.params

    try {
        const admin = await Admin.findOne({ adminId: id })

        if(!admin) {
            return res.status(404).json({ message: "admin not found" })
        }

        admin.isApproved = true

        await Admin.save()

        res.status(200).json({ message: `${admin.adminName} has been approved`})

    } catch (error) {
        console.log("Error while approving the admin", error)
        res.status(500).json({ message: "error while approving the admin" })  
    }
}


module.exports = approveAdmin