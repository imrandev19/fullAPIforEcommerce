const express = require("express")
const singupController = require("../../controllers/authController")
const router = express.Router()
// http://localhost:5000/api/v1/auth/signup
router.post("/signup", singupController )

module.exports = router