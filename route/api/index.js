const express = require("express")
const router = express.Router()
const auth = require("./auth")
// http://localhost:5000/api/v1/auth
router.use("/auth", auth)
module.exports =router